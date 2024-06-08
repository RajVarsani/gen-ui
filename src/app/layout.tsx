import Header from "@/components/Header";
import type { Metadata } from "next";
import { Instrument_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"] });
const instrumentSans = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "wagmi.info",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="wagmi">
      <style>{`
        // .in-s {
        //   font-family: ${instrumentSans.style.fontFamily};
        //   font-style: ${instrumentSans.style.fontStyle};
        // }
        .sp-m {
          font-family: ${spaceMono.style.fontFamily};
          font-weight: ${spaceMono.style.fontWeight};
        }
      `}</style>
      <body className={spaceMono.className}>
        {children}
        <Header />
      </body>
    </html>
  );
}
