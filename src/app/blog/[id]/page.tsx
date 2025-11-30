"use client";

import { motion } from "framer-motion";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { useParams } from "next/navigation";

// Mock data - in a real app this would come from a CMS or API
const posts = {
  "pour-over-guide": {
    title: "The Art of Pour Over Coffee",
    date: "Oct 15, 2023",
    author: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3VyJTIwb3ZlciUyMGNvZmZlZXxlbnwxfHx8fDE3NjQyNDIzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    content: `
      <p class="mb-6">Pour over coffee is a manual brewing method that allows for precise control over every variable of the brewing process. Unlike automatic drip machines, the pour over method involves pouring hot water over coffee grounds in a filter.</p>
      
      <h3 class="text-2xl font-bold mb-4 text-amber-900">Why Pour Over?</h3>
      <p class="mb-6">This method is celebrated for its ability to highlight the intricate flavors and aromas of single-origin beans. The slow, steady pour ensures even saturation of the grounds, resulting in a clean, complex cup.</p>
      
      <h3 class="text-2xl font-bold mb-4 text-amber-900">The Essentials</h3>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Freshly roasted coffee beans</li>
        <li>Burr grinder</li>
        <li>Gooseneck kettle</li>
        <li>Scale</li>
        <li>Dripper (V60, Chemex, or Kalita Wave)</li>
      </ul>
      
      <p>Mastering the pour over takes practice, but the reward is a cup of coffee that truly honors the bean's origin.</p>
    `
  },
  "roast-levels": {
    title: "Understanding Coffee Roast Levels",
    date: "Oct 22, 2023",
    author: "Michael Chen",
    image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMHJvYXN0ZWR8ZW58MXx8fHwxNzY0MjQyMzM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    content: `
      <p class="mb-6">Coffee roasting is both an art and a science. The roast level significantly impacts the flavor profile, acidity, and body of the final cup.</p>
      
      <h3 class="text-2xl font-bold mb-4 text-amber-900">Light Roast</h3>
      <p class="mb-6">Light roasts are roasted for a shorter time, preserving the unique characteristics of the bean's origin. They often have higher acidity and floral or fruity notes.</p>
      
      <h3 class="text-2xl font-bold mb-4 text-amber-900">Medium Roast</h3>
      <p class="mb-6">Medium roasts offer a balance between the bean's natural flavor and the roast character. They are often sweeter and have a more rounded body.</p>
      
      <h3 class="text-2xl font-bold mb-4 text-amber-900">Dark Roast</h3>
      <p class="mb-6">Dark roasts are roasted longer, resulting in bold, smoky, and chocolatey flavors. The acidity is low, and the body is full.</p>
    `
  },
  "sustainability": {
    title: "Sustainability in Coffee Farming",
    date: "Nov 05, 2023",
    author: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1511537632536-b7a575805d93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBmYXJtfGVufDF8fHx8MTc2NDI0MjMzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    content: `
      <p class="mb-6">At BrewHouse, we believe that great coffee starts with great relationships. We work directly with farmers who prioritize sustainable and ethical farming practices.</p>
      
      <h3 class="text-2xl font-bold mb-4 text-amber-900">Ethical Sourcing</h3>
      <p class="mb-6">We pay fair prices to our partner farmers, ensuring they can invest in their communities and improve their farming techniques.</p>
      
      <h3 class="text-2xl font-bold mb-4 text-amber-900">Environmental Impact</h3>
      <p class="mb-6">We support shade-grown coffee, which preserves biodiversity and protects the soil. We also encourage water conservation and organic farming methods.</p>
    `
  }
};

export default function BlogPost() {
  const params = useParams();
  const slug = params.id as string;
  const post = posts[slug as keyof typeof posts];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link href="/" className="text-amber-600 hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="relative h-[60vh]">
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold font-serif mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {post.title}
            </motion.h1>
            <motion.div 
              className="flex items-center justify-center gap-6 text-sm md:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="flex items-center gap-2"><Calendar size={16} /> {post.date}</span>
              <span className="flex items-center gap-2"><User size={16} /> {post.author}</span>
            </motion.div>
          </div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/#blog" className="inline-flex items-center gap-2 text-amber-600 font-medium mb-8 hover:-translate-x-1 transition-transform">
          <ArrowLeft size={20} /> Back to Blog
        </Link>
        
        <div 
          className="prose prose-lg prose-stone max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <Footer />
    </main>
  );
}
