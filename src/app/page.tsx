"use client";

import { useState } from "react";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { About } from "../components/About";
import { Footer } from "../components/Footer";
import { ReservationModal } from "../components/ReservationModal";

export default function Home() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <Hero onBookTable={() => setIsReservationOpen(true)} />
      <Features />
      <About />
      <Footer />
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </main>
  );
}
