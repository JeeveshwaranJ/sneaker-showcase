import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/ui/CartDrawer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEO | Premium Futuristic Sneaker Showroom",
  description: "Experience the future of footwear. A luxury digital showroom for high-fashion tech sneakers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CartProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
