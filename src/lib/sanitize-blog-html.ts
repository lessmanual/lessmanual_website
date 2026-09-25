import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = [
  "p",
  "br",
  "h2",
  "h3",
  "h4",
  "strong",
  "em",
  "s",
  "blockquote",
  "ul",
  "ol",
  "li",
  "a",
  "img",
  "figure",
  "figcaption",
  "pre",
  "code",
  "hr",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
] as const;

export function sanitizeBlogHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [...ALLOWED_TAGS],
    // Tagi usuwane razem z tekstem. Domyślnie sanitize-html zostawia tekst niedozwolonych
    // tagów, więc <title> z <head> i <h1> artykułu lądowały w treści jako goły tytuł.
    // Tytuł renderuje strona posta, więc z treści wypada w całości.
    nonTextTags: ["script", "style", "textarea", "option", "noscript", "head", "title", "h1"],
    allowedAttributes: {
      a: ["href", "title", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      h2: ["id"],
      h3: ["id"],
      h4: ["id"],
      code: ["class"],
      th: ["colspan", "rowspan", "scope"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {
      img: ["http", "https"],
    },
    allowProtocolRelative: false,
    transformTags: {
      a: (_tagName, attributes) => ({
        tagName: "a",
        attribs: {
          ...attributes,
          rel: "noopener noreferrer",
        },
      }),
      img: (_tagName, attributes) => ({
        tagName: "img",
        attribs: {
          ...attributes,
          loading: attributes.loading || "lazy",
        },
      }),
    },
  });
}
