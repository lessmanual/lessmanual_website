import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo layouts",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DemoLayoutsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
