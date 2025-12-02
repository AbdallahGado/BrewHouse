"use client";
import { MapPin, Phone, Mail, Clock, Send, Navigation2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully!", {
          description: "We'll get back to you as soon as possible.",
        });
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        const error = await response.json();
        toast.error("Failed to send message", {
          description: error.error || "Please try again later.",
        });
      }
    } catch (error) {
      toast.error("Network error", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-coffee-light/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold-accent font-serif font-medium tracking-widest uppercase mb-4 block">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-coffee-dark">
            Contact Us
          </h1>
          <p className="text-xl text-coffee-medium max-w-3xl mx-auto font-light leading-relaxed">
            Have questions or feedback? We'd love to hear from you. Visit us, give us a call, or send us a message below.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {/* Location */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-coffee-light/10 hover:shadow-xl transition-all duration-300 group">
            <div className="bg-coffee-dark rounded-full w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-gold-accent transition-colors duration-300">
              <MapPin className="text-gold-accent group-hover:text-coffee-dark" size={24} />
            </div>
            <h3 className="text-lg font-serif font-bold text-coffee-dark mb-2">Visit Us</h3>
            <p className="text-coffee-medium/80 text-sm font-light">123 Coffee Street</p>
            <p className="text-coffee-medium/80 text-sm font-light">Brew City, BC 12345</p>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-coffee-light/10 hover:shadow-xl transition-all duration-300 group">
            <div className="bg-coffee-dark rounded-full w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-gold-accent transition-colors duration-300">
              <Phone className="text-gold-accent group-hover:text-coffee-dark" size={24} />
            </div>
            <h3 className="text-lg font-serif font-bold text-coffee-dark mb-2">Call Us</h3>
            <p className="text-coffee-medium/80 text-sm font-light">(555) 123-BREW</p>
            <p className="text-coffee-medium/80 text-sm font-light">(555) 123-4739</p>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-coffee-light/10 hover:shadow-xl transition-all duration-300 group">
            <div className="bg-coffee-dark rounded-full w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-gold-accent transition-colors duration-300">
              <Mail className="text-gold-accent group-hover:text-coffee-dark" size={24} />
            </div>
            <h3 className="text-lg font-serif font-bold text-coffee-dark mb-2">Email Us</h3>
            <p className="text-coffee-medium/80 text-sm font-light">hello@brewhouse.com</p>
            <p className="text-coffee-medium/80 text-sm font-light">support@brewhouse.com</p>
          </div>

          {/* Hours */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-coffee-light/10 hover:shadow-xl transition-all duration-300 group">
            <div className="bg-coffee-dark rounded-full w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-gold-accent transition-colors duration-300">
              <Clock className="text-gold-accent group-hover:text-coffee-dark" size={24} />
            </div>
            <h3 className="text-lg font-serif font-bold text-coffee-dark mb-2">Opening Hours</h3>
            <p className="text-coffee-medium/80 text-sm font-light">Mon-Fri: 7:00 AM - 8:00 PM</p>
            <p className="text-coffee-medium/80 text-sm font-light">Sat-Sun: 8:00 AM - 6:00 PM</p>
          </div>
        </motion.div>

        {/* Main Contact Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-coffee-light/10"
          >
            <h2 className="text-3xl font-serif font-bold text-coffee-dark mb-2">Send us a Message</h2>
            <p className="text-coffee-medium/80 mb-8 font-light">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-coffee-dark mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-coffee-light/20 bg-stone-50 text-coffee-dark placeholder-coffee-medium/40 focus:outline-none focus:ring-2 focus:ring-gold-accent focus:border-transparent transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-coffee-dark mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-coffee-light/20 bg-stone-50 text-coffee-dark placeholder-coffee-medium/40 focus:outline-none focus:ring-2 focus:ring-gold-accent focus:border-transparent transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-coffee-dark mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-coffee-light/20 bg-stone-50 text-coffee-dark placeholder-coffee-medium/40 focus:outline-none focus:ring-2 focus:ring-gold-accent focus:border-transparent transition-all duration-300"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-coffee-dark mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-coffee-light/20 bg-stone-50 text-coffee-dark placeholder-coffee-medium/40 focus:outline-none focus:ring-2 focus:ring-gold-accent focus:border-transparent transition-all duration-300"
                    placeholder="General Inquiry"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-coffee-dark mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-coffee-light/20 bg-stone-50 text-coffee-dark placeholder-coffee-medium/40 focus:outline-none focus:ring-2 focus:ring-gold-accent focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold-accent text-coffee-dark px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-coffee-dark hover:text-gold-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Map & Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Map */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-coffee-light/10 h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648750455!2d-73.98823492404069!3d40.74844097138558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1701234567890!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Why Contact Us */}
            <div className="bg-coffee-dark rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-accent/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
              
              <h3 className="text-2xl font-serif font-bold text-gold-light mb-4 relative z-10">
                We're Here to Help
              </h3>
              <div className="space-y-4 relative z-10">
                <div className="flex items-start gap-3">
                  <div className="bg-gold-accent/20 rounded-full p-1.5 mt-1">
                    <Navigation2 size={16} className="text-gold-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gold-light mb-1">Easy to Find</h4>
                    <p className="text-coffee-cream/70 text-sm font-light">
                      Located in the heart of downtown, with ample parking and public transportation access.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-gold-accent/20 rounded-full p-1.5 mt-1">
                    <Clock size={16} className="text-gold-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gold-light mb-1">Quick Response</h4>
                    <p className="text-coffee-cream/70 text-sm font-light">
                      We typically respond to all inquiries within 24 hours during business days.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-gold-accent/20 rounded-full p-1.5 mt-1">
                    <Mail size={16} className="text-gold-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gold-light mb-1">Multiple Channels</h4>
                    <p className="text-coffee-cream/70 text-sm font-light">
                      Reach us via phone, email, or this form - whatever works best for you.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media CTA */}
            <div className="bg-gradient-to-br from-gold-accent to-gold-light rounded-3xl p-8 text-coffee-dark shadow-xl">
              <h3 className="text-2xl font-serif font-bold mb-3">
                Follow Our Journey
              </h3>
              <p className="mb-6 font-light">
                Stay connected with us on social media for updates, promotions, and coffee inspiration.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-coffee-dark text-gold-accent px-6 py-3 rounded-full font-bold hover:bg-white hover:text-coffee-dark transition-all duration-300"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="bg-coffee-dark text-gold-accent px-6 py-3 rounded-full font-bold hover:bg-white hover:text-coffee-dark transition-all duration-300"
                >
                  Facebook
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
