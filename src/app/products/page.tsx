"use client";

import { Products } from "@/components/Products";
import { Footer } from "@/components/Footer";

export default function ProductsPage() {
  return (
    <main className="min-h-screen pt-24 bg-stone-50">
      <Products />
      <Footer />
    </main>
  );
}
