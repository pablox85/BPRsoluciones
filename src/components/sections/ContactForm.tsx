"use client";

import { CheckCircle2, Mail, Send, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { services, siteConfig } from "@/config/site";
import { cardSurfaceClass } from "@/components/ui/Card";
import { getEmailHref } from "@/lib/links";

const inputClass =
  "min-h-12 w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-neon-mint/70 focus:ring-2 focus:ring-neon-mint/20";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  function closeSuccessModal() {
    setIsSuccessModalOpen(false);
    setStatus("idle");
    setMessage("");
  }

  useEffect(() => {
    if (!isSuccessModalOpen) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSuccessModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isSuccessModalOpen]);

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
    setIsSuccessModalOpen(true);
  }

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <aside className={`scroll-reveal reveal-up ${cardSurfaceClass} border-neon-mint/25 p-6 shadow-glow`}>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-neon-mint">
          Contacto directo
        </p>
        <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight text-white">
          Hablemos de tu próxima etapa digital.
        </h1>
        <p className="mt-4 text-base leading-7 text-zinc-400">
          Contanos qué querés desarrollar o automatizar en tu empresa en Uruguay.
          Te orientamos sobre una web, una solución con IA o software a medida.
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
            Teléfono
            <input className={inputClass} name="phone" autoComplete="tel" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-zinc-200 sm:col-span-2">
            Servicio de interés
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

      {isSuccessModalOpen ? (
        <div
          className="contact-success-modal fixed inset-0 z-[100] flex h-dvh w-full items-center justify-center overflow-y-auto bg-ink-950/75 p-4 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeSuccessModal();
          }}
        >
          <section
            aria-describedby="contact-success-description"
            aria-labelledby="contact-success-title"
            aria-modal="true"
            className={`contact-success-dialog w-full max-w-md border-neon-mint/40 p-6 shadow-[0_28px_100px_rgba(0,0,0,0.6),0_0_0_1px_rgba(0,255,198,0.08)] sm:p-8`}
            role="dialog"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-2xl border border-neon-mint/35 bg-neon-mint/10 text-neon-mint">
                <CheckCircle2 className="size-7" aria-hidden="true" />
              </div>
              <button
                ref={closeButtonRef}
                aria-label="Cerrar confirmación"
                className="grid size-10 place-items-center rounded-xl border border-white/10 text-zinc-300 transition hover:border-neon-mint/40 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-mint/70"
                onClick={closeSuccessModal}
                type="button"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <h2 id="contact-success-title" className="mt-6 font-heading text-3xl font-semibold text-white">
              Consulta enviada
            </h2>
            <p id="contact-success-description" className="mt-3 leading-7 text-zinc-300">
              Recibimos tu mensaje correctamente. Te responderemos a la brevedad.
            </p>
            <button
              className="mt-7 inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-neon-mint/40 bg-neon-mint px-5 py-3 text-sm font-bold text-ink-950 transition hover:bg-white"
              onClick={closeSuccessModal}
              type="button"
            >
              Entendido
            </button>
          </section>
        </div>
      ) : null}
    </>
  );
}
