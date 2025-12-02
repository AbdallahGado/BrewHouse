"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (itemId: string, itemName: string) => void;
  removeFavorite: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
  toggleFavorite: (itemId: string, itemName: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = "brewhouse_favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error("Failed to save favorites:", error);
      }
    }
  }, [favorites, isInitialized]);

  const addFavorite = (itemId: string, itemName: string) => {
    setFavorites((prev) => [...prev, itemId]);
    toast.success(`Added ${itemName} to favorites`);
  };

  const removeFavorite = (itemId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== itemId));
    toast.info("Removed from favorites");
  };

  const isFavorite = (itemId: string) => {
    return favorites.includes(itemId);
  };

  const toggleFavorite = (itemId: string, itemName: string) => {
    if (isFavorite(itemId)) {
      removeFavorite(itemId);
    } else {
      addFavorite(itemId, itemName);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
}
