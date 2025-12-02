"use client";

import { useOrders } from "@/context/OrderContext";
import { motion } from "framer-motion";
import { Package, Clock, CheckCircle, Truck, ChefHat, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";

const statusIcons = {
  pending: Clock,
  preparing: ChefHat,
  ready: CheckCircle,
  delivered: Truck,
  completed: CheckCircle,
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  preparing: "bg-blue-100 text-blue-700 border-blue-200",
  ready: "bg-green-100 text-green-700 border-green-200",
  delivered: "bg-purple-100 text-purple-700 border-purple-200",
  completed: "bg-gray-100 text-gray-700 border-gray-200",
};

export default function OrdersPage() {
  const { orders } = useOrders();

  return (
    <>
      <div className="min-h-screen bg-stone-50 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-coffee-dark mb-4">
              Order History
            </h1>
            <p className="text-coffee-medium">
              Track your past orders and their current status
            </p>
          </div>

          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Package size={64} className="mx-auto text-gray-300 mb-6" />
              <h2 className="text-2xl font-serif font-bold text-coffee-dark mb-4">
                No Orders Yet
              </h2>
              <p className="text-coffee-medium mb-8">
                Start ordering to see your history here
              </p>
              <Link
                href="/menu"
                className="inline-block bg-gold-accent text-coffee-dark px-8 py-3 rounded-full font-bold hover:bg-coffee-dark hover:text-gold-accent transition-all duration-300"
              >
                Browse Menu
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => {
                const StatusIcon = statusIcons[order.status];
                const statusColor = statusColors[order.status];

                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-coffee-light/10"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-serif font-bold text-coffee-dark">
                            Order #{order.orderNumber}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColor} capitalize`}>
                            <StatusIcon size={14} className="inline mr-1" />
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-coffee-medium">
                          {new Date(order.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-gold-accent">
                          ${order.total.toFixed(2)}
                        </p>
                        <p className="text-sm text-coffee-medium capitalize">
                          {order.orderType}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-coffee-light/10 pt-4 mb-4">
                      <h4 className="font-semibold text-coffee-dark mb-3">Order Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-coffee-medium">
                              {item.quantity}x {item.name}
                            </span>
                            <span className="font-medium text-coffee-dark">
                              ${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-coffee-light/10 pt-4 grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-coffee-dark mb-2 flex items-center gap-2">
                          <Phone size={16} className="text-gold-accent" />
                          Customer Info
                        </h4>
                        <p className="text-sm text-coffee-medium">{order.customerInfo.name}</p>
                        <p className="text-sm text-coffee-medium">{order.customerInfo.email}</p>
                        <p className="text-sm text-coffee-medium">{order.customerInfo.phone}</p>
                      </div>

                      {order.orderType === "delivery" && order.deliveryAddress && (
                        <div>
                          <h4 className="font-semibold text-coffee-dark mb-2 flex items-center gap-2">
                            <MapPin size={16} className="text-gold-accent" />
                            Delivery Address
                          </h4>
                          <p className="text-sm text-coffee-medium">{order.deliveryAddress.address}</p>
                          <p className="text-sm text-coffee-medium">
                            {order.deliveryAddress.city}, {order.deliveryAddress.zipCode}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-coffee-light/10">
                      <Link
                        href={`/track/${order.id}`}
                        className="text-gold-accent hover:text-coffee-dark font-medium text-sm transition-colors"
                      >
                        Track Order →
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
