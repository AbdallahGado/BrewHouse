"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Camera, X, ArrowRight, MapPin } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc2NDI0MjMzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "BrewHouse interior with cozy seating",
    category: "Interior",
  },
  {
    src: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiYXJpc3RhfGVufDF8fHx8MTc2NDI0MjMzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Professional barista at work",
    category: "Baristas",
  },
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXBzJTIwYXJyYXllZHxlbnwxfHx8fDE3NjQyNDIzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Beautifully arranged coffee cups",
    category: "Products",
  },
  {
    src: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMHN0YWNrfGVufDF8fHx8MTc2NDI0MjMzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Fresh coffee beans storage",
    category: "Quality",
  },
  {
    src: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY0MjQyMzM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Modern workspace for remote work",
    category: "Workspace",
  },
  {
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBwYXRpc3Nlcnl8ZW58MXx8fHwxNzY0MjQyMzM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Fresh pastries and desserts",
    category: "Food",
  },
  {
    src: "https://images.unsplash.com/photo-1511537632536-b7a575805d93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBmYXJtfGVufDF8fHx8MTc2NDI0MjMzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Sustainable coffee farming",
    category: "Sourcing",
  },
  {
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjByb2FzdGluZ3xlbnwxfHx8fDE3NjQyNDIzMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Artisan coffee roasting",
    category: "Roasting",
  },
  {
    src: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NjQyNDIzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Intricate latte art",
    category: "Art",
  },
];

export function Gallery() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<
    null | (typeof galleryImages)[0]
  >(null);

  return (
    <section
      id="gallery"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50 relative overflow-hidden"
    >
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
            Visual Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-coffee-dark">
            Experience BrewHouse
          </h2>
          <p className="text-xl text-coffee-medium max-w-2xl mx-auto font-light leading-relaxed">
            Take a visual journey through our cozy atmosphere, expert
            craftsmanship, and delicious offerings
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {galleryImages.slice(0, 6).map((image, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer aspect-square"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(image)}
            >
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-linear-to-t from-coffee-dark/90 via-coffee-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Camera size={16} className="text-gold-accent" />
                    <span className="text-gold-accent text-sm font-medium uppercase tracking-wider">
                      {image.category}
                    </span>
                  </div>
                  <p className="text-white text-lg font-serif leading-relaxed">
                    {image.alt}
                  </p>
                </div>
              </div>

              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gold-accent hover:text-coffee-dark text-white">
                <ArrowRight
                  size={20}
                  className="-rotate-45 group-hover:rotate-0 transition-transform duration-300"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => router.push("/gallery")}
            className="inline-block border border-coffee-dark text-coffee-dark px-10 py-3 rounded-full font-bold hover:bg-coffee-dark hover:text-gold-accent transition-all duration-300 uppercase tracking-wider text-sm"
          >
            View Full Gallery
          </button>
        </motion.div>

        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-3xl p-10 shadow-xl border border-coffee-light/10 max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-gold-light via-gold-accent to-gold-light" />

            <h3 className="text-3xl font-serif font-bold text-coffee-dark mb-4">
              Visit Us Today
            </h3>
            <p className="text-coffee-medium/80 mb-8 font-light leading-relaxed">
              Experience the warmth and aroma of freshly brewed coffee in our
              inviting space. Perfect for work, meetings, or simply enjoying a
              moment of peace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-gold-accent text-coffee-dark px-8 py-3 rounded-full font-bold hover:bg-coffee-dark hover:text-gold-accent transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/contact")}
              >
                <MapPin size={18} />
                Find Us
              </motion.button>
              <motion.button
                className="border border-coffee-dark text-coffee-dark px-8 py-3 rounded-full font-bold hover:bg-coffee-dark hover:text-gold-accent transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Camera size={18} />
                Virtual Tour
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-coffee-dark/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full max-h-[90vh] rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-gold-accent hover:text-coffee-dark transition-all duration-300"
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </button>
              <div className="relative w-full h-[80vh]">
                <ImageWithFallback
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/90 via-black/50 to-transparent text-white">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-gold-accent text-coffee-dark text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {selectedImage.category}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold">
                  {selectedImage.alt}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
