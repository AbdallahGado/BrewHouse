"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export function CartSidebar() {
  const { items, removeItem, updateQuantity, total, isOpen, setIsOpen } =
    useCart();
  const router = useRouter();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-70 flex flex-col"
          >
            <div className="p-6 bg-coffee-dark text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-gold-accent" />
                <h2 className="text-xl font-bold font-serif">Your Order</h2>
                <span className="bg-gold-accent text-coffee-dark text-xs font-bold px-2 py-0.5 rounded-full">
                  {items.reduce((acc, item) => acc + item.quantity, 0)} items
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <ShoppingBag size={64} className="opacity-20" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-amber-600 font-semibold hover:underline"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="flex gap-4 bg-gray-50 p-4 rounded-xl"
                  >
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                        <p className="font-bold text-amber-600">{item.price}</p>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-xl font-bold text-gray-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <button
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-600/20 transition-all active:scale-[0.98]"
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/checkout");
                  }}
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
