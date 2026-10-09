export type WhatsAppButtonLocation = "floating" | "contact_form";

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      parameters: Record<string, string>,
    ) => void;
  }
}

export function trackWhatsAppClick(buttonLocation: WhatsAppButtonLocation) {
  window.gtag?.("event", "whatsapp_click", {
    button_location: buttonLocation,
  });
}
