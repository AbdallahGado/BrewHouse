"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, ChefHat, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { CustomOrderModal } from "./CustomOrderModal";
import { useCart } from "@/context/CartContext";

const menuCategories = [
  {
    id: "specialty",
    title: "Specialty Coffee",
    items: [
      {
        name: "Kenya AA Single Origin",
        description:
          "Bright and complex with notes of blackcurrant, citrus, and a wine-like finish. Grown at high altitude in Nyeri region.",
        price: "$6.50",
        rating: 5.0,
        time: "4 min",
        popular: true,
      },
      {
        name: "Geisha Guatemala",
        description:
          "Rare and exquisite with floral jasmine notes, tropical fruit flavors, and an incredibly smooth finish.",
        price: "$8.00",
        rating: 4.9,
        time: "5 min",
        popular: true,
      },
      {
        name: "Jamaica Blue Mountain",
        description:
          "Mild and exceptionally smooth with no bitterness. Subtle hints of chocolate and nuts with a clean taste.",
        price: "$9.00",
        rating: 5.0,
        time: "4 min",
        popular: false,
      },
      {
        name: "Brazilian Santos",
        description:
          "Rich and nutty with low acidity, featuring chocolate and caramel notes. Perfect for a smooth, comforting brew.",
        price: "$5.75",
        rating: 4.8,
        time: "4 min",
        popular: false,
      },
      {
        name: "Costa Rican Tarrazu",
        description:
          "Bright and clean with citrus and floral notes, balanced acidity, and a sweet, lingering finish.",
        price: "$7.25",
        rating: 4.9,
        time: "4 min",
        popular: true,
      },
      {
        name: "Panama Hacienda La Esmeralda",
        description:
          "Exceptional Geisha variety with intense floral aromas, tropical fruit flavors, and a silky smooth texture.",
        price: "$12.00",
        rating: 5.0,
        time: "6 min",
        popular: false,
      },
    ],
  },
  {
    id: "hot",
    title: "Signature Coffees",
    items: [
      {
        name: "House Blend",
        description:
          "Our signature blend of premium Arabica beans, perfectly balanced with notes of chocolate and caramel",
        price: "$4.50",
        rating: 4.9,
        time: "3 min",
        popular: true,
      },
      {
        name: "Dark Roast Colombian",
        description:
          "Bold and intense Colombian beans with smoky undertones and a rich, full-bodied finish",
        price: "$5.00",
        rating: 4.8,
        time: "3 min",
        popular: false,
      },
      {
        name: "Ethiopian Single Origin",
        description:
          "Bright and fruity Ethiopian beans with floral notes and a clean, wine-like acidity",
        price: "$5.50",
        rating: 4.9,
        time: "4 min",
        popular: true,
      },
      {
        name: "French Roast",
        description:
          "Dark, smoky roast with intense flavor and a slight bitterness, perfect for espresso lovers",
        price: "$5.25",
        rating: 4.7,
        time: "3 min",
        popular: false,
      },
      {
        name: "Italian Roast",
        description:
          "Medium-dark roast with balanced acidity and rich, full-bodied flavor with chocolate notes",
        price: "$4.75",
        rating: 4.8,
        time: "3 min",
        popular: false,
      },
      {
        name: "Decaf House Blend",
        description:
          "Our signature blend decaffeinated using Swiss water process, maintaining full flavor without caffeine",
        price: "$4.75",
        rating: 4.6,
        time: "3 min",
        popular: false,
      },
    ],
  },
  {
    id: "cold",
    title: "Specialty Drinks",
    items: [
      {
        name: "Caramel Macchiato",
        description:
          "Espresso with steamed milk, vanilla syrup, and a caramel drizzle finished with foam",
        price: "$6.50",
        rating: 4.8,
        time: "4 min",
        popular: false,
      },
      {
        name: "Cold Brew",
        description:
          "Smooth and refreshing cold-steeped coffee with low acidity and natural sweetness",
        price: "$5.50",
        rating: 4.9,
        time: "Ready",
        popular: true,
      },
      {
        name: "Nitro Cold Brew",
        description:
          "Velvety cold brew infused with nitrogen for a creamy, cascading effect and smooth finish",
        price: "$6.00",
        rating: 4.7,
        time: "Ready",
        popular: false,
      },
    ],
  },
  {
    id: "pastry",
    title: "Fresh Pastries",
    items: [
      {
        name: "Croissant",
        description:
          "Buttery, flaky French pastry baked fresh daily - perfect with your morning coffee",
        price: "$3.50",
        rating: 4.6,
        time: "Ready",
        popular: false,
      },
      {
        name: "Blueberry Muffin",
        description:
          "Moist muffin packed with fresh blueberries and topped with a sugar crunch",
        price: "$4.00",
        rating: 4.8,
        time: "Ready",
        popular: true,
      },
      {
        name: "Chocolate Chip Cookie",
        description:
          "Warm, chewy cookie loaded with premium chocolate chips - baked to perfection",
        price: "$3.25",
        rating: 4.7,
        time: "Ready",
        popular: false,
      },
    ],
  },
];

export function Menu() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.name,
      name: item.name,
      price: item.price,
    });
  };

  const filteredCategories =
    activeFilter === "all"
      ? menuCategories
      : menuCategories.filter((cat) => cat.id === activeFilter);

  return (
    <section
      id="menu"
      className="py-20 px-8 bg-linear-to-br from-white via-amber-50 to-orange-50"
    >
      <CustomOrderModal
        isOpen={isCustomOrderOpen}
        onClose={() => setIsCustomOrderOpen(false)}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
            Our Menu
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover our carefully crafted selection of premium coffees,
            specialty drinks, and fresh pastries
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { id: "all", label: "All Items" },
              { id: "specialty", label: "Specialty" },
              { id: "hot", label: "Hot Coffee" },
              { id: "cold", label: "Cold Drinks" },
              { id: "pastry", label: "Pastries" },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-amber-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-600 hover:bg-amber-50"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="space-y-16 min-h-[600px]">
          <AnimatePresence mode="wait">
            {filteredCategories.map((category) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl font-bold text-amber-900 mb-8 text-center">
                  {category.title}
                </h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.name}
                      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative p-6">
                        {item.popular && (
                          <div className="absolute top-4 right-4 bg-linear-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Star size={12} className="fill-current" />
                            Popular
                          </div>
                        )}

                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1 pr-4">
                            <h4 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                              {item.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex items-center gap-1">
                                <Star
                                  size={14}
                                  className="text-amber-400 fill-current"
                                />
                                <span className="text-sm font-medium text-gray-600">
                                  {item.rating}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-500">
                                <Clock size={14} />
                                <span className="text-sm">{item.time}</span>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`text-2xl font-bold text-amber-600 ${
                              item.popular ? "mt-8" : ""
                            }`}
                          >
                            {item.price}
                          </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-6">
                          {item.description}
                        </p>

                        <motion.button
                          className="w-full bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingBag size={18} />
                          Add to Order
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-linear-to-r from-amber-600 to-orange-600 rounded-2xl p-8 text-white max-w-2xl mx-auto">
            <ChefHat size={48} className="mx-auto mb-4 text-amber-200" />
            <h3 className="text-2xl font-bold mb-4">Custom Orders Available</h3>
            <p className="mb-6 opacity-90">
              Can't find what you're looking for? Our baristas can create custom
              drinks tailored to your taste preferences. Just ask!
            </p>
            <motion.button
              className="bg-white text-amber-600 px-8 py-3 rounded-xl font-bold hover:bg-amber-50 transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCustomOrderOpen(true)}
            >
              Request Custom Order
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
