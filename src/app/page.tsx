"use client";

import { useState } from "react";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Footer } from "../components/Footer";
import { ScrollToTop } from "../components/ScrollToTop";
import { ReservationModal } from "../components/ReservationModal";

export default function Home() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <Hero onBookTable={() => setIsReservationOpen(true)} />
      <Features />
      <Footer />
      <ScrollToTop />
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </main>
  );
}
