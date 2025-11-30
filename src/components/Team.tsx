"use client";

import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Instagram, Twitter, Linkedin } from "lucide-react";

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
    <section className="py-20 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
            Meet the Experts
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
              <div className="relative mb-6 inline-block">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-amber-100 group-hover:border-amber-600 transition-colors duration-300">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="flex gap-2">
                    <a href="#" className="text-gray-400 hover:text-amber-600 transition-colors">
                      <Instagram size={16} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-amber-600 transition-colors">
                      <Twitter size={16} />
                    </a>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-amber-600 font-medium mb-4">{member.role}</p>
              <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
