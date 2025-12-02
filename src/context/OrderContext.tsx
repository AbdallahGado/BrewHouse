"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: Array<{
    id: string;
    name: string;
    price: string;
    quantity: number;
  }>;
  total: number;
  status: "pending" | "preparing" | "ready" | "delivered" | "completed";
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  orderType: "pickup" | "delivery";
  deliveryAddress?: {
    address: string;
    city: string;
    zipCode: string;
  };
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "date" | "status">) => void;
  getOrder: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const ORDERS_STORAGE_KEY = "brewhouse_orders";

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load orders from localStorage on mount
  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save orders to localStorage
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
      } catch (error) {
        console.error("Failed to save orders:", error);
      }
    }
  }, [orders, isInitialized]);

  const addOrder = (orderData: Omit<Order, "id" | "date" | "status">) => {
    const newOrder: Order = {
      ...orderData,
      id: `order-${Date.now()}`,
      date: new Date().toISOString(),
      status: "pending",
    };
    setOrders((prev) => [newOrder, ...prev]);
    
    // Simulate status updates
    setTimeout(() => updateOrderStatus(newOrder.id, "preparing"), 2000);
    setTimeout(() => updateOrderStatus(newOrder.id, "ready"), 10000);
  };

  const getOrder = (orderId: string) => {
    return orders.find((order) => order.id === orderId);
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within OrderProvider");
  }
  return context;
}
