import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Haider Travels | Premium Car Rental Lahore",
  description: "Experience luxury and comfort with Haider Travels. Best car rental services in Lahore with and without driver. Daily, weekly, and monthly rates available.",
  keywords: ["rent a car lahore", "haider travels", "luxury car rental pakistan", "car hire lahore", "with driver car rental"],
  authors: [{ name: "Haider Travels" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

