"use client";

import {
  Coffee,
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-coffee-dark text-white pt-20 pb-10 px-4 sm:px-6 lg:px-8 border-t border-gold-accent/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-coffee-light/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gold-accent/10 p-2 rounded-full">
                <Coffee size={24} className="text-gold-accent" />
              </div>
              <span className="text-2xl font-serif font-bold text-gold-light tracking-wide">
                BrewHouse
              </span>
            </div>
            <p className="text-coffee-cream/70 mb-8 leading-relaxed font-light">
              Crafting the perfect cup since 2024. Join us for an unforgettable
              coffee experience where every sip tells a story of passion and
              quality.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="text-gold-light bg-white/5 hover:bg-gold-accent hover:text-coffee-dark transition-all duration-300 p-3 rounded-full border border-gold-accent/20 hover:border-gold-accent shadow-lg hover:shadow-gold-accent/30"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-8 text-lg font-serif font-bold text-gold-light">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-coffee-cream/70 hover:text-gold-accent transition-all duration-300 flex items-center gap-2 group w-fit"
                  >
                    <ArrowRight
                      size={14}
                      className="text-gold-accent/50 group-hover:text-gold-accent group-hover:translate-x-1 transition-all"
                    />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-8 text-lg font-serif font-bold text-gold-light">
              Contact Us
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-gold-accent/10 transition-colors mt-1">
                  <MapPin size={18} className="text-gold-accent" />
                </div>
                <span className="text-coffee-cream/70 group-hover:text-gold-light transition-colors leading-relaxed">
                  123 Coffee Street,
                  <br />
                  Brew City, BC 12345
                </span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-gold-accent/10 transition-colors">
                  <Phone size={18} className="text-gold-accent" />
                </div>
                <span className="text-coffee-cream/70 group-hover:text-gold-light transition-colors">
                  (555) 123-BREW
                </span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-gold-accent/10 transition-colors">
                  <Mail size={18} className="text-gold-accent" />
                </div>
                <span className="text-coffee-cream/70 group-hover:text-gold-light transition-colors">
                  hello@brewhouse.com
                </span>
              </div>
            </div>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-8 text-lg font-serif font-bold text-gold-light">
              Opening Hours
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-coffee-cream/70">Mon - Fri</span>
                <span className="text-gold-accent font-medium">
                  7:00 AM - 8:00 PM
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-coffee-cream/70">Saturday</span>
                <span className="text-gold-accent font-medium">
                  8:00 AM - 9:00 PM
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-coffee-cream/70">Sunday</span>
                <span className="text-gold-accent font-medium">
                  8:00 AM - 6:00 PM
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-gold-accent/10 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-coffee-cream/40 text-sm">
            &copy; {new Date().getFullYear()} AG. All rights reserved.
            Made with <span className="text-red-400 animate-pulse">❤️</span> for
            coffee lovers.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
