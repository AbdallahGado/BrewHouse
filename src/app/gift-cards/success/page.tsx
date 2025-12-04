"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Gift, Mail, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export default function GiftCardSuccessPage() {
  const searchParams = useSearchParams();

  const amount = searchParams.get("amount");
  const code = searchParams.get("code");
  const recipientEmail = searchParams.get("recipientEmail");
  const recipientName = searchParams.get("recipientName");
  const senderName = searchParams.get("senderName");
  const message = searchParams.get("message");

  return (
    <>
      <div className="min-h-screen bg-stone-50 pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-coffee-dark mb-4">
              Gift Card Purchased!
            </h1>
            <p className="text-xl text-coffee-medium">
              Your gift card has been sent successfully
            </p>
          </motion.div>

          {/* Gift Card Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-coffee-light/10 mb-8"
          >
            <div className="text-center mb-8">
              <Gift size={48} className="mx-auto text-gold-accent mb-4" />
              <div className="text-6xl font-bold text-coffee-dark mb-2">
                ${amount}
              </div>
              <div className="text-coffee-medium">Gift Card Value</div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-coffee-light/20">
                <span className="text-coffee-medium">Gift Card Code:</span>
                <span className="font-mono font-bold text-coffee-dark text-lg">
                  {code}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-coffee-light/20">
                <span className="text-coffee-medium">Recipient:</span>
                <span className="font-semibold text-coffee-dark">
                  {recipientName}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-coffee-light/20">
                <span className="text-coffee-medium">Email Sent To:</span>
                <span className="font-semibold text-coffee-dark">
                  {recipientEmail}
                </span>
              </div>
              {senderName && (
                <div className="flex justify-between items-center py-3 border-b border-coffee-light/20">
                  <span className="text-coffee-medium">From:</span>
                  <span className="font-semibold text-coffee-dark">
                    {senderName}
                  </span>
                </div>
              )}
              {message && (
                <div className="py-3">
                  <span className="text-coffee-medium block mb-2">
                    Personal Message:
                  </span>
                  <div className="bg-stone-50 p-4 rounded-lg">
                    <p className="text-coffee-dark italic">"{message}"</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-coffee-light/10 mb-8"
          >
            <h3 className="text-xl font-serif font-bold text-coffee-dark mb-6">
              What's Next?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-gold-accent/10 rounded-full p-2 mt-1">
                  <Mail size={18} className="text-gold-accent" />
                </div>
                <div>
                  <p className="font-semibold text-coffee-dark mb-1">
                    Email Confirmation
                  </p>
                  <p className="text-sm text-coffee-medium">
                    The recipient will receive an email with the gift card
                    details and redemption instructions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-gold-accent/10 rounded-full p-2 mt-1">
                  <Download size={18} className="text-gold-accent" />
                </div>
                <div>
                  <p className="font-semibold text-coffee-dark mb-1">
                    Digital Gift Card
                  </p>
                  <p className="text-sm text-coffee-medium">
                    The gift card can be used online or in-store at any
                    BrewHouse location.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/gift-cards"
              className="inline-flex items-center justify-center gap-2 bg-gold-accent text-coffee-dark px-8 py-4 rounded-full font-bold hover:bg-coffee-dark hover:text-gold-accent transition-all duration-300"
            >
              <ArrowLeft size={20} />
              Buy Another Gift Card
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 bg-coffee-dark text-gold-accent px-8 py-4 rounded-full font-bold hover:bg-gold-accent hover:text-coffee-dark transition-all duration-300 border-2 border-gold-accent"
            >
              Explore Our Menu
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
