"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useOrders } from "./OrderContext";

interface LoyaltyContextType {
  points: number;
  tier: "bronze" | "silver" | "gold";
  addPoints: (amount: number) => void;
  redeemPoints: (amount: number) => boolean;
  getTierBenefits: () => string[];
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

const LOYALTY_STORAGE_KEY = "brewhouse_loyalty";

const TIER_THRESHOLDS = {
  bronze: 0,
  silver: 500,
  gold: 1000,
};

const TIER_BENEFITS = {
  bronze: ["Earn 1 point per $1 spent", "Birthday reward"],
  silver: ["Earn 1.5 points per $1 spent", "Free drink on signup", "Early access to new products"],
  gold: ["Earn 2 points per $1 spent", "Free drink monthly", "Exclusive events", "20% off merchandise"],
};

export function LoyaltyProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(0);
  const { orders } = useOrders();

  // Load loyalty points
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOYALTY_STORAGE_KEY);
      if (saved) {
        setPoints(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load loyalty points:", error);
    }
  }, []);

  // Save loyalty points
  useEffect(() => {
    localStorage.setItem(LOYALTY_STORAGE_KEY, JSON.stringify(points));
  }, [points]);

  // Add points based on orders
  useEffect(() => {
    if (orders.length > 0) {
      const latestOrder = orders[0];
      const orderPoints = Math.floor(latestOrder.total);
      // Only award points for new orders
      addPoints(orderPoints);
    }
  }, [orders]);

  const getTier = (pts: number): "bronze" | "silver" | "gold" => {
    if (pts >= TIER_THRESHOLDS.gold) return "gold";
    if (pts >= TIER_THRESHOLDS.silver) return "silver";
    return "bronze";
  };

  const tier = getTier(points);

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount);
  };

  const redeemPoints = (amount: number): boolean => {
    if (points >= amount) {
      setPoints((prev) => prev - amount);
      return true;
    }
    return false;
  };

  const getTierBenefits = () => {
    return TIER_BENEFITS[tier];
  };

  return (
    <LoyaltyContext.Provider
      value={{
        points,
        tier,
        addPoints,
        redeemPoints,
        getTierBenefits,
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
}

export function useLoyalty() {
  const context = useContext(LoyaltyContext);
  if (!context) {
    throw new Error("useLoyalty must be used within a LoyaltyProvider");
  }
  return context;
}
