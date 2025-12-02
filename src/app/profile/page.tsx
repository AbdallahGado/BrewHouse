"use client";

import { useSession } from "next-auth/react";
import { useOrders } from "@/context/OrderContext";
import { useLoyalty } from "@/context/LoyaltyContext";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Package,
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { useState } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const { orders } = useOrders();
  const { points, tier } = useLoyalty();

  const [profileData] = useState({
    name: session?.user?.name || "Guest User",
    email: session?.user?.email || "guest@example.com",
    phone: "(555) 123-4567",
    address: "123 Coffee Street",
    city: "Brew City",
    zipCode: "12345",
    birthday: "1990-01-01",
  });

  if (!session) {
    return (
      <div className="min-h-screen bg-stone-50 pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto text-center py-20">
          <User size={64} className="mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl font-serif font-bold text-coffee-dark mb-4">
            Sign in to View Profile
          </h1>
          <p className="text-coffee-medium mb-8">
            Please sign in to access your profile and order history
          </p>
          <Link
            href="/auth/signin"
            className="inline-block bg-gold-accent text-coffee-dark px-8 py-3 rounded-full font-bold hover:bg-coffee-dark hover:text-gold-accent transition-all duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-stone-50 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-coffee-dark mb-12">
            My Profile
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-coffee-light/10"
              >
                <h2 className="text-2xl font-serif font-bold text-coffee-dark mb-6 flex items-center gap-3">
                  <User size={24} className="text-gold-accent" />
                  Personal Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-coffee-medium mb-2">
                      Full Name
                    </label>
                    <p className="text-coffee-dark font-medium">
                      {profileData.name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-coffee-medium mb-2">
                      Email
                    </label>
                    <p className="text-coffee-dark font-medium flex items-center gap-2">
                      <Mail size={16} className="text-gold-accent" />
                      {profileData.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-coffee-medium mb-2">
                      Phone
                    </label>
                    <p className="text-coffee-dark font-medium flex items-center gap-2">
                      <Phone size={16} className="text-gold-accent" />
                      {profileData.phone}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-coffee-medium mb-2">
                      Birthday
                    </label>
                    <p className="text-coffee-dark font-medium flex items-center gap-2">
                      <Calendar size={16} className="text-gold-accent" />
                      {new Date(profileData.birthday).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Saved Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-coffee-light/10"
              >
                <h2 className="text-2xl font-serif font-bold text-coffee-dark mb-6 flex items-center gap-3">
                  <MapPin size={24} className="text-gold-accent" />
                  Saved Address
                </h2>
                <div className="space-y-2">
                  <p className="text-coffee-dark font-medium">
                    {profileData.address}
                  </p>
                  <p className="text-coffee-medium">
                    {profileData.city}, {profileData.zipCode}
                  </p>
                </div>
              </motion.div>

              {/* Recent Orders */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-coffee-light/10"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif font-bold text-coffee-dark flex items-center gap-3">
                    <Package size={24} className="text-gold-accent" />
                    Recent Orders
                  </h2>
                  <Link
                    href="/orders"
                    className="text-gold-accent hover:text-coffee-dark text-sm font-medium transition-colors"
                  >
                    View All →
                  </Link>
                </div>

                {orders.length === 0 ? (
                  <p className="text-coffee-medium text-center py-8">
                    No orders yet
                  </p>
                ) : (
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div
                        key={order.id}
                        className="border border-coffee-light/10 rounded-xl p-4 hover:border-gold-accent/30 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-coffee-dark">
                              Order #{order.orderNumber}
                            </p>
                            <p className="text-sm text-coffee-medium">
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <span className="text-gold-accent font-bold">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-sm text-coffee-medium capitalize">
                          {order.status}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-6">
              {/* Loyalty Status */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-linear-to-br from-gold-accent to-gold-light rounded-2xl p-6 text-coffee-dark"
              >
                <Award size={32} className="mb-4" />
                <h3 className="text-xl font-serif font-bold mb-2 capitalize">
                  {tier} Member
                </h3>
                <p className="text-3xl font-bold mb-4">{points} Points</p>
                <Link
                  href="/rewards"
                  className="block text-center bg-coffee-dark text-gold-accent px-4 py-2 rounded-full font-bold hover:bg-white transition-all"
                >
                  View Rewards
                </Link>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-coffee-light/10"
              >
                <h3 className="text-lg font-serif font-bold text-coffee-dark mb-4">
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-coffee-medium">Total Orders</span>
                    <span className="font-bold text-coffee-dark">
                      {orders.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-coffee-medium">Member Since</span>
                    <span className="font-bold text-coffee-dark">2024</span>
                  </div>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-coffee-light/10"
              >
                <h3 className="text-lg font-serif font-bold text-coffee-dark mb-4">
                  Quick Links
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/orders"
                    className="block text-coffee-dark hover:text-gold-accent transition-colors"
                  >
                    Order History →
                  </Link>
                  <Link
                    href="/favorites"
                    className="block text-coffee-dark hover:text-gold-accent transition-colors"
                  >
                    Favorites →
                  </Link>
                  <Link
                    href="/rewards"
                    className="block text-coffee-dark hover:text-gold-accent transition-colors"
                  >
                    Rewards →
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
