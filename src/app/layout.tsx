import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navigation } from "../components/Navigation";
import { Toaster } from "sonner";
import { AuthProvider } from "../components/AuthProvider";
import { CartProvider } from "../context/CartContext";
import { CartSidebar } from "../components/CartSidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "BrewHouse | Premium Coffee Experience",
  description: "Experience the finest artisan coffee in a warm, inviting atmosphere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-stone-50 text-stone-900 font-sans`}
      >
        <AuthProvider>
          <CartProvider>
            <Navigation />
            <CartSidebar />
            {children}
            <Toaster position="bottom-right" richColors />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
