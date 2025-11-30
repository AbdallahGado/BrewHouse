"use client";

import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, Calendar, User } from "lucide-react";

const posts = [
  {
    slug: "pour-over-guide",
    title: "The Art of Pour Over Coffee",
    excerpt: "Master the technique of manual brewing for a cleaner, more flavorful cup.",
    date: "Oct 15, 2023",
    author: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3VyJTIwb3ZlciUyMGNvZmZlZXxlbnwxfHx8fDE3NjQyNDIzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Brewing Guide",
  },
  {
    slug: "roast-levels",
    title: "Understanding Coffee Roast Levels",
    excerpt: "From blonde to dark roast: how roasting profiles affect flavor notes.",
    date: "Oct 22, 2023",
    author: "Michael Chen",
    image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMHJvYXN0ZWR8ZW58MXx8fHwxNzY0MjQyMzM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Knowledge",
  },
  {
    slug: "sustainability",
    title: "Sustainability in Coffee Farming",
    excerpt: "How we work with farmers to ensure ethical and sustainable practices.",
    date: "Nov 05, 2023",
    author: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1511537632536-b7a575805d93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBmYXJtfGVufDF8fHx8MTc2NDI0MjMzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Sustainability",
  },
];

export function Blog() {
  return (
    <section className="py-20 px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
            Coffee Culture
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the world of coffee through our latest stories and guides.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-amber-800">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    {post.author}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <a href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-amber-600 font-semibold text-sm hover:gap-3 transition-all">
                  Read More <ArrowRight size={16} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
