import { SeverityNumber } from "@opentelemetry/api-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN?.trim();
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim();

function requiredConfigurationError(variable: string) {
  return new Error(
    `${variable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${variable} is configured`,
  );
}

if ((!projectToken || !host) && process.env.NODE_ENV === "development") {
  throw requiredConfigurationError(
    projectToken ? "NEXT_PUBLIC_POSTHOG_HOST" : "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN",
  );
}

export const posthogLogProvider =
  projectToken && host
    ? new LoggerProvider({
        resource: resourceFromAttributes({
          "service.name": "bprsoluciones-contact-api",
        }),
        processors: [
          new BatchLogRecordProcessor(
            {
              exporter: new OTLPLogExporter({
                url: new URL("/i/v1/logs", host).toString(),
                headers: {
                  Authorization: `Bearer ${projectToken}`,
                  "Content-Type": "application/json",
                },
              }),
            },
          ),
        ],
      })
    : null;

export const posthogContactLogger = posthogLogProvider?.getLogger(
  "posthog-contact-exporter",
);

export function emitContactLog(
  body: string,
  severityNumber: SeverityNumber,
  attributes: Record<string, boolean | number | string>,
) {
  posthogContactLogger?.emit({ body, severityNumber, attributes });
}

export function register() {
  // The provider is deliberately used only through posthogContactLogger.
  // Do not register it globally: existing application loggers must stay local.
}
