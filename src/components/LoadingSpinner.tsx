"use client";

import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({ 
  size = 40, 
  className = "", 
  fullScreen = false 
}: LoadingSpinnerProps) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          <Loader2 size={size} className="animate-spin text-gold-accent mx-auto mb-4" />
          <p className="text-coffee-medium font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 size={size} className="animate-spin text-gold-accent" />
    </div>
  );
}
