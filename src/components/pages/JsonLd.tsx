import { serializeJsonLd } from "@/lib/schema";

// Dane strukturalne renderowane na serwerze; serializeJsonLd escapuje „<”.
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
