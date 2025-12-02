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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50 relative overflow-hidden">
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
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-coffee-dark">
            About BrewHouse
          </h2>
          <p className="text-xl text-coffee-medium max-w-3xl mx-auto font-light leading-relaxed">
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
            <h3 className="text-3xl font-serif font-bold text-coffee-dark mb-6">
              From Bean to Cup
            </h3>
            <div className="space-y-4 text-coffee-medium/80 leading-relaxed font-light">
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
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-coffee-light/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-accent/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
              
              <div className="grid grid-cols-2 gap-8 relative z-10">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="bg-coffee-light/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-accent group-hover:text-coffee-dark transition-all duration-300 text-gold-accent">
                      <stat.icon size={32} />
                    </div>
                    <div className="text-3xl font-serif font-bold text-coffee-dark mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-coffee-medium/70 uppercase tracking-wider font-medium">{stat.label}</div>
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
          <div className="bg-coffee-dark rounded-3xl p-12 max-w-5xl mx-auto relative overflow-hidden text-white">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-coffee-dark/90 to-coffee-dark/80" />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-serif font-bold text-gold-light mb-12">
                Our Commitment to Quality
              </h3>
              <div className="grid md:grid-cols-3 gap-10">
                <div className="text-center group">
                  <div className="bg-white/5 border border-white/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-gold-accent group-hover:text-coffee-dark transition-all duration-300 text-gold-accent">
                    <Coffee size={32} />
                  </div>
                  <h4 className="text-xl font-serif font-bold text-gold-light mb-3">
                    Premium Beans
                  </h4>
                  <p className="text-coffee-cream/70 font-light leading-relaxed">
                    We source only the finest Arabica beans from sustainable farms
                    around the world, ensuring every cup meets our high standards.
                  </p>
                </div>
                <div className="text-center group">
                  <div className="bg-white/5 border border-white/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-gold-accent group-hover:text-coffee-dark transition-all duration-300 text-gold-accent">
                    <Users size={32} />
                  </div>
                  <h4 className="text-xl font-serif font-bold text-gold-light mb-3">
                    Expert Baristas
                  </h4>
                  <p className="text-coffee-cream/70 font-light leading-relaxed">
                    Our skilled baristas are trained artisans who craft each drink
                    with precision, passion, and attention to detail.
                  </p>
                </div>
                <div className="text-center group">
                  <div className="bg-white/5 border border-white/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-gold-accent group-hover:text-coffee-dark transition-all duration-300 text-gold-accent">
                    <Heart size={32} />
                  </div>
                  <h4 className="text-xl font-serif font-bold text-gold-light mb-3">
                    Community Focus
                  </h4>
                  <p className="text-coffee-cream/70 font-light leading-relaxed">
                    We're committed to our community, supporting local initiatives
                    and creating a welcoming space for everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
