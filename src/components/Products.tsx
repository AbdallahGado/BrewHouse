"use client";

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

import { motion } from "framer-motion";
import { Star, Plus } from "lucide-react";

const products = [
  {
    name: "Artisan Roast",
    description: "Rich and bold flavors from our signature roast process.",
    image:
      "https://images.unsplash.com/photo-1672570050756-4f1953bde478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMHJvYXN0ZWR8ZW58MXx8fHwxNzY0Mjc0MDIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "$12.99",
    rating: 4.8,
  },
  {
    name: "Espresso Bar",
    description: "Premium espresso drinks crafted by expert baristas.",
    image:
      "https://images.unsplash.com/photo-1607618421926-b72c6a99c342?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMG1hY2hpbmUlMjBiYXJpc3RhfGVufDF8fHx8MTc2NDMwMjE2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "$4.99",
    rating: 4.9,
  },
  {
    name: "Cozy Cafe",
    description: "Visit our welcoming space for a relaxing coffee experience.",
    image:
      "https://images.unsplash.com/photo-1593536488177-1eb3c2d4e3d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwaW50ZXJpb3IlMjBjb3p5fGVufDF8fHx8MTc2NDI1MTE5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "Visit Us",
    rating: 4.7,
  },
];

export function Products() {
  const { addItem } = useCart();

  const handleAddToCart = (product: (typeof products)[0]) => {
    if (product.isService) {
      toast.info("Visit us at the cafe to enjoy this experience!");
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: `$${product.price.toFixed(2)}`,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section id="products" className="py-20 px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl md:text-4xl font-bold">Our Offerings</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our carefully curated selection of premium coffee and
            experiences.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="overflow-hidden rounded-t-xl mb-4 aspect-square relative">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star size={14} className="text-amber-500 fill-current" />
                  <span className="text-sm font-semibold">
                    {product.rating}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold group-hover:text-amber-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-amber-600 font-bold text-lg">
                    {product.isService
                      ? "Visit Us"
                      : `$${product.price.toFixed(2)}`}
                  </p>
                  <motion.button
                    onClick={() => handleAddToCart(product)}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus size={16} />
                    {product.isService ? "Visit" : "Add to Cart"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
