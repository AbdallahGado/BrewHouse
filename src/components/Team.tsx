"use client";

import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Instagram, Twitter } from "lucide-react";

const team = [
  {
    name: "Sarah Chen",
    role: "Head Roaster & Founder",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzY0MjQyMzMxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    bio: "With 15 years of experience, Sarah travels the globe to source our award-winning beans.",
  },
  {
    name: "Michael Chen",
    role: "Master Barista & Co-Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBzbWlsaW5nfGVufDF8fHx8MTc2NDI0MjMzMnww&ixlib=rb-4.1.0&q=80&w=1080",
    bio: "Michael's passion for the perfect extraction ensures every cup meets our gold standard.",
  },
  {
    name: "Elena Rodriguez",
    role: "Pastry Chef",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzY0MjQyMzMxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    bio: "Elena crafts our daily selection of fresh pastries using traditional French techniques.",
  },
];

export function Team() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-coffee-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-coffee-light/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-gold-accent font-serif font-medium tracking-widest uppercase mb-4 block">
            Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">
            Meet the Experts
          </h2>
          <p className="text-xl text-coffee-cream/80 max-w-2xl mx-auto font-light">
            The passionate people behind your perfect cup of coffee.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className="group text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative mb-8 inline-block">
                <div className="w-56 h-56 rounded-full overflow-hidden border-4 border-gold-accent/20 group-hover:border-gold-accent transition-colors duration-500 relative z-10">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-gold-accent/10 blur-xl -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-0 right-0 bg-gold-accent p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-20">
                  <div className="flex gap-3">
                    <a href="#" className="text-coffee-dark hover:text-white transition-colors">
                      <Instagram size={18} />
                    </a>
                    <a href="#" className="text-coffee-dark hover:text-white transition-colors">
                      <Twitter size={18} />
                    </a>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-gold-light mb-2">{member.name}</h3>
              <p className="text-gold-accent font-medium mb-4 uppercase tracking-wider text-sm">{member.role}</p>
              <p className="text-coffee-cream/70 leading-relaxed max-w-xs mx-auto font-light">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
