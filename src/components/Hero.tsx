"use client";

import { ChevronDown, Star, MapPin, Phone, Calendar } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface BeanPosition {
  left: number;
  top: number;
  xOffset: number;
  duration: number;
  delay: number;
}

interface SteamPosition {
  left: number;
  bottom: number;
  delay: number;
}

interface HeroProps {
  onBookTable: () => void;
}

export function Hero({ onBookTable }: HeroProps) {
  const router = useRouter();
  const [beanPositions, setBeanPositions] = useState<BeanPosition[]>([]);
  const [steamPositions, setSteamPositions] = useState<SteamPosition[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    setBeanPositions(
      Array.from({ length: 15 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        xOffset: Math.random() * 50 - 25,
        duration: 8 + Math.random() * 6,
        delay: Math.random() * 5,
      }))
    );
    setSteamPositions(
      Array.from({ length: 10 }, () => ({
        left: 20 + Math.random() * 60,
        bottom: 10 + Math.random() * 20,
        delay: Math.random() * 3,
      }))
    );
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-coffee-dark flex items-center justify-center"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1447933601403-0c606bb9dff5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30"
          style={{ y }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-coffee-dark/95 via-coffee-medium/80 to-coffee-dark/95" />

        {/* Floating Coffee Beans */}
        {beanPositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-4 bg-coffee-light rounded-full opacity-10 blur-[1px]"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, pos.xOffset, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Steam Effects */}
        {steamPositions.map((pos, i) => (
          <motion.div
            key={`steam-${i}`}
            className="absolute w-2 h-16 bg-white/5 rounded-full blur-2xl"
            style={{
              left: `${pos.left}%`,
              bottom: `${pos.bottom}%`,
            }}
            animate={{
              y: [-20, -120],
              opacity: [0, 0.3, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: pos.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              >
                <Star
                  size={16}
                  className="text-gold-accent fill-gold-accent drop-shadow-lg"
                />
              </motion.div>
            ))}
          </div>
          <span className="text-gold-light font-serif tracking-[0.2em] uppercase text-sm md:text-base border-b border-gold-accent/30 pb-2 inline-block">
            Est. 2024 • Premium Coffee Roasters
          </span>
        </motion.div>

        <motion.h1
          className="mb-8 max-w-5xl text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight tracking-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <span className="text-white drop-shadow-2xl">Awaken Your</span>
          <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-gold-light via-gold-accent to-gold-light italic pr-4">
            Senses
          </span>
        </motion.h1>

        <motion.p
          className="mb-12 max-w-2xl text-lg md:text-xl text-coffee-cream/80 leading-relaxed font-light tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Experience the artistry of ethically sourced beans, roasted to
          perfection and brewed with uncompromising passion in every cup.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full sm:w-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.button
            className="group px-10 py-4 bg-gold-accent text-coffee-dark rounded-full font-bold text-lg shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 relative overflow-hidden w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBookTable}
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              Book Table
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </span>
          </motion.button>

          <motion.button
            className="group px-10 py-4 bg-transparent border border-gold-accent/50 text-gold-light rounded-full font-bold text-lg hover:bg-gold-accent hover:text-coffee-dark transition-all duration-300 w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/menu")}
          >
            View Menu
          </motion.button>
        </motion.div>

        {/* Quick Info Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl w-full mt-20 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {[
            {
              icon: MapPin,
              text: "123 Coffee Street",
              sub: "Brew City, BC",
            },
            { icon: Phone, text: "(555) 123-BREW", sub: "Order Ahead" },
            { icon: Calendar, text: "Open Daily", sub: "7:00 AM - 8:00 PM" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-gold-accent/30 hover:bg-white/10 transition-all duration-300 group flex items-center gap-4 text-left"
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 rounded-full bg-gold-accent/10 flex items-center justify-center group-hover:bg-gold-accent group-hover:text-coffee-dark transition-colors duration-300 text-gold-accent">
                <item.icon size={20} />
              </div>
              <div>
                <div className="text-gold-light font-serif text-lg font-medium">
                  {item.text}
                </div>
                <div className="text-coffee-cream/60 text-sm">{item.sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="cursor-pointer p-2 rounded-full border border-gold-accent/20 text-gold-accent hover:bg-gold-accent/10 transition-all duration-300"
          onClick={() => scrollToSection("features")}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </div>
  );
}
