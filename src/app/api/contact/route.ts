import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type MailError = Error & {
  code?: string;
  command?: string;
  responseCode?: number;
};

function readText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function apiError(error: string, code: string, status: number, requestId: string) {
  return NextResponse.json({ error, code, requestId }, { status });
}

function classifyMailError(error: MailError) {
  if (error.code === "EAUTH" || error.responseCode === 535) {
    return {
      code: "SMTP_AUTH_FAILED",
      message: "Gmail rechazó las credenciales de envío. Revisá el usuario y la contraseña de aplicación.",
      status: 502,
    };
  }

  if (["ECONNECTION", "ESOCKET", "ETIMEDOUT", "ECONNREFUSED"].includes(error.code ?? "")) {
    return {
      code: "SMTP_CONNECTION_FAILED",
      message: "No fue posible conectar con Gmail. Probá nuevamente en unos minutos.",
      status: 504,
    };
  }

  if (error.code === "EDNS") {
    return {
      code: "SMTP_DNS_FAILED",
      message: "No fue posible localizar el servidor de correo configurado.",
      status: 502,
    };
  }

  if (error.code === "EENVELOPE") {
    return {
      code: "SMTP_RECIPIENT_REJECTED",
      message: "Gmail rechazó la dirección destinataria configurada.",
      status: 502,
    };
  }

  return {
    code: "EMAIL_SEND_FAILED",
    message: "No pudimos enviar tu consulta. Probá nuevamente o escribinos por WhatsApp.",
    status: 500,
  };
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID().slice(0, 8);

  try {
    const payload: unknown = await request.json();
    const body = payload && typeof payload === "object" ? payload as Record<string, unknown> : {};
    const name = readText(body.name, 120);
    const company = readText(body.company, 160);
    const email = readText(body.email, 254);
    const phone = readText(body.phone, 50);
    const service = readText(body.service, 120);
    const message = readText(body.message, 4_000);
    const website = readText(body.website, 200);

    if (website) {
      return apiError("No se pudo procesar la consulta.", "FORM_SPAM_DETECTED", 400, requestId);
    }

    if (!name || !emailPattern.test(email) || !message) {
      return apiError(
        "Completá tu nombre, un email válido y el mensaje.",
        "FORM_VALIDATION_FAILED",
        400,
        requestId,
      );
    }

    const host = process.env.SMTP_HOST?.trim();
    const port = Number(process.env.SMTP_PORT ?? 465);
    const user = process.env.SMTP_USER?.trim();
    // Google muestra las contraseñas de aplicación en grupos de cuatro.
    // Quitamos esos espacios para evitar un fallo de autenticación en Vercel.
    const pass = process.env.SMTP_PASS?.replace(/\s+/g, "");
    const to = process.env.CONTACT_TO_EMAIL?.trim();

    if (!host || !user || !pass || !to || !Number.isFinite(port)) {
      console.error("[contact] Configuración SMTP incompleta.", {
        requestId,
        hasHost: Boolean(host),
        hasPort: Number.isFinite(port),
        hasUser: Boolean(user),
        hasPass: Boolean(pass),
        hasRecipient: Boolean(to),
      });
      return apiError(
        "El envío no está configurado completamente. Probá por WhatsApp o email.",
        "EMAIL_CONFIG_MISSING",
        503,
        requestId,
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    await transporter.sendMail({
      from: `BPR Soluciones <${user}>`,
      to,
      replyTo: email,
      subject: `Nueva consulta web — ${name}`,
      text: [
        "Nueva consulta desde bprsoluciones.",
        "",
        `Nombre: ${name}`,
        `Empresa: ${company || "No indicada"}`,
        `Email: ${email}`,
        `Teléfono: ${phone || "No indicado"}`,
        `Servicio: ${service || "No indicado"}`,
        "",
        "Mensaje:",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true, requestId });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return apiError("La solicitud enviada no es válida.", "FORM_INVALID_JSON", 400, requestId);
    }

    const mailError = error as MailError;
    const diagnostic = classifyMailError(mailError);

    console.error("[contact] Falló el envío SMTP.", {
      requestId,
      code: mailError.code ?? "UNKNOWN",
      command: mailError.command ?? "UNKNOWN",
      responseCode: mailError.responseCode ?? null,
      message: mailError.message,
    });

    return apiError(
      diagnostic.message,
      diagnostic.code,
      diagnostic.status,
      requestId,
    );
  }
}
