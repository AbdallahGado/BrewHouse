"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useOrders } from "@/context/OrderContext";
import { Footer } from "@/components/Footer";
import {
  Shield,
  Package,
  Clock,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { orders, updateOrderStatus } = useOrders();
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (
      session?.user?.email &&
      session.user.email !== "admin@brewhouse.com"
    ) {
      router.push("/");
      toast.error("Unauthorized access");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-accent"></div>
      </div>
    );
  }

  if (!session || session.user?.email !== "admin@brewhouse.com") {
    return null;
  }

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "preparing":
        return "bg-blue-100 text-blue-800";
      case "ready":
        return "bg-green-100 text-green-800";
      case "delivered":
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif font-bold text-coffee-dark flex items-center gap-3">
            <Shield size={32} className="text-gold-accent" />
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-coffee-medium">
              Welcome, {session.user.name}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-coffee-light/10 mb-8">
          <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2">
            {["all", "pending", "preparing", "ready", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  filter === f
                    ? "bg-gold-accent text-coffee-dark"
                    : "bg-stone-100 text-coffee-medium hover:bg-stone-200"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-100">
                  <th className="pb-4 font-serif font-bold text-coffee-dark">
                    Order ID
                  </th>
                  <th className="pb-4 font-serif font-bold text-coffee-dark">
                    Customer
                  </th>
                  <th className="pb-4 font-serif font-bold text-coffee-dark">
                    Items
                  </th>
                  <th className="pb-4 font-serif font-bold text-coffee-dark">
                    Total
                  </th>
                  <th className="pb-4 font-serif font-bold text-coffee-dark">
                    Status
                  </th>
                  <th className="pb-4 font-serif font-bold text-coffee-dark">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="group hover:bg-stone-50">
                      <td className="py-4 font-mono text-sm">
                        {order.orderNumber}
                      </td>
                      <td className="py-4">
                        <div className="font-medium text-coffee-dark">
                          {order.customerInfo.name}
                        </div>
                        <div className="text-xs text-coffee-medium">
                          {order.customerInfo.email}
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="text-sm text-coffee-dark">
                          {order.items.length} items
                        </div>
                        <div className="text-xs text-coffee-medium truncate max-w-[200px]">
                          {order.items.map((i) => i.name).join(", ")}
                        </div>
                      </td>
                      <td className="py-4 font-medium text-coffee-dark">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          {order.status === "pending" && (
                            <button
                              onClick={() =>
                                updateOrderStatus(order.id, "preparing")
                              }
                              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                              title="Mark as Preparing"
                            >
                              <Package size={16} />
                            </button>
                          )}
                          {order.status === "preparing" && (
                            <button
                              onClick={() =>
                                updateOrderStatus(order.id, "ready")
                              }
                              className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition-colors"
                              title="Mark as Ready"
                            >
                              <Clock size={16} />
                            </button>
                          )}
                          {order.status === "ready" && (
                            <button
                              onClick={() =>
                                updateOrderStatus(order.id, "completed")
                              }
                              className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                              title="Mark as Completed"
                            >
                              <CheckCircle size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
