"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCart } from "../context/CartContext";
import {
  Coffee,
  ShoppingCart,
  Shield,
  X,
  Menu,
  Heart,
  User,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const { data: session } = useSession();
  const { items, setIsOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    if (isUserDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-coffee-dark/95 backdrop-blur-md border-b border-gold-accent/10 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gold-accent/10 p-2 rounded-full group-hover:bg-gold-accent/20 transition-colors duration-300">
              <Coffee className="h-6 w-6 text-gold-accent" />
            </div>
            <span className="text-xl font-serif font-bold text-coffee-cream tracking-wide group-hover:text-gold-light transition-colors duration-300">
              BrewHouse
            </span>
          </Link>

          {/* Desktop Navigation - Main Items Only */}
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "Menu", "Gallery", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={
                  item === "Home"
                    ? "/"
                    : item === "Menu"
                    ? "/menu"
                    : `/${item.toLowerCase()}`
                }
                className="text-coffee-cream/90 hover:text-gold-accent font-medium transition-colors relative group text-sm uppercase tracking-wider"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Cart and User Section */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-coffee-cream hover:text-gold-accent transition-colors group"
            >
              <ShoppingCart size={20} />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-accent text-coffee-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  {items.length}
                </span>
              )}
            </button>

            {session ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center gap-3 px-3 py-2 text-coffee-cream hover:text-gold-accent transition-colors rounded-full hover:bg-white/5"
                >
                  <div className="w-8 h-8 bg-gold-accent/20 rounded-full flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <span className="text-sm font-medium">
                    {session.user?.name}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      isUserDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-64 bg-coffee-dark/95 backdrop-blur-xl border border-gold-accent/20 rounded-xl shadow-xl overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-gold-accent/10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gold-accent/20 rounded-full flex items-center justify-center">
                            <User size={20} />
                          </div>
                          <div>
                            <p className="text-coffee-cream font-medium">
                              {session.user?.name}
                            </p>
                            <p className="text-coffee-cream/60 text-sm">
                              {session.user?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="py-2">
                        {/* User Navigation Items */}
                        {[
                          { name: "Products", href: "/products" },
                          { name: "Gift Cards", href: "/gift-cards" },
                          { name: "Blog", href: "/blog" },
                          { name: "Favorites", href: "/favorites" },
                          { name: "Rewards", href: "/rewards" },
                          { name: "Orders", href: "/orders" },
                          { name: "Profile", href: "/profile" },
                        ].map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-3 text-coffee-cream hover:text-gold-accent hover:bg-white/5 transition-all"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}

                        {/* Admin Link */}
                        {session?.user?.email === "admin@brewhouse.com" && (
                          <Link
                            href="/admin"
                            className="flex items-center gap-3 px-4 py-3 text-coffee-cream hover:text-gold-accent hover:bg-white/5 transition-all"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            <Shield size={16} />
                            <span>Admin Dashboard</span>
                          </Link>
                        )}

                        <div className="border-t border-gold-accent/10 mt-2 pt-2">
                          <button
                            onClick={() => {
                              signOut();
                              setIsUserDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-coffee-cream hover:text-gold-accent hover:bg-white/5 transition-all"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/auth/signup"
                  className="text-coffee-cream hover:text-gold-accent font-medium text-sm uppercase tracking-wider transition-colors"
                >
                  Sign Up
                </Link>
                <button
                  onClick={() => signIn()}
                  className="px-6 py-2 bg-gold-accent text-coffee-dark rounded-full text-sm font-bold hover:bg-gold-light hover:shadow-lg hover:shadow-gold-accent/20 transition-all duration-300"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-coffee-cream hover:text-gold-accent transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-coffee-dark/95 backdrop-blur-xl border-t border-gold-accent/10 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {[
                "Home",
                "Menu",
                "Products",
                "Gift Cards",
                "About",
                "Gallery",
                "Blog",
                "Rewards",
                "Orders",
                "Contact",
              ].map((item) => (
                <Link
                  key={item}
                  href={
                    item === "Home"
                      ? "/"
                      : item === "Gift Cards"
                      ? "/gift-cards"
                      : `/${item.toLowerCase().replace(" ", "-")}`
                  }
                  className="block px-4 py-3 text-coffee-cream hover:text-gold-accent hover:bg-white/5 rounded-lg font-medium transition-all"
                  onClick={toggleMenu}
                >
                  {item}
                </Link>
              ))}

              {/* Mobile Cart */}
              <div className="border-t border-white/10 mt-4 pt-4">
                <button
                  onClick={() => {
                    setIsOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-coffee-cream hover:text-gold-accent hover:bg-white/5 rounded-lg font-medium w-full text-left transition-all"
                >
                  <ShoppingCart size={20} />
                  <span>Cart</span>
                  {items.length > 0 && (
                    <span className="bg-gold-accent text-coffee-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-auto">
                      {items.length}
                    </span>
                  )}
                </button>

                {/* Mobile Admin Link */}
                {session?.user?.email === "admin@brewhouse.com" && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-3 px-4 py-3 text-coffee-cream hover:text-gold-accent hover:bg-white/5 rounded-lg font-medium transition-all"
                    onClick={toggleMenu}
                  >
                    <Shield size={20} />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
              </div>

              {/* Mobile Auth */}
              <div className="border-t border-white/10 mt-4 pt-4">
                {session ? (
                  <div className="space-y-3 px-4">
                    <span className="block text-coffee-cream text-sm">
                      Signed in as {session.user?.name}
                    </span>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-center px-4 py-3 border border-gold-accent/30 rounded-lg text-gold-accent font-medium hover:bg-gold-accent hover:text-coffee-dark transition-all"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 px-4">
                    <Link
                      href="/auth/signup"
                      className="block w-full text-center px-4 py-3 text-coffee-cream hover:text-gold-accent font-medium transition-all"
                      onClick={toggleMenu}
                    >
                      Sign Up
                    </Link>
                    <button
                      onClick={() => signIn()}
                      className="block w-full text-center px-4 py-3 bg-gold-accent text-coffee-dark rounded-lg font-bold hover:bg-gold-light transition-all"
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-coffee-dark/95 backdrop-blur-md border-t border-gold-accent/10 py-2 flex justify-around items-center md:hidden">
        <Link href="/" className="flex flex-col items-center text-gold-accent">
          <Coffee size={24} />
          <span className="text-xs">Home</span>
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center text-gold-accent"
        >
          <ShoppingCart size={24} />
          <span className="text-xs">Cart</span>
        </button>
        <Link
          href="/favorites"
          className="flex flex-col items-center text-gold-accent"
        >
          <Heart size={24} />
          <span className="text-xs">Favorites</span>
        </Link>
        <Link
          href="/profile"
          className="flex flex-col items-center text-gold-accent"
        >
          <Shield size={24} />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
