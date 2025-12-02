"use client";

import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

export function SearchBar({ placeholder = "Search...", onSearch, className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Call onSearch when debounced query changes
  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleClear = () => {
    setQuery("");
    setDebouncedQuery("");
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-medium" 
          size={20} 
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 rounded-xl border border-coffee-light/20 bg-white focus:outline-none focus:ring-2 focus:ring-gold-accent text-coffee-dark placeholder-coffee-medium/50"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-coffee-medium hover:text-coffee-dark transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
