"use client";

import {
  Coffee,
  ChevronDown,
  Star,
  MapPin,
  Phone,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    setBeanPositions(
      Array.from({ length: 12 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        xOffset: Math.random() * 50 - 25,
        duration: 6 + Math.random() * 4,
        delay: Math.random() * 3,
      }))
    );
    setSteamPositions(
      Array.from({ length: 8 }, () => ({
        left: 20 + Math.random() * 60,
        bottom: 10 + Math.random() * 20,
        delay: Math.random() * 2,
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
    <div className="relative min-h-screen overflow-hidden bg-coffee-dark">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1447933601403-0c606bb9dff5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-coffee-dark/90 via-coffee-medium/80 to-coffee-dark/90" />

        {/* Floating Coffee Beans */}
        {beanPositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-4 bg-coffee-light rounded-full opacity-20 blur-[1px]"
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
            className="absolute w-2 h-12 bg-white/10 rounded-full blur-xl"
            style={{
              left: `${pos.left}%`,
              bottom: `${pos.bottom}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 0.4, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: pos.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center text-white px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              >
                <Star
                  size={20}
                  className="text-gold-accent fill-current drop-shadow-lg"
                />
              </motion.div>
            ))}
          </div>
          <span className="text-gold-light font-serif tracking-widest uppercase text-sm md:text-base border-b border-gold-accent/30 pb-2">
            Award-Winning Coffee Experience
          </span>
        </motion.div>

        <motion.h1
          className="mb-8 max-w-6xl text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <span className="bg-gradient-to-r from-gold-light via-white to-gold-light bg-clip-text text-transparent drop-shadow-2xl">
            Awaken Your
          </span>
          <br />
          <span className="text-gold-accent drop-shadow-lg italic">Senses</span>
        </motion.h1>

        <motion.p
          className="mb-10 max-w-2xl text-lg md:text-xl text-coffee-cream/90 leading-relaxed font-light tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          More than just coffee—it's a ritual. Experience the artistry of
          ethically sourced beans, roasted to perfection and brewed with
          uncompromising passion.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.button
            className="group px-10 py-4 bg-gold-accent text-coffee-dark rounded-full font-bold text-lg shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/menu")}
          >
            <span className="relative z-10 flex items-center gap-3">
              Order Now
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </motion.button>

          <motion.button
            className="group px-10 py-4 bg-transparent border border-gold-accent/50 text-gold-light rounded-full font-bold text-lg hover:bg-gold-accent/10 transition-all duration-300 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("about")}
          >
            <span className="flex items-center gap-3">
              <Coffee size={24} />
              Our Story
            </span>
          </motion.button>

          <motion.button
            className="group px-10 py-4 bg-coffee-dark/80 border border-gold-accent/50 text-gold-light rounded-full font-bold text-lg hover:bg-gold-accent/20 transition-all duration-300 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBookTable}
          >
            <span className="flex items-center gap-3">
              <Calendar size={24} />
              Book Table
            </span>
          </motion.button>
        </motion.div>

        {/* Quick Info */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {[
            {
              icon: MapPin,
              text: "123 Coffee Street, Brew City",
              sub: "Easy to Find",
            },
            { icon: Phone, text: "(555) 123-BREW", sub: "Call Ahead" },
            { icon: Coffee, text: "7AM - 8PM Daily", sub: "Fresh Daily" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-coffee-dark/40 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/10 hover:border-gold-accent/30 hover:bg-coffee-dark/60 transition-all duration-500 group"
              whileHover={{ y: -5 }}
            >
              <item.icon
                size={32}
                className="text-gold-accent mb-4 mx-auto group-hover:scale-110 transition-transform duration-300"
              />
              <div className="text-gold-light font-serif text-lg mb-1">
                {item.text}
              </div>
              <div className="text-coffee-cream/60 text-sm uppercase tracking-wider">
                {item.sub}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="cursor-pointer p-4 rounded-full border border-gold-accent/20 text-gold-accent hover:bg-gold-accent/10 transition-all duration-300"
          onClick={() => scrollToSection("about")}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </div>
  );
}
