"use client";

import { useState, useMemo } from "react";
import { blogPosts } from "@/data/blogPosts";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { BlogSidebar } from "./BlogSidebar";

const POSTS_PER_PAGE = 6;

export function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        !selectedCategory || post.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold-accent font-serif font-medium tracking-widest uppercase mb-4 block">
            Our Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-coffee-dark">
            Coffee Culture & Insights
          </h1>
          <p className="text-xl text-coffee-medium max-w-2xl mx-auto font-light">
            Discover the world of coffee through our comprehensive collection of
            articles, guides, and expert insights.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Info */}
            <div className="mb-8">
              <p className="text-coffee-medium">
                Showing {paginatedPosts.length} of {filteredPosts.length} posts
                {selectedCategory && ` in "${selectedCategory}"`}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            {/* Posts Grid */}
            {paginatedPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {paginatedPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-coffee-light/10 hover:shadow-xl transition-all duration-300 group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 bg-coffee-dark/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gold-accent uppercase tracking-wider">
                          {post.category}
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-4 text-xs text-coffee-medium/70 mb-3 uppercase tracking-wider font-medium">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} className="text-gold-accent" />
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <User size={14} className="text-gold-accent" />
                            {post.author.name}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} className="text-gold-accent" />
                            {post.readTime}
                          </div>
                        </div>

                        <h3 className="text-xl font-serif font-bold text-coffee-dark mb-3 group-hover:text-gold-accent transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-coffee-medium/80 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-2 text-gold-accent font-bold text-sm">
                          Read More <ArrowRight size={16} />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-2xl font-serif font-bold text-coffee-dark mb-4">
                  No posts found
                </h3>
                <p className="text-coffee-medium mb-6">
                  Try adjusting your search or category filter.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="bg-gold-accent text-coffee-dark px-6 py-3 rounded-full font-bold hover:bg-coffee-dark hover:text-gold-accent transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-coffee-light/20 text-coffee-medium hover:bg-coffee-light/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        page === currentPage
                          ? "bg-gold-accent text-coffee-dark border-gold-accent"
                          : "border-coffee-light/20 text-coffee-medium hover:bg-coffee-light/10"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-coffee-light/20 text-coffee-medium hover:bg-coffee-light/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BlogSidebar
                onCategoryFilter={handleCategoryFilter}
                onSearch={handleSearch}
                selectedCategory={selectedCategory}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
