import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo hero final",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DemoHeroFinalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
