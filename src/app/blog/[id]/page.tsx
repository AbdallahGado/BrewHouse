"use client";

import { useState, useEffect } from "react";
import { blogPosts } from "@/data/blogPosts";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Link as LinkIcon,
  MessageCircle,
  Eye,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { TableOfContents } from "@/components/TableOfContents";
import { ReadingProgress } from "@/components/ReadingProgress";
import { BlogSidebar } from "@/components/BlogSidebar";

export default function BlogPostPage() {
  const params = useParams();
  const postId = params.id as string;

  const post = blogPosts.find((p) => p.id === postId || p.slug === postId);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [views, setViews] = useState(0);

  useEffect(() => {
    setShareUrl(window.location.href);
    // Load likes from localStorage
    const savedLikes = localStorage.getItem(`blog-likes-${postId}`);
    if (savedLikes) {
      setLikes(parseInt(savedLikes));
    }
    const userHasLiked = localStorage.getItem(`blog-liked-${postId}`);
    if (userHasLiked) {
      setHasLiked(true);
    }
    // Set views on client side only to avoid hydration mismatch
    setViews(Math.floor(Math.random() * 500) + 100);
  }, [postId]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    if (!hasLiked) {
      const newLikes = likes + 1;
      setLikes(newLikes);
      setHasLiked(true);
      localStorage.setItem(`blog-likes-${postId}`, newLikes.toString());
      localStorage.setItem(`blog-liked-${postId}`, "true");
    }
  };

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
      <ReadingProgress />
      <article className="min-h-screen bg-stone-50 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
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
                className="mb-8"
              >
                <div className="mb-6">
                  <span className="inline-block bg-gold-accent/10 text-gold-accent px-4 py-1 rounded-full text-sm font-medium mb-4">
                    {post.category}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-serif font-bold text-coffee-dark mb-4">
                    {post.title}
                  </h1>
                  <p className="text-xl text-coffee-medium mb-6">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 text-sm text-coffee-medium">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span>{post.author.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye size={16} />
                      <span>{views} views</span>
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

              {/* Table of Contents */}
              <TableOfContents content={post.content} />

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="prose prose-lg max-w-none

                  /* Typography */
                  prose-headings:font-serif prose-headings:text-coffee-dark prose-headings:scroll-mt-24
                  prose-p:text-coffee-dark prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                  prose-a:text-gold-accent prose-a:no-underline hover:prose-a:underline prose-a:font-medium prose-a:transition-colors
                  prose-strong:text-coffee-dark prose-strong:font-bold prose-strong:bg-gold-accent/10 prose-strong:px-1 prose-strong:py-0.5 prose-strong:rounded
                  prose-li:text-coffee-dark prose-li:mb-2 prose-li:text-lg prose-li:leading-relaxed
                  prose-ul:space-y-2 prose-ol:space-y-2 prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6

                  /* Headings */
                  prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-16 prose-h1:border-b-2 prose-h1:border-gold-accent/30 prose-h1:pb-4 prose-h1:font-bold
                  prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:border-b prose-h2:border-coffee-light/30 prose-h2:pb-3 prose-h2:font-semibold
                  prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-10 prose-h3:text-coffee-dark prose-h3:font-semibold
                  prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-8 prose-h4:font-medium

                  /* Block Elements */
                  prose-blockquote:border-l-4 prose-blockquote:border-gold-accent prose-blockquote:pl-8 prose-blockquote:italic prose-blockquote:bg-gradient-to-r prose-blockquote:from-gold-accent/5 prose-blockquote:to-transparent prose-blockquote:py-4 prose-blockquote:my-8 prose-blockquote:rounded-r-lg
                  prose-hr:border-coffee-light/30 prose-hr:my-12

                  /* Code and Media */
                  prose-pre:bg-stone-100 prose-pre:border prose-pre:border-coffee-light/20 prose-pre:rounded-lg
                  prose-code:bg-stone-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
                  prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-coffee-light/20"
              >
                <ReactMarkdown
                  components={{
                    h1: ({ children, ...props }) => {
                      const id =
                        children
                          ?.toString()
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-+|-+$/g, "") || "";
                      return (
                        <h1 id={id} {...props}>
                          {children}
                        </h1>
                      );
                    },
                    h2: ({ children, ...props }) => {
                      const id =
                        children
                          ?.toString()
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-+|-+$/g, "") || "";
                      return (
                        <h2 id={id} {...props}>
                          {children}
                        </h2>
                      );
                    },
                    h3: ({ children, ...props }) => {
                      const id =
                        children
                          ?.toString()
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-+|-+$/g, "") || "";
                      return (
                        <h3 id={id} {...props}>
                          {children}
                        </h3>
                      );
                    },
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </motion.div>

              {/* Like and Share Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-8 border-y border-coffee-light/20 py-6"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleLike}
                      disabled={hasLiked}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                        hasLiked
                          ? "bg-red-100 text-red-600 cursor-not-allowed"
                          : "bg-coffee-light/10 text-coffee-dark hover:bg-red-100 hover:text-red-600"
                      }`}
                    >
                      <ThumbsUp
                        size={18}
                        className={hasLiked ? "fill-current" : ""}
                      />
                      <span className="font-medium">
                        {likes} {likes === 1 ? "Like" : "Likes"}
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-coffee-medium">
                    <Share2 size={20} />
                    <span className="font-semibold">Share this article</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        post.title
                      )}&url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1DA1F2] text-white hover:opacity-90 transition-opacity"
                      aria-label="Share on Twitter"
                    >
                      <Twitter size={18} />
                      <span className="text-sm font-medium hidden sm:inline">
                        Twitter
                      </span>
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        shareUrl
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#4267B2] text-white hover:opacity-90 transition-opacity"
                      aria-label="Share on Facebook"
                    >
                      <Facebook size={18} />
                      <span className="text-sm font-medium hidden sm:inline">
                        Facebook
                      </span>
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        shareUrl
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077B5] text-white hover:opacity-90 transition-opacity"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin size={18} />
                      <span className="text-sm font-medium hidden sm:inline">
                        LinkedIn
                      </span>
                    </a>
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-coffee-dark text-gold-accent hover:bg-coffee-medium transition-colors"
                      aria-label="Copy link"
                    >
                      <LinkIcon size={18} />
                      <span className="text-sm font-medium">
                        {copied ? "Copied!" : "Copy Link"}
                      </span>
                    </button>
                  </div>
                </div>
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
                    <p className="font-bold text-coffee-dark text-lg">
                      {post.author.name}
                    </p>
                    <p className="text-coffee-medium">{post.author.role}</p>
                  </div>
                </div>
              </motion.div>

              {/* Comments Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-12 bg-stone-100 rounded-2xl p-8 border border-coffee-light/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle size={24} className="text-gold-accent" />
                  <h3 className="text-2xl font-serif font-bold text-coffee-dark">
                    Comments
                  </h3>
                </div>
                <p className="text-coffee-medium mb-4">
                  We'd love to hear your thoughts on this article! Comments
                  feature coming soon.
                </p>
                <div className="bg-white rounded-xl p-6 border border-coffee-light/10">
                  <p className="text-sm text-coffee-medium text-center italic">
                    💬 Comment section will be available in the next update. In
                    the meantime, feel free to share your thoughts with us on
                    social media or visit us at BrewHouse!
                  </p>
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
                  {blogPosts
                    .filter((p) => p.id !== post.id)
                    .slice(0, 2)
                    .map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.slug}`}
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
                          <h3 className="font-serif font-bold text-coffee-dark mb-2 group-hover:text-gold-accent transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-coffee-medium line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                        </div>
                      </Link>
                    ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <BlogSidebar
                  onCategoryFilter={() => {}}
                  onSearch={() => {}}
                  selectedCategory={null}
                />
              </div>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
