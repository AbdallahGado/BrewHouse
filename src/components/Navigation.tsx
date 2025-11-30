"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu, X, Coffee, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export function Navigation() {
  const { data: session } = useSession();
  const { items, setIsOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-coffee-dark/95 backdrop-blur-sm border-b border-gold-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Coffee className="h-8 w-8 text-gold-accent" />
            <span className="text-xl font-serif font-bold text-coffee-cream">
              BrewHouse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-coffee-cream hover:text-gold-accent font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="text-coffee-cream hover:text-gold-accent font-medium transition-colors"
            >
              Menu
            </Link>
            <Link
              href="/about"
              className="text-coffee-cream hover:text-gold-accent font-medium transition-colors"
            >
              About
            </Link>
            <Link
              href="/gallery"
              className="text-coffee-cream hover:text-gold-accent font-medium transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="/contact"
              className="text-coffee-cream hover:text-gold-accent font-medium transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Cart and Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-coffee-cream hover:text-gold-accent transition-colors"
            >
              <ShoppingCart size={20} />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-accent text-coffee-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>

            {/* Admin Link - Only show for admin users */}
            {session?.user?.email === "admin@brewhouse.com" && (
              <Link
                href="/admin"
                className="flex items-center gap-2 px-3 py-2 text-coffee-cream hover:text-gold-accent font-medium transition-colors"
              >
                <Shield size={16} />
                Admin
              </Link>
            )}

            {session ? (
              <div className="flex items-center gap-4">
                <span className="text-coffee-cream">
                  Welcome back, {session.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-coffee-cream hover:text-gold-accent font-medium transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/auth/signup"
                  className="text-coffee-cream hover:text-gold-accent font-medium transition-colors"
                >
                  Sign Up
                </Link>
                <button
                  onClick={() => signIn()}
                  className="text-coffee-cream hover:text-gold-accent font-medium transition-colors"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-coffee-cream hover:text-gold-accent"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gold-accent/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-coffee-cream hover:text-gold-accent font-medium"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="/menu"
                className="block px-3 py-2 text-coffee-cream hover:text-gold-accent font-medium"
                onClick={toggleMenu}
              >
                Menu
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-coffee-cream hover:text-gold-accent font-medium"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                href="/gallery"
                className="block px-3 py-2 text-coffee-cream hover:text-gold-accent font-medium"
                onClick={toggleMenu}
              >
                Gallery
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-coffee-cream hover:text-gold-accent font-medium"
                onClick={toggleMenu}
              >
                Contact
              </Link>

              {/* Mobile Cart */}
              <div className="border-t border-gold-accent/20 mt-4 pt-4">
                <button
                  onClick={() => {
                    setIsOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-3 py-2 text-coffee-cream hover:text-gold-accent font-medium w-full text-left"
                >
                  <ShoppingCart size={20} />
                  <span>Cart</span>
                  {items.length > 0 && (
                    <span className="bg-gold-accent text-coffee-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-auto">
                      {items.length}
                    </span>
                  )}
                </button>

                {/* Mobile Admin Link - Only show for admin users */}
                {session?.user?.email === "admin@brewhouse.com" && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-3 px-3 py-2 text-coffee-cream hover:text-gold-accent font-medium"
                    onClick={toggleMenu}
                  >
                    <Shield size={20} />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
              </div>

              {/* Mobile Auth */}
              <div className="border-t border-gold-accent/20 mt-4 pt-4">
                {session ? (
                  <div className="space-y-2">
                    <span className="block px-3 py-2 text-coffee-cream">
                      Welcome back, {session.user?.name}
                    </span>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-3 py-2 text-coffee-cream hover:text-gold-accent font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/auth/signup"
                      className="block px-3 py-2 text-coffee-cream hover:text-gold-accent font-medium"
                      onClick={toggleMenu}
                    >
                      Sign Up
                    </Link>
                    <button
                      onClick={() => signIn()}
                      className="block w-full text-left px-3 py-2 text-coffee-cream hover:text-gold-accent font-medium"
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
