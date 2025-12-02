"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./Navigation";
import { CartSidebar } from "./CartSidebar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");

  return (
    <>
      {!isAuthPage && <Navigation />}
      {!isAuthPage && <CartSidebar />}
      {children}
    </>
  );
}
