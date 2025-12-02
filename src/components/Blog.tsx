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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-coffee-light/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-gold-accent font-serif font-medium tracking-widest uppercase mb-4 block">
            Our Blog
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-coffee-dark">
            Coffee Culture
          </h2>
          <p className="text-xl text-coffee-medium max-w-2xl mx-auto font-light">
            Explore the world of coffee through our latest stories and guides.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-coffee-light/10 hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-coffee-dark/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gold-accent uppercase tracking-wider">
                  {post.category}
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-coffee-medium/70 mb-4 uppercase tracking-wider font-medium">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-gold-accent" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={14} className="text-gold-accent" />
                    {post.author}
                  </div>
                </div>
                
                <h3 className="text-xl font-serif font-bold text-coffee-dark mb-3 group-hover:text-gold-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-coffee-medium/80 text-sm mb-6 line-clamp-2 font-light leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                
                <a href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-gold-accent font-bold text-sm hover:gap-3 transition-all uppercase tracking-wider mt-auto">
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
