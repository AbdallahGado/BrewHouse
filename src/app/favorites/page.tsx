"use client";

import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";

// This would normally come from your menu data
const menuData = {
  "kenya-aa": { name: "Kenya AA Single Origin", price: "$6.50" },
  "geisha-guatemala": { name: "Geisha Guatemala", price: "$8.00" },
  "jamaica-blue": { name: "Jamaica Blue Mountain", price: "$9.00" },
  "brazilian-santos": { name: "Brazilian Santos", price: "$5.75" },
};

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();
  const { addItem } = useCart();

  const favoriteItems = favorites.map(id => ({
    id,
    ...(menuData[id as keyof typeof menuData] || { name: "Unknown Item", price: "$0.00" })
  }));

  return (
    <>
      <div className="min-h-screen bg-stone-50 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-coffee-dark mb-4 flex items-center gap-3">
              <Heart className="text-gold-accent fill-gold-accent" size={40} />
              Favorites
            </h1>
            <p className="text-coffee-medium">
              Your favorite coffee selections for quick reordering
            </p>
          </div>

          {favoriteItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Heart size={64} className="mx-auto text-gray-300 mb-6" />
              <h2 className="text-2xl font-serif font-bold text-coffee-dark mb-4">
                No Favorites Yet
              </h2>
              <p className="text-coffee-medium mb-8">
                Start adding your favorite items to see them here
              </p>
              <Link
                href="/menu"
                className="inline-block bg-gold-accent text-coffee-dark px-8 py-3 rounded-full font-bold hover:bg-coffee-dark hover:text-gold-accent transition-all duration-300"
              >
                Browse Menu
              </Link>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-coffee-light/10 hover:shadow-xl transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-serif font-bold text-coffee-dark">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeFavorite(item.id)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                      aria-label="Remove from favorites"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gold-accent">
                      {item.price}
                    </span>
                    <button
                      onClick={() => addItem({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                      })}
                      className="bg-gold-accent text-coffee-dark px-4 py-2 rounded-full font-bold hover:bg-coffee-dark hover:text-gold-accent transition-all flex items-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
