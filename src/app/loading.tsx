"use client";

import { motion } from "framer-motion";
import { Coffee } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <Coffee size={64} className="text-amber-600" />
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-8 bg-amber-200/50 rounded-full blur-sm"
          animate={{
            y: [-10, -30],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <motion.div
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-6 bg-amber-200/50 rounded-full blur-sm"
          animate={{
            y: [-10, -25],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0.5,
            ease: "easeOut",
          }}
        />
      </motion.div>
      <motion.p
        className="mt-8 text-amber-900 font-medium text-lg"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Brewing your experience...
      </motion.p>
    </div>
  );
}
