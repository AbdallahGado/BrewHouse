import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type GiftCard = {
  code: string;
  amount: number;
  redeemed: boolean;
};

type GiftCardContextType = {
  giftCards: GiftCard[];
  createGiftCard: (amount: number) => GiftCard;
  redeemGiftCard: (code: string) => boolean;
};

const GiftCardContext = createContext<GiftCardContextType | undefined>(
  undefined
);

export const GiftCardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);

  const createGiftCard = (amount: number): GiftCard => {
    const newCard = { code: uuidv4(), amount, redeemed: false };
    setGiftCards((prev) => [...prev, newCard]);
    return newCard;
  };

  const redeemGiftCard = (code: string): boolean => {
    const cardIndex = giftCards.findIndex(
      (card) => card.code === code && !card.redeemed
    );
    if (cardIndex !== -1) {
      const updatedCards = [...giftCards];
      updatedCards[cardIndex].redeemed = true;
      setGiftCards(updatedCards);
      return true;
    }
    return false;
  };

  return (
    <GiftCardContext.Provider
      value={{ giftCards, createGiftCard, redeemGiftCard }}
    >
      {children}
    </GiftCardContext.Provider>
  );
};

export const useGiftCard = () => {
  const context = useContext(GiftCardContext);
  if (!context) {
    throw new Error("useGiftCard must be used within a GiftCardProvider");
  }
  return context;
};
