"use client";

import {
  Coffee,
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export function Footer() {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "Menu", href: "#" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
  ];

  const hours = [
    { day: "Mon - Fri", time: "7am - 8pm" },
    { day: "Saturday", time: "8am - 9pm" },
    { day: "Sunday", time: "8am - 6pm" },
  ];

  return (
    <footer className="bg-coffee-dark text-white py-12 px-8 border-t border-gold-accent/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid md:grid-cols-3 gap-12 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Coffee size={32} className="text-gold-accent" />
              <span className="text-2xl font-serif font-bold text-gold-light tracking-wide">
                BrewHouse
              </span>
            </div>
            <p className="text-coffee-cream/80 mb-6 leading-relaxed font-light">
              Crafting the perfect cup since 2020. Join us for an unforgettable
              coffee experience where every sip tells a story.
            </p>
            <div className="space-y-4 text-sm text-coffee-cream/70">
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-gold-accent/10 transition-colors">
                  <MapPin size={18} className="text-gold-accent" />
                </div>
                <span className="group-hover:text-gold-light transition-colors">
                  123 Coffee Street, Brew City
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-gold-accent/10 transition-colors">
                  <Phone size={18} className="text-gold-accent" />
                </div>
                <span className="group-hover:text-gold-light transition-colors">
                  (555) 123-4567
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-gold-accent/10 transition-colors">
                  <Mail size={18} className="text-gold-accent" />
                </div>
                <span className="group-hover:text-gold-light transition-colors">
                  hello@brewhouse.com
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-8 text-lg font-serif font-bold text-gold-light border-b border-gold-accent/20 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-coffee-cream/70 hover:text-gold-accent transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-accent/50 group-hover:bg-gold-accent transition-colors"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-8 text-lg font-serif font-bold text-gold-light border-b border-gold-accent/20 pb-2 inline-block">
              Follow Us
            </h4>
            <p className="text-coffee-cream/80 mb-6 font-light">
              Stay connected for the latest updates and special offers.
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
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-t border-gold-accent/10 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-coffee-cream/50 text-sm">
            &copy; 2024 BrewHouse. All rights reserved. Made with{" "}
            <span className="text-red-400">❤️</span> for coffee lovers.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
