"use client";

import { blogPosts } from "@/data/blogPosts";
import { motion } from "framer-motion";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function BlogPostPage() {
  const params = useParams();
  const postId = params.id as string;
  
  const post = blogPosts.find(p => p.id === postId || p.slug === postId);

  if (!post) {
    return (
      <div className="min-h-screen bg-stone-50 pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto text-center py-20">
          <h1 className="text-3xl font-serif font-bold text-coffee-dark mb-4">
            Post Not Found
          </h1>
          <Link
            href="/blog"
            className="inline-block bg-gold-accent text-coffee-dark px-8 py-3 rounded-full font-bold hover:bg-coffee-dark hover:text-gold-accent transition-all duration-300"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <article className="min-h-screen bg-stone-50 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-coffee-medium hover:text-coffee-dark mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="mb-6">
              <span className="inline-block bg-gold-accent/10 text-gold-accent px-4 py-1 rounded-full text-sm font-medium mb-4">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-coffee-dark mb-4">
                {post.title}
              </h1>
              <p className="text-xl text-coffee-medium mb-6">{post.excerpt}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-coffee-medium">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{post.author.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none
              prose-headings:font-serif prose-headings:text-coffee-dark
              prose-p:text-coffee-dark prose-p:leading-relaxed
              prose-a:text-gold-accent prose-a:no-underline hover:prose-a:underline
              prose-strong:text-coffee-dark prose-strong:font-bold
              prose-li:text-coffee-dark
              prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8
              prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6"
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </motion.div>

          {/* Author Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-white rounded-2xl p-8 border border-coffee-light/10"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gold-accent/10 flex items-center justify-center">
                <User size={32} className="text-gold-accent" />
              </div>
              <div>
                <p className="font-bold text-coffee-dark text-lg">{post.author.name}</p>
                <p className="text-coffee-medium">{post.author.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Related Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-serif font-bold text-coffee-dark mb-6">
              More Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts.filter(p => p.id !== post.id).slice(0, 2).map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-coffee-light/10 hover:shadow-xl transition-all"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif font-bold text-coffee-dark mb-2 group-hover:text-gold-accent transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-coffee-medium">{relatedPost.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </article>
      <Footer />
    </>
  );
}
