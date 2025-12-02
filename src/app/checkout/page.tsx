"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  CreditCard,
  MapPin,
  User,
  Lock,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  orderType: "pickup" | "delivery";
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [formData, setFormData] = useState<FormData>({
    // Customer Info
    fullName: "",
    email: "",
    phone: "",
    // Delivery Address
    address: "",
    city: "",
    zipCode: "",
    // Payment
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    // Order Type
    orderType: "pickup", // pickup or delivery
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate order number
    const orderNum = `BH${Date.now().toString().slice(-8)}`;

    // Calculate totals
    const deliveryFee = formData.orderType === "delivery" ? 3.99 : 0;
    const tax = (total + deliveryFee) * 0.1;
    const finalTotal = total + deliveryFee + tax;

    // Save order to history
    addOrder({
      orderNumber: orderNum,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: finalTotal,
      customerInfo: {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      },
      orderType: formData.orderType,
      deliveryAddress:
        formData.orderType === "delivery"
          ? {
              address: formData.address,
              city: formData.city,
              zipCode: formData.zipCode,
            }
          : undefined,
    });

    // Accessibility: Focus on confirmation message after submission
    setOrderComplete(true);
    setOrderNumber(orderNum);
    setTimeout(() => {
      document.getElementById("order-confirmation")?.focus();
    }, 0);

    // Clear cart and reset form
    clearCart();
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
      orderType: "pickup",
    });
    setIsProcessing(false);

    // Show success toast
    toast.success("Order placed successfully!", {
      description: `Your order #${orderNum} is confirmed.`,
    });
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-stone-50 pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto text-center py-20">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl font-serif font-bold text-coffee-dark mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-coffee-medium mb-8">
            Add some items to your cart before checking out.
          </p>
          <Link
            href="/menu"
            className="inline-block bg-gold-accent text-coffee-dark px-8 py-3 rounded-full font-bold hover:bg-coffee-dark hover:text-gold-accent transition-all duration-300"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-stone-50 pt-24 pb-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle size={40} className="text-green-600" />
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-serif font-bold text-coffee-dark mb-4">
              Order Confirmed!
            </h1>
            <p className="text-xl text-coffee-medium mb-8">
              Thank you for your order, {formData.fullName}!
            </p>

            <div className="bg-stone-50 rounded-2xl p-6 mb-8">
              <p className="text-sm text-coffee-medium mb-2">Order Number</p>
              <p className="text-2xl font-bold text-coffee-dark font-mono">
                {orderNumber}
              </p>
            </div>

            <div className="border-t border-b border-coffee-light/20 py-6 mb-8 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-coffee-medium">Email Confirmation</span>
                <span className="font-medium text-coffee-dark">
                  {formData.email}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-coffee-medium">Order Type</span>
                <span className="font-medium text-coffee-dark capitalize">
                  {formData.orderType}
                </span>
              </div>
              {formData.orderType === "delivery" && (
                <div className="flex justify-between text-sm">
                  <span className="text-coffee-medium">Delivery Address</span>
                  <span className="font-medium text-coffee-dark text-right">
                    {formData.address}, {formData.city}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Link
                href="/"
                className="w-full bg-gold-accent text-coffee-dark px-8 py-4 rounded-full font-bold hover:bg-coffee-dark hover:text-gold-accent transition-all duration-300"
              >
                Back to Home
              </Link>
              <Link
                href="/menu"
                className="w-full border border-coffee-dark text-coffee-dark px-8 py-4 rounded-full font-bold hover:bg-coffee-dark hover:text-gold-accent transition-all duration-300"
              >
                Order Again
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const deliveryFee = formData.orderType === "delivery" ? 3.99 : 0;
  const tax = (total + deliveryFee) * 0.1;
  const finalTotal = total + deliveryFee + tax;

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-coffee-medium hover:text-coffee-dark mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Menu
        </Link>

        <h1 className="text-4xl md:text-5xl font-serif font-bold text-coffee-dark mb-12">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Order Type */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-coffee-light/10">
                <h2 className="text-xl font-serif font-bold text-coffee-dark mb-4 flex items-center gap-3">
                  <ShoppingBag size={24} className="text-gold-accent" />
                  Order Type
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, orderType: "pickup" }))
                    }
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.orderType === "pickup"
                        ? "border-gold-accent bg-gold-accent/10"
                        : "border-gray-200 hover:border-gold-accent/30"
                    }`}
                  >
                    <p className="font-bold text-coffee-dark">Pickup</p>
                    <p className="text-sm text-coffee-medium">
                      Ready in 15 min
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        orderType: "delivery",
                      }))
                    }
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.orderType === "delivery"
                        ? "border-gold-accent bg-gold-accent/10"
                        : "border-gray-200 hover:border-gold-accent/30"
                    }`}
                  >
                    <p className="font-bold text-coffee-dark">Delivery</p>
                    <p className="text-sm text-coffee-medium">45-60 min</p>
                  </button>
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-coffee-light/10">
                <h2 className="text-xl font-serif font-bold text-coffee-dark mb-4 flex items-center gap-3">
                  <User size={24} className="text-gold-accent" />
                  Customer Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-coffee-dark mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-coffee-light/20 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-gold-accent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-coffee-dark mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-coffee-light/20 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-gold-accent"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-coffee-dark mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-coffee-light/20 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-gold-accent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address (if delivery selected) */}
              {formData.orderType === "delivery" && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-coffee-light/10">
                  <h2 className="text-xl font-serif font-bold text-coffee-dark mb-4 flex items-center gap-3">
                    <MapPin size={24} className="text-gold-accent" />
                    Delivery Address
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-coffee-dark mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        required={formData.orderType === "delivery"}
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-coffee-light/20 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-gold-accent"
                        placeholder="123 Coffee Street"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-coffee-dark mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          required={formData.orderType === "delivery"}
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-coffee-light/20 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-gold-accent"
                          placeholder="Brew City"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-coffee-dark mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          required={formData.orderType === "delivery"}
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-coffee-light/20 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-gold-accent"
                          placeholder="12345"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Information */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-coffee-light/10">
                <h2 className="text-xl font-serif font-bold text-coffee-dark mb-4 flex items-center gap-3">
                  <CreditCard size={24} className="text-gold-accent" />
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-coffee-dark mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      maxLength={19}
                      className="w-full px-4 py-3 rounded-xl border border-coffee-light/20 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-gold-accent"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-coffee-dark mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      required
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-coffee-light/20 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-gold-accent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-coffee-dark mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        required
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        maxLength={5}
                        className="w-full px-4 py-3 rounded-xl border border-coffee-light/20 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-gold-accent"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-coffee-dark mb-2 flex items-center gap-2">
                        CVV *
                        <Lock size={14} className="text-coffee-medium" />
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        required
                        value={formData.cvv}
                        onChange={handleInputChange}
                        maxLength={3}
                        className="w-full px-4 py-3 rounded-xl border border-coffee-light/20 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-gold-accent"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gold-accent text-coffee-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-coffee-dark hover:text-gold-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isProcessing
                  ? "Processing..."
                  : `Place Order - $${finalTotal.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-coffee-light/10 sticky top-24">
              <h2 className="text-xl font-serif font-bold text-coffee-dark mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-coffee-dark">
                        {item.name}
                      </p>
                      <p className="text-sm text-coffee-medium">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-coffee-dark">
                      $
                      {(
                        parseFloat(item.price.replace("$", "")) * item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-coffee-light/20 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-coffee-medium">Subtotal</span>
                  <span className="font-medium text-coffee-dark">
                    ${total.toFixed(2)}
                  </span>
                </div>
                {formData.orderType === "delivery" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-coffee-medium">Delivery Fee</span>
                    <span className="font-medium text-coffee-dark">
                      ${deliveryFee.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-coffee-medium">Tax (10%)</span>
                  <span className="font-medium text-coffee-dark">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-coffee-light/20">
                  <span className="text-coffee-dark">Total</span>
                  <span className="text-gold-accent">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-6 bg-gold-accent/10 rounded-xl p-4">
                <p className="text-sm text-coffee-dark">
                  <span className="font-bold">🔒 Secure Checkout</span>
                  <br />
                  Your payment information is encrypted and secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
