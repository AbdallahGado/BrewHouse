"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, CreditCard, Mail, Download } from "lucide-react";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

const giftCardAmounts = [25, 50, 100, 150, 200];

export default function GiftCardsPage() {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!recipientName || !recipientEmail || !senderName) {
      toast.error("Please fill in all required fields");
      return;
    }

    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;

    if (isNaN(amount) || amount < 10 || amount > 500) {
      toast.error("Please enter a valid amount between $10 and $500");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/gift-cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientName,
          recipientEmail,
          senderName,
          amount,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Gift Card Sent!", {
          description: `A $${amount} gift card has been sent to ${recipientEmail}. Code: ${data.giftCard.code}`,
        });

        // Reset form
        setRecipientEmail("");
        setRecipientName("");
        setSenderName("");
        setMessage("");
        setCustomAmount("");
      } else {
        toast.error(data.error || "Failed to send gift card");
      }
    } catch (error) {
      console.error("Gift card purchase error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-stone-50 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Gift size={64} className="mx-auto text-gold-accent mb-6" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-coffee-dark mb-4">
              Gift Cards
            </h1>
            <p className="text-xl text-coffee-medium max-w-2xl mx-auto">
              Share the joy of exceptional coffee with friends and loved ones
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Purchase Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <form onSubmit={handlePurchase} className="space-y-8">
                {/* Amount Selection */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-coffee-light/10">
                  <h2 className="text-2xl font-serif font-bold text-coffee-dark mb-6">
                    Select Amount
                  </h2>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {giftCardAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount("");
                        }}
                        disabled={isSubmitting}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedAmount === amount && !customAmount
                            ? "border-gold-accent bg-gold-accent/10"
                            : "border-coffee-light/20 hover:border-gold-accent/30"
                        } disabled:opacity-50`}
                      >
                        <span className="text-2xl font-bold text-coffee-dark">
                          ${amount}
                        </span>
                      </button>
                    ))}
                    <div className="col-span-3">
                      <input
                        type="number"
                        placeholder="Custom amount"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl border border-coffee-light/20 focus:outline-none focus:ring-2 focus:ring-gold-accent disabled:opacity-50"
                        min="10"
                        max="500"
                      />
                    </div>
                  </div>
                </div>

                {/* Recipient Information */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-coffee-light/10">
                  <h2 className="text-2xl font-serif font-bold text-coffee-dark mb-6">
                    Recipient Information
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-coffee-dark mb-2">
                        Recipient Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl border border-coffee-light/20 focus:outline-none focus:ring-2 focus:ring-gold-accent disabled:opacity-50"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-coffee-dark mb-2">
                        Recipient Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl border border-coffee-light/20 focus:outline-none focus:ring-2 focus:ring-gold-accent disabled:opacity-50"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-coffee-dark mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl border border-coffee-light/20 focus:outline-none focus:ring-2 focus:ring-gold-accent disabled:opacity-50"
                        placeholder="Jane Smith"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-coffee-dark mb-2">
                        Personal Message (Optional)
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={isSubmitting}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-coffee-light/20 focus:outline-none focus:ring-2 focus:ring-gold-accent resize-none disabled:opacity-50"
                        placeholder="Add a personal message to your gift..."
                      />
                    </div>
                  </div>
                </div>

                {/* Purchase Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold-accent text-coffee-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-coffee-dark hover:text-gold-accent transition-all duration-300 shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CreditCard size={24} />
                  {isSubmitting
                    ? "Sending Gift Card..."
                    : `Purchase Gift Card - $${customAmount || selectedAmount}`}
                </button>
              </form>
            </motion.div>

            {/* Preview & Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Gift Card Preview */}
              <div className="bg-linear-to-br from-coffee-dark to-coffee-medium rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-accent/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <Gift size={32} className="text-gold-accent" />
                    <span className="text-2xl font-serif font-bold">
                      BrewHouse
                    </span>
                  </div>
                  <div className="mb-8">
                    <p className="text-white/60 text-sm mb-2">
                      Gift Card Value
                    </p>
                    <p className="text-5xl font-bold text-gold-accent">
                      ${customAmount || selectedAmount}
                    </p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white/60 text-sm mb-1">To</p>
                      <p className="font-medium">
                        {recipientName || "Recipient Name"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-sm mb-1">From</p>
                      <p className="font-medium">{senderName || "Your Name"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-coffee-light/10">
                <h3 className="text-xl font-serif font-bold text-coffee-dark mb-6">
                  How It Works
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-gold-accent/10 rounded-full p-2 mt-1">
                      <Mail size={18} className="text-gold-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-coffee-dark mb-1">
                        Instant Delivery
                      </p>
                      <p className="text-sm text-coffee-medium">
                        Gift card sent immediately via email
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-gold-accent/10 rounded-full p-2 mt-1">
                      <Download size={18} className="text-gold-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-coffee-dark mb-1">
                        Printable Option
                      </p>
                      <p className="text-sm text-coffee-medium">
                        Print at home or send digitally
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-gold-accent/10 rounded-full p-2 mt-1">
                      <Gift size={18} className="text-gold-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-coffee-dark mb-1">
                        Never Expires
                      </p>
                      <p className="text-sm text-coffee-medium">
                        Use anytime, no expiration date
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="bg-stone-100 rounded-xl p-6">
                <p className="text-sm text-coffee-medium">
                  <strong className="text-coffee-dark">Note:</strong> Gift cards
                  can be used for any purchase at BrewHouse locations or online.
                  Not redeemable for cash. Lost or stolen cards cannot be
                  replaced.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
