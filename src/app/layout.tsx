import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "../components/AuthProvider";
import { CartProvider } from "../context/CartContext";
import { OrderProvider } from "../context/OrderContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { LoyaltyProvider } from "../context/LoyaltyContext";
import { GiftCardProvider } from "../context/GiftCardContext";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { LayoutWrapper } from "../components/LayoutWrapper";

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
  description:
    "Experience the finest artisan coffee in a warm, inviting atmosphere. Ethically sourced beans, expertly roasted, served with passion.",
  keywords: [
    "coffee",
    "cafe",
    "artisan coffee",
    "specialty coffee",
    "coffee shop",
  ],
  openGraph: {
    title: "BrewHouse | Premium Coffee Experience",
    description:
      "Experience the finest artisan coffee in a warm, inviting atmosphere.",
    type: "website",
    locale: "en_US",
    siteName: "BrewHouse Coffee",
  },
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
        <ErrorBoundary>
          <AuthProvider>
            <FavoritesProvider>
              <OrderProvider>
                <LoyaltyProvider>
                  <GiftCardProvider>
                    <CartProvider>
                      <LayoutWrapper>{children}</LayoutWrapper>
                      <Toaster position="bottom-right" richColors />
                    </CartProvider>
                  </GiftCardProvider>
                </LoyaltyProvider>
              </OrderProvider>
            </FavoritesProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
