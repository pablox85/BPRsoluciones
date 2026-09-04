"use client";

import { Mail, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import Link from "next/link";
import { useRef, useState, type CSSProperties, type FormEvent } from "react";
import { services, siteConfig } from "@/config/site";
import { cardSurfaceClass } from "@/components/ui/Card";
import { getEmailHref } from "@/lib/links";

const inputClass =
  "min-h-12 w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-neon-mint/70 focus:ring-2 focus:ring-neon-mint/20";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    }).catch(() => null);

    const result: { error?: string; code?: string; requestId?: string } | null = response
      ? await response.json().catch(() => null)
      : null;

    if (!response?.ok) {
      setStatus("error");
      const diagnostic = [result?.code, result?.requestId ? `ref. ${result.requestId}` : ""]
        .filter(Boolean)
        .join(" · ");
      const errorMessage = result?.error ?? "No pudimos enviar tu consulta. Probá nuevamente.";
      setMessage(diagnostic ? `${errorMessage} Código: ${diagnostic}.` : errorMessage);
      return;
    }

    formRef.current?.reset();
    setStatus("success");
    setMessage("¡Gracias! Recibimos tu consulta y te responderemos a la brevedad.");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <aside className={`scroll-reveal reveal-up ${cardSurfaceClass} border-neon-mint/25 p-6 shadow-glow`}>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-neon-mint">
          Contacto directo
        </p>
        <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight text-white">
          Hablemos de tu proxima etapa digital.
        </h1>
        <p className="mt-4 text-base leading-7 text-zinc-400">
          Contanos que queres vender, medir o automatizar. Te respondemos con
          un camino claro para lanzar o mejorar tu presencia digital.
        </p>
        <div className="mt-8 grid gap-3">
          <Link
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex min-h-12 items-center gap-3 ${cardSurfaceClass} px-4 text-sm font-semibold text-white transition hover:border-neon-mint/40 hover:bg-ink-850`}
          >
            <FaWhatsapp className="size-5 text-neon-mint" aria-hidden="true" />
            WhatsApp
          </Link>
          <Link
            href={getEmailHref()}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex min-h-12 items-center gap-3 ${cardSurfaceClass} px-4 text-sm font-semibold text-white transition hover:border-neon-mint/40 hover:bg-ink-850`}
          >
            <Mail className="size-5 text-neon-cyan" aria-hidden="true" />
            {siteConfig.email}
          </Link>
        </div>
      </aside>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={`scroll-reveal reveal-up ${cardSurfaceClass} p-5 sm:p-6`}
        style={{ "--stagger-delay": "120ms" } as CSSProperties}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            aria-hidden="true"
            autoComplete="off"
            className="hidden"
            name="website"
            tabIndex={-1}
            type="text"
          />
          <label className="grid gap-2 text-sm font-semibold text-zinc-200">
            Nombre
            <input className={inputClass} name="name" autoComplete="name" required />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-zinc-200">
            Empresa
            <input className={inputClass} name="company" autoComplete="organization" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-zinc-200">
            Email
            <input className={inputClass} type="email" name="email" autoComplete="email" required />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-zinc-200">
            Telefono
            <input className={inputClass} name="phone" autoComplete="tel" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-zinc-200 sm:col-span-2">
            Servicio de interes
            <select className={inputClass} name="service" defaultValue="">
              <option value="" disabled>
                Seleccionar servicio
              </option>
              {services.map((service) => (
                <option key={service.name} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-zinc-200 sm:col-span-2">
            Mensaje
            <textarea
              className={`${inputClass} min-h-36 resize-y`}
              name="message"
              required
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-neon-mint/40 bg-neon-mint px-5 py-3 text-sm font-bold text-ink-950 shadow-glow transition hover:bg-white sm:w-auto"
        >
          <Send className="size-4" aria-hidden="true" />
          {status === "sending" ? "Enviando..." : "Enviar consulta"}
        </button>
        <p
          aria-live="polite"
          className={`mt-4 text-xs leading-5 ${
            status === "error" ? "text-red-300" : status === "success" ? "text-neon-mint" : "text-zinc-500"
          }`}
        >
          {message || "Tu consulta llegará directamente a nuestro equipo por email."}
        </p>
      </form>
    </div>
  );
}
