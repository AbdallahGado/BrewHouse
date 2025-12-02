"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, ChefHat, ShoppingBag, Heart } from "lucide-react";
import { useState, useCallback } from "react";
import { CustomOrderModal } from "./CustomOrderModal";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { SearchBar } from "./SearchBar";

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
      {
        name: "Sumatra Mandheling",
        description:
          "Indonesian coffee with earthy, herbal notes and full body, perfect for those who prefer low acidity",
        price: "$6.25",
        rating: 4.8,
        time: "4 min",
        popular: false,
      },
      {
        name: "Guatemala Antigua",
        description:
          "Complex and spicy with chocolate undertones, grown in volcanic soil for unique flavor profile",
        price: "$6.00",
        rating: 4.7,
        time: "4 min",
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
      {
        name: "Iced Caffe Latte",
        description:
          "Rich espresso poured over ice with cold milk, perfectly balanced and refreshing",
        price: "$5.25",
        rating: 4.8,
        time: "3 min",
        popular: true,
      },
      {
        name: "Vanilla Sweet Cream Cold Brew",
        description:
          "Smooth cold brew topped with house-made vanilla sweet cream for a luxurious finish",
        price: "$6.25",
        rating: 4.9,
        time: "Ready",
        popular: true,
      },
      {
        name: "Iced Mocha",
        description:
          "Rich chocolate and espresso blend served over ice with milk and whipped cream",
        price: "$6.00",
        rating: 4.7,
        time: "4 min",
        popular: false,
      },
      {
        name: "Frappé",
        description:
          "Blended ice drink with espresso, milk, and your choice of flavor - coffee or mocha",
        price: "$6.75",
        rating: 4.6,
        time: "5 min",
        popular: false,
      },
      {
        name: "Iced Chai Latte",
        description:
          "Spiced chai tea blended with milk and ice for a refreshing twist on a classic",
        price: "$5.75",
        rating: 4.8,
        time: "3 min",
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
      {
        name: "Almond Croissant",
        description:
          "Classic croissant filled with almond cream and topped with sliced almonds and powdered sugar",
        price: "$4.50",
        rating: 4.9,
        time: "Ready",
        popular: true,
      },
      {
        name: "Cinnamon Roll",
        description:
          "Warm, gooey cinnamon roll with cream cheese frosting - a breakfast favorite",
        price: "$4.75",
        rating: 4.8,
        time: "Ready",
        popular: true,
      },
      {
        name: "Banana Bread",
        description:
          "Moist and flavorful banana bread made with ripe bananas and a hint of vanilla",
        price: "$3.75",
        rating: 4.7,
        time: "Ready",
        popular: false,
      },
      {
        name: "Scone - Cranberry Orange",
        description:
          "Buttery scone studded with cranberries and orange zest, lightly glazed",
        price: "$3.50",
        rating: 4.6,
        time: "Ready",
        popular: false,
      },
      {
        name: "Danish Pastry",
        description:
          "Flaky pastry filled with seasonal fruit jam and topped with sweet glaze",
        price: "$4.25",
        rating: 4.7,
        time: "Ready",
        popular: false,
      },
      {
        name: "Biscotti",
        description:
          "Twice-baked Italian cookie with almonds - perfect for dipping in your coffee",
        price: "$2.75",
        rating: 4.5,
        time: "Ready",
        popular: false,
      },
    ],
  },
];

export function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [customOrderOpen, setCustomOrderOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const allItems = menuCategories.flatMap((category) =>
    category.items.map((item) => ({ ...item, category: category.title }))
  );

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const filteredItems = allItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === menuCategories.find(c => c.id === activeCategory)?.title;
    const matchesSearch = searchQuery === "" || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: "all", title: "All Items" },
    ...menuCategories.map(cat => ({ id: cat.id, title: cat.title }))
  ];

  const handleAddToCart = (item: any) => {
    addItem({
      id: `${item.category}-${item.name}`,
      name: item.name,
      price: item.price,
    });
  };

  return (
    <section className="py-20 px-4 bg-stone-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      </div>

      <CustomOrderModal
        isOpen={customOrderOpen}
        onClose={() => setCustomOrderOpen(false)}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-gold-accent font-serif font-medium tracking-widest uppercase mb-4 block">
            Our Menu
          </span>
          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-coffee-dark">
            Artisan Coffee Selection
          </h2>
          <p className="text-xl text-coffee-medium max-w-2xl mx-auto">
            Ethically sourced, expertly roasted, served with passion
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar 
            placeholder="Search menu items..." 
            onSearch={handleSearch}
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 border ${
                activeCategory === category.id
                  ? "bg-coffee-dark text-gold-accent border-coffee-dark shadow-lg scale-105"
                  : "bg-white text-coffee-medium border-coffee-light/20 hover:border-gold-accent hover:text-coffee-dark"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            {filteredItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center py-20"
              >
                <p className="text-coffee-medium text-lg">No items found matching your search.</p>
              </motion.div>
            ) : (
              filteredItems.map((item, index) => (
                <motion.div
                  key={`${item.category}-${item.name}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-coffee-light/10 hover:shadow-xl transition-all duration-300 relative group"
                >
                  {item.popular && (
                    <div className="absolute top-4 right-4 bg-gold-accent text-coffee-dark text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                      <Star size={12} className="fill-current" />
                      Popular
                    </div>
                  )}

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(`${item.category}-${item.name}`, item.name)}
                    className="absolute top-4 left-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all z-10"
                    aria-label={isFavorite(`${item.category}-${item.name}`) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart 
                      size={18} 
                      className={isFavorite(`${item.category}-${item.name}`) ? "fill-red-500 text-red-500" : "text-coffee-medium hover:text-red-500"}
                    />
                  </button>

                  <div className="flex justify-between items-start mb-4 mt-8">
                    <div className="flex-1">
                      <h3 className="text-xl font-serif font-bold text-coffee-dark mb-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-gold-accent fill-current" />
                          <span className="text-sm font-medium text-coffee-medium">
                            {item.rating}
                          </span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-coffee-light/30" />
                        <div className="flex items-center gap-1 text-coffee-medium/70">
                          <Clock size={14} />
                          <span className="text-sm">{item.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-serif font-bold text-gold-accent">
                      {item.price}
                    </div>
                  </div>

                  <p className="text-coffee-medium/80 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <motion.button
                    className="w-full bg-coffee-dark text-white hover:bg-gold-accent hover:text-coffee-dark py-3 px-6 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingBag size={18} />
                    Add to Order
                  </motion.button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Custom Order CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-coffee-dark rounded-3xl p-10 text-white max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-accent/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-accent/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gold-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-accent">
                <ChefHat size={32} />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4 text-gold-light">Custom Orders Available</h3>
              <p className="mb-8 text-coffee-cream/80 text-lg font-light max-w-xl mx-auto">
                Can't find what you're looking for? Our expert baristas can create custom
                drinks tailored to your specific taste preferences. Just ask!
              </p>
              <motion.button
                className="bg-gold-accent text-coffee-dark px-10 py-4 rounded-full font-bold hover:bg-white hover:text-coffee-dark transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCustomOrderOpen(true)}
              >
                Request Custom Order
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
