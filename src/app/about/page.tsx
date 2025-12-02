"use client";

import { About } from "@/components/About";
import { Team } from "@/components/Team";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Target, Lightbulb, TrendingUp, Globe2 } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Quality First",
    description:
      "We never compromise on the quality of our beans, our brewing process, or our service. Excellence is our standard.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We constantly explore new brewing techniques, flavor profiles, and ways to enhance your coffee experience.",
  },
  {
    icon: TrendingUp,
    title: "Sustainability",
    description:
      "From ethical sourcing to eco-friendly practices, we're committed to a sustainable future for coffee.",
  },
  {
    icon: Globe2,
    title: "Community",
    description:
      "We're more than a coffee shop—we're a gathering place where relationships brew alongside great coffee.",
  },
];

const timeline = [
  {
    year: "2009",
    title: "The Beginning",
    description:
      "Sarah and Michael opened the first BrewHouse location with a single espresso machine and a big dream.",
  },
  {
    year: "2012",
    title: "Direct Trade Program",
    description:
      "Established partnerships with coffee farmers across Ethiopia, Colombia, and Guatemala.",
  },
  {
    year: "2015",
    title: "Award Winning",
    description:
      "Named 'Best Coffee Shop' by the National Coffee Association for three consecutive years.",
  },
  {
    year: "2018",
    title: "Expansion",
    description:
      "Opened three new locations and launched our online roastery platform.",
  },
  {
    year: "2024",
    title: "Today",
    description:
      "Serving 10,000+ cups daily across 5 locations, still guided by our original values.",
  },
];

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen pt-24 bg-stone-50">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden bg-coffee-dark text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=2070')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-linear-to-br from-coffee-dark/90 to-coffee-dark/80" />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-gold-accent font-serif font-medium tracking-widest uppercase mb-4 block">
                Our Journey
              </span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-white">
                About BrewHouse
              </h1>
              <p className="text-xl md:text-2xl text-coffee-cream/90 leading-relaxed font-light">
                Crafting exceptional coffee experiences since 2009. From humble
                beginnings to becoming a beloved coffee destination, our passion
                for quality has never wavered.
              </p>
            </motion.div>
          </div>
        </section>

        {/* About Component */}
        <About />

        {/* Our Values */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
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
                What We Stand For
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-coffee-dark">
                Our Core Values
              </h2>
              <p className="text-xl text-coffee-medium max-w-3xl mx-auto font-light">
                These principles guide everything we do, from sourcing beans to
                serving our community.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="bg-stone-50 rounded-2xl p-8 border border-coffee-light/10 hover:shadow-xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-coffee-dark rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-gold-accent transition-colors duration-300">
                    <value.icon
                      className="text-gold-accent group-hover:text-coffee-dark"
                      size={28}
                    />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-coffee-dark mb-3">
                    {value.title}
                  </h3>
                  <p className="text-coffee-medium/80 font-light leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-coffee-dark text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-gold-accent font-serif font-medium tracking-widest uppercase mb-4 block">
                Our Journey
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">
                15 Years of Excellence
              </h2>
              <p className="text-xl text-coffee-cream/80 max-w-2xl mx-auto font-light">
                A timeline of milestones that shaped BrewHouse into what it is
                today.
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gold-accent/20 hidden md:block" />

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    className="relative pl-0 md:pl-20"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 top-2 w-5 h-5 bg-gold-accent rounded-full border-4 border-coffee-dark hidden md:block" />

                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <span className="text-4xl font-serif font-bold text-gold-accent">
                          {item.year}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-2xl font-serif font-bold text-gold-light mb-2">
                            {item.title}
                          </h3>
                          <p className="text-coffee-cream/70 font-light leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <Team />

        {/* Testimonials */}
        <Testimonials />
      </main>

      <Footer />
    </>
  );
}
