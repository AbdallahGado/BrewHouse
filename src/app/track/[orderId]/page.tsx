"use client";

import { useOrders } from "@/context/OrderContext";
import { motion } from "framer-motion";
import { CheckCircle, Clock, ChefHat, Truck, Package, MapPin } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Footer } from "@/components/Footer";

const statusSteps = [
  { status: "pending", label: "Order Placed", icon: Package },
  { status: "preparing", label: "Preparing", icon: ChefHat },
  { status: "ready", label: "Ready", icon: CheckCircle },
  { status: "delivered", label: "Delivered", icon: Truck },
];

export default function TrackOrderPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const { getOrder } = useOrders();
  
  const order = getOrder(orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-stone-50 pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto text-center py-20">
          <Package size={64} className="mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl font-serif font-bold text-coffee-dark mb-4">
            Order Not Found
          </h1>
          <p className="text-coffee-medium mb-8">
            We couldn't find an order with this ID
          </p>
          <Link
            href="/orders"
            className="inline-block bg-gold-accent text-coffee-dark px-8 py-3 rounded-full font-bold hover:bg-coffee-dark hover:text-gold-accent transition-all duration-300"
          >
            View All Orders
          </Link>
        </div>
      </div>
    );
  }

  const currentStepIndex = statusSteps.findIndex(step => step.status === order.status);

  return (
    <>
      <div className="min-h-screen bg-stone-50 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-coffee-medium hover:text-coffee-dark mb-8 transition-colors"
          >
            ← Back to Orders
          </Link>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-coffee-dark mb-12">
            Track Order #{order.orderNumber}
          </h1>

          {/* Progress Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-coffee-light/10 mb-8"
          >
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-coffee-light/20" />
              <div 
                className="absolute left-8 top-8 w-0.5 bg-gold-accent transition-all duration-1000"
                style={{ height: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
              />

              {/* Steps */}
              <div className="space-y-12 relative">
                {statusSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;

                  return (
                    <motion.div
                      key={step.status}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-6"
                    >
                      <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${
                        isCompleted 
                          ? 'bg-gold-accent text-coffee-dark' 
                          : 'bg-white border-2 border-coffee-light/20 text-coffee-medium'
                      } transition-all duration-300`}>
                        <StepIcon size={28} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-xl font-serif font-bold ${
                          isCompleted ? 'text-coffee-dark' : 'text-coffee-medium'
                        }`}>
                          {step.label}
                        </h3>
                        {isCurrent && (
                          <p className="text-sm text-gold-accent font-medium mt-1 flex items-center gap-2">
                            <Clock size={14} />
                            In Progress
                          </p>
                        )}
                        {isCompleted && !isCurrent && (
                          <p className="text-sm text-green-600 font-medium mt-1 flex items-center gap-2">
                            <CheckCircle size={14} />
                            Completed
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Order Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-coffee-light/10"
            >
              <h3 className="text-lg font-serif font-bold text-coffee-dark mb-4">
                Order Information
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-coffee-medium">Order Date</span>
                  <span className="font-medium text-coffee-dark">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-coffee-medium">Order Type</span>
                  <span className="font-medium text-coffee-dark capitalize">
                    {order.orderType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-coffee-medium">Total Amount</span>
                  <span className="font-bold text-gold-accent">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>

            {order.orderType === "delivery" && order.deliveryAddress && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-coffee-light/10"
              >
                <h3 className="text-lg font-serif font-bold text-coffee-dark mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-gold-accent" />
                  Delivery Address
                </h3>
                <div className="space-y-1 text-sm text-coffee-medium">
                  <p>{order.deliveryAddress.address}</p>
                  <p>{order.deliveryAddress.city}, {order.deliveryAddress.zipCode}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
