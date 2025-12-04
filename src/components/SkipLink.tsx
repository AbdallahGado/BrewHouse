"use client";

import { motion } from "framer-motion";

interface SkipLinkProps {
  href?: string;
  children?: React.ReactNode;
}

export function SkipLink({ href = "#main-content", children = "Skip to main content" }: SkipLinkProps) {
  return (
    <motion.a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold-accent focus:text-coffee-dark focus:rounded-lg focus:font-bold focus:outline-none focus:ring-2 focus:ring-gold-light"
      initial={{ y: -100 }}
      whileFocus={{ y: 0 }}
    >
      {children}
    </motion.a>
  );
}
