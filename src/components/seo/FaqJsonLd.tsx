import { faqsByPage } from "@/components/sections/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";

export function FaqJsonLd({ page }: { page: "home" | "services" | "faq" }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqsByPage[page].map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }}
    />
  );
}
