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
    <section className="py-20 px-8 bg-amber-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl md:text-4xl font-bold">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We're committed to delivering exceptional coffee experiences that
            keep you coming back for more.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-12"
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
                className="text-center group"
                variants={itemVariants}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 bg-amber-600 text-white rounded-full mb-6 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={36} />
                </motion.div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
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
