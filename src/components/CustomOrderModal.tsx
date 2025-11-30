"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Coffee, Droplets, Candy, ChevronRight, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CustomOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    id: "base",
    title: "Choose Base",
    icon: Coffee,
    options: ["Espresso", "Cold Brew", "Blonde Roast", "Decaf"],
  },
  {
    id: "milk",
    title: "Select Milk",
    icon: Droplets,
    options: ["Whole Milk", "Oat Milk", "Almond Milk", "Soy Milk", "No Milk"],
  },
  {
    id: "flavor",
    title: "Add Flavor",
    icon: Candy,
    options: ["Vanilla", "Caramel", "Hazelnut", "Mocha", "None"],
  },
];

export function CustomOrderModal({ isOpen, onClose }: CustomOrderModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});

  const handleSelect = (option: string) => {
    setSelections({ ...selections, [steps[currentStep].id]: option });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit order
      toast.success("Custom drink created!", {
        description: `A ${selections.base} with ${selections.milk} and ${selections.flavor} syrup.`,
      });
      onClose();
      setCurrentStep(0);
      setSelections({});
    }
  };

  const CurrentIcon = steps[currentStep].icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 text-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Build Your Drink</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="flex gap-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      index <= currentStep ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
                  <CurrentIcon size={32} />
                </div>
                <h4 className="text-xl font-bold text-gray-900">
                  {steps[currentStep].title}
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {steps[currentStep].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 font-medium ${
                      selections[steps[currentStep].id] === option
                        ? "border-amber-600 bg-amber-50 text-amber-700"
                        : "border-gray-200 hover:border-amber-200 hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  className={`text-gray-500 hover:text-gray-800 font-medium ${
                    currentStep === 0 ? "invisible" : ""
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!selections[steps[currentStep].id]}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-amber-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {currentStep === steps.length - 1 ? "Finish Order" : "Next Step"}
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
