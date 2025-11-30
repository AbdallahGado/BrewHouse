"use client";

import { motion } from "framer-motion";
import { Coffee, Users, Award, Heart } from "lucide-react";

const stats = [
  {
    icon: Coffee,
    number: "10,000+",
    label: "Cups Served Daily",
  },
  {
    icon: Users,
    number: "50,000+",
    label: "Happy Customers",
  },
  {
    icon: Award,
    number: "15+",
    label: "Years of Excellence",
  },
  {
    icon: Heart,
    number: "100%",
    label: "Ethically Sourced",
  },
];

export function About() {
  return (
    <section id="about" className="py-20 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
            About BrewHouse
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            For over 15 years, we've been passionate about serving exceptional
            coffee and creating memorable experiences for our community. Every
            cup tells a story of quality, care, and dedication.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-amber-900 mb-6">
              From Bean to Cup
            </h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Our journey began in 2009 with a simple mission: to serve coffee
                that honors the farmers who grew it. Founders Sarah and Michael
                traveled across three continents, building direct relationships
                with small-lot producers to ensure fair trade and exceptional
                quality.
              </p>
              <p>
                At BrewHouse, we believe coffee is a craft. Our master roasters
                meticulously profile each batch to unlock its unique flavor
                notes, from the bright citrus of Ethiopian Yirgacheffe to the
                deep chocolate undertones of Colombian Supremo.
              </p>
              <p>
                But we're more than a roastery. We're a sanctuary for
                connection. Whether you're here for the morning rush or a quiet
                afternoon of reflection, we invite you to savor the moment—one
                cup at a time.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-8 shadow-xl">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <stat.icon size={32} className="text-amber-600" />
                    </div>
                    <div className="text-3xl font-bold text-amber-900 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-2xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-amber-900 mb-6">
              Our Commitment to Quality
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-amber-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Coffee size={32} className="text-white" />
                </div>
                <h4 className="text-xl font-bold text-amber-900 mb-2">
                  Premium Beans
                </h4>
                <p className="text-gray-600">
                  We source only the finest Arabica beans from sustainable farms
                  around the world, ensuring every cup meets our high standards.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-amber-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users size={32} className="text-white" />
                </div>
                <h4 className="text-xl font-bold text-amber-900 mb-2">
                  Expert Baristas
                </h4>
                <p className="text-gray-600">
                  Our skilled baristas are trained artisans who craft each drink
                  with precision, passion, and attention to detail.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-amber-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart size={32} className="text-white" />
                </div>
                <h4 className="text-xl font-bold text-amber-900 mb-2">
                  Community Focus
                </h4>
                <p className="text-gray-600">
                  We're committed to our community, supporting local initiatives
                  and creating a welcoming space for everyone.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
