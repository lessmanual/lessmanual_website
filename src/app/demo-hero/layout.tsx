import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo hero",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DemoHeroLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
