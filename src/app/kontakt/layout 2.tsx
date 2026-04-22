import type { Metadata } from "next";
import { V2ShellStyles, v2FontClasses } from "@/components/v2/V2ShellStyles";

export const metadata: Metadata = {
  robots: { index: true, follow: true },
};

export default function KontaktLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`v2-scope ${v2FontClasses}`}>
      <V2ShellStyles />
      {children}
    </div>
  );
}
