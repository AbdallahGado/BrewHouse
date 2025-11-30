"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Camera, X } from "lucide-react";
import { useState } from "react";
import { Footer } from "@/components/Footer";

const allGalleryImages = [
  {
    src: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc2NDI0MjMzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "BrewHouse interior with cozy seating",
    category: "Interior",
  },
  {
    src: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiYXJpc3RhfGVufDF8fHx8MTc2NDI0MjMzNHww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Professional barista at work",
    category: "Baristas",
  },
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXBzJTIwYXJyYXllZHxlbnwxfHx8fDE3NjQyNDIzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Beautifully arranged coffee cups",
    category: "Products",
  },
  {
    src: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMHN0YWNrfGVufDF8fHx8MTc2NDI0MjMzNnww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Fresh coffee beans storage",
    category: "Quality",
  },
  {
    src: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY0MjQyMzM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Modern workspace for remote work",
    category: "Workspace",
  },
  {
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBwYXRpc3Nlcnl8ZW58MXx8fHwxNzY0MjQyMzM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
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
  // Add more images here if needed
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<null | typeof allGalleryImages[0]>(null);

  return (
    <main className="min-h-screen pt-24 pb-12 px-8 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent font-serif">
            Our Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A complete visual collection of our coffee, people, and atmosphere.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {allGalleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-square overflow-hidden">
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Camera size={16} className="text-white" />
                    <span className="text-white text-sm font-medium">
                      {image.category}
                    </span>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    {image.alt}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full max-h-[90vh] rounded-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </button>
              <ImageWithFallback
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h3 className="text-xl font-bold mb-2">{selectedImage.category}</h3>
                <p>{selectedImage.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
}
