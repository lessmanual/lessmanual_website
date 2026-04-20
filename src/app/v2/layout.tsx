import type { Metadata } from "next";
import { V2ShellStyles, v2FontClasses } from "@/components/v2/V2ShellStyles";
import { WebMCPProvider } from "@/components/webmcp-provider";

export const metadata: Metadata = {
  title: "LessManual.ai - v2 | Agentic workflows dla firm B2B",
  description:
    "Custom AI agents, którzy robią operacyjną pracę za Ciebie. 7-21 dni wdrożenia, 3 warstwy gwarancji.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function V2Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`v2-scope ${v2FontClasses}`}>
      <V2ShellStyles />
      <WebMCPProvider />
      {children}
    </div>
  );
}
