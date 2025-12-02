"use client";

import { Menu } from "@/components/Menu";
import { Footer } from "@/components/Footer";
import Image from "next/image";

export default function MenuPage() {
  return (
    <main className="min-h-screen pt-24 bg-stone-50">
      <Menu />
      <Footer />
    </main>
  );
}
