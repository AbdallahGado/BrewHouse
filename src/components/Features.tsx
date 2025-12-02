"use client";

import { Coffee, Heart, Award } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Coffee,
    title: "Premium Beans",
    description:
      "Sourced from the finest coffee farms around the world, roasted to perfection.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description:
      "Every cup is crafted with care by our expert baristas who are passionate about coffee.",
  },
  {
    icon: Award,
    title: "Award Winning",
    description:
      "Recognized for excellence in quality, taste, and customer satisfaction.",
  },
];

export function Features() {
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
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-coffee-light/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-gold-accent font-serif font-medium tracking-widest uppercase mb-4 block">
            Our Promise
          </span>
          <h2 className="mb-6 text-4xl md:text-5xl font-serif font-bold text-coffee-dark">
            Why Choose BrewHouse
          </h2>
          <p className="text-coffee-medium max-w-2xl mx-auto text-lg leading-relaxed">
            We're committed to delivering exceptional coffee experiences that
            keep you coming back for more.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="text-center group p-8 rounded-2xl bg-white border border-coffee-light/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                variants={itemVariants}
              >
                <div className="relative inline-block mb-8">
                  <div className="absolute inset-0 bg-gold-accent/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <motion.div
                    className="relative inline-flex items-center justify-center w-20 h-20 bg-coffee-dark text-gold-accent rounded-full group-hover:scale-110 transition-transform duration-300 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon size={36} />
                  </motion.div>
                </div>
                <h3 className="mb-4 text-2xl font-serif font-bold text-coffee-dark">
                  {feature.title}
                </h3>
                <p className="text-coffee-medium leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
