"use client";

import { useState } from "react";
import { blogPosts } from "@/data/blogPosts";
import { Search, Calendar } from "lucide-react";
import Link from "next/link";

interface BlogSidebarProps {
  onCategoryFilter: (category: string | null) => void;
  onSearch: (query: string) => void;
  selectedCategory: string | null;
}

export function BlogSidebar({
  onCategoryFilter,
  onSearch,
  selectedCategory,
}: BlogSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique categories
  const categories = Array.from(
    new Set(blogPosts.map((post) => post.category))
  );

  // Get recent posts (last 5)
  const recentPosts = blogPosts.slice(0, 5);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleCategoryClick = (category: string | null) => {
    onCategoryFilter(category);
  };

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="bg-white rounded-2xl p-6 border border-coffee-light/10 shadow-sm">
        <h3 className="text-lg font-serif font-bold text-coffee-dark mb-4">
          Search Articles
        </h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-medium w-4 h-4" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 border border-coffee-light/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-accent/20 focus:border-gold-accent transition-colors"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-2xl p-6 border border-coffee-light/10 shadow-sm">
        <h3 className="text-lg font-serif font-bold text-coffee-dark mb-4">
          Categories
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              selectedCategory === null
                ? "bg-gold-accent text-coffee-dark font-medium"
                : "text-coffee-medium hover:bg-coffee-light/10"
            }`}
          >
            All Posts ({blogPosts.length})
          </button>
          {categories.map((category) => {
            const count = blogPosts.filter(
              (post) => post.category === category
            ).length;
            return (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? "bg-gold-accent text-coffee-dark font-medium"
                    : "text-coffee-medium hover:bg-coffee-light/10"
                }`}
              >
                {category} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-2xl p-6 border border-coffee-light/10 shadow-sm">
        <h3 className="text-lg font-serif font-bold text-coffee-dark mb-4">
          Recent Posts
        </h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-coffee-dark group-hover:text-gold-accent transition-colors line-clamp-2 text-sm leading-tight">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-coffee-medium">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-linear-to-br from-gold-accent/10 to-coffee-light/10 rounded-2xl p-6 border border-gold-accent/20">
        <h3 className="text-lg font-serif font-bold text-coffee-dark mb-2">
          Stay Updated
        </h3>
        <p className="text-sm text-coffee-medium mb-4">
          Get the latest coffee insights delivered to your inbox.
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-coffee-light/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-accent/20 focus:border-gold-accent transition-colors text-sm"
          />
          <button className="w-full bg-gold-accent text-coffee-dark px-4 py-2 rounded-lg font-medium hover:bg-coffee-dark hover:text-gold-accent transition-colors text-sm">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
