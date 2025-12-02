"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Coffee Enthusiast",
    content:
      "BrewHouse has the most amazing coffee I've ever tasted. The attention to detail and passion for quality is evident in every cup.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzY0MjQyMzMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Mike Chen",
    role: "Morning Regular",
    content:
      "Their espresso bar is my daily ritual. The baristas are skilled and the atmosphere is perfect for starting my day right.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBzbWlsaW5nfGVufDF8fHx8MTc2NDI0MjMzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Emma Davis",
    role: "Food Blogger",
    content:
      "The cozy cafe atmosphere combined with exceptional coffee makes BrewHouse my go-to spot for both work and relaxation.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJsb25kZXxlbnwxfHx8fDE3NjQyNDIzMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-coffee-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-coffee-light/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
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
            Testimonials
          </span>
          <h2 className="mb-6 text-4xl md:text-5xl font-serif font-bold text-white">
            What Our Customers Say
          </h2>
          <p className="text-coffee-cream/80 max-w-2xl mx-auto text-lg font-light">
            Don't just take our word for it. Here's what our community of coffee
            lovers has to say.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative hover:border-gold-accent/30 transition-all duration-300 group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <Quote
                className="absolute top-6 right-6 text-gold-accent/20 group-hover:text-gold-accent/40 transition-colors"
                size={40}
              />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold-accent/20 group-hover:border-gold-accent transition-colors">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-gold-light">{testimonial.name}</h4>
                  <p className="text-coffee-cream/60 text-sm uppercase tracking-wider">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-gold-accent fill-current"
                  />
                ))}
              </div>
              <p className="text-coffee-cream/80 leading-relaxed italic font-light">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
