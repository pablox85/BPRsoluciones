"use client";

import NextError from "next/error";
import posthog from "posthog-js";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN?.trim() &&
      process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim()
    ) {
      posthog.captureException(error);
    }
  }, [error]);

  return (
    <html lang="es">
      <body>
        <NextError statusCode={0} />
        <button onClick={reset} type="button">
          Intentar de nuevo
        </button>
      </body>
    </html>
  );
}
