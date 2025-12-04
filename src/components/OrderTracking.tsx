import { useState, useEffect } from "react";

const OrderTracking = ({ orderId }: { orderId: string }) => {
  const [status, setStatus] = useState("Preparing");
  const [progress, setProgress] = useState(20);
  const [estimatedTime, setEstimatedTime] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus("Delivered");
          return 100;
        }
        if (prev >= 80) setStatus("Out for Delivery");
        else if (prev >= 50) setStatus("Cooking");
        return prev + 10;
      });
      setEstimatedTime((prev) => (prev > 0 ? prev - 5 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Tracking</h2>
      <p className="text-lg mb-2">Order ID: {orderId}</p>
      <p className="text-lg mb-2">Status: {status}</p>
      <p className="text-lg mb-4">Estimated Time: {estimatedTime} mins</p>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default OrderTracking;
