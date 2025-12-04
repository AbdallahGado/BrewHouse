"use client";

import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { menuItemsById } from "@/data/menuData";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();
  const { addItem } = useCart();

  const favoriteItems = favorites.map((id) => {
    const item = menuItemsById[id];
    return item
      ? {
          id,
          name: item.name,
          price: item.price,
          description: item.description,
          rating: item.rating,
        }
      : {
          id,
          name: "Unknown Item",
          price: "$0.00",
          description: "Item not found",
          rating: 0,
        };
  });

  return (
    <>
      <div className="min-h-screen bg-stone-50 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="h-8 w-8 text-gold-accent fill-gold-accent" />
              <h1 className="text-4xl font-serif font-bold text-coffee-dark">
                Favorites
              </h1>
            </div>
            <p className="text-coffee-medium">
              Your favorite coffee selections for quick reordering
            </p>
          </div>

          {favoriteItems.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500 mb-4">
                No favorites yet
              </p>
              <p className="text-gray-400 mb-8">
                Start adding items to your favorites from the menu
              </p>
              <Link
                href="/menu"
                className="inline-block bg-gold-accent text-coffee-dark px-6 py-3 rounded-full font-bold hover:bg-gold-light transition-colors"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-coffee-light/10 hover:shadow-md transition-shadow relative"
                >
                  <button
                    onClick={() => removeFavorite(item.id)}
                    className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    aria-label="Remove from favorites"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="pr-8">
                    <h3 className="text-xl font-serif font-bold text-coffee-dark mb-2">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-coffee-medium mb-4 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gold-accent">
                        {item.price}
                      </span>
                      <button
                        onClick={() =>
                          addItem({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                          })
                        }
                        className="flex items-center gap-2 bg-gold-accent text-coffee-dark px-4 py-2 rounded-full font-bold hover:bg-gold-light transition-colors"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>
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
