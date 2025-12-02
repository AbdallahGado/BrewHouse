"use client";

import { useLoyalty } from "@/context/LoyaltyContext";
import { motion } from "framer-motion";
import { Award, Gift, Star, TrendingUp, Trophy, Zap } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export default function RewardsPage() {
  const { points, tier, getTierBenefits } = useLoyalty();

  const tierColors = {
    bronze: "from-orange-600 to-amber-700",
    silver: "from-gray-400 to-gray-600",
    gold: "from-yellow-400 to-yellow-600",
  };

  const tierIcons = {
    bronze: Award,
    silver: Star,
    gold: Trophy,
  };

  const TierIcon = tierIcons[tier];

  const nextTier = tier === "bronze" ? "silver" : tier === "silver" ? "gold" : null;
  const nextTierPoints = tier === "bronze" ? 500 : tier === "silver" ? 1000 : null;
  const pointsToNextTier = nextTierPoints ? nextTierPoints - points : 0;

  return (
    <>
      <div className="min-h-screen bg-stone-50 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-coffee-dark mb-4">
              Rewards Program
            </h1>
            <p className="text-coffee-medium text-lg">
              Earn points with every purchase and unlock exclusive rewards
            </p>
          </div>

          {/* Points Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-br ${tierColors[tier]} rounded-3xl p-8 text-white mb-12 shadow-2xl`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 rounded-full p-4">
                  <TierIcon size={40} />
                </div>
                <div>
                  <p className="text-white/80 text-sm uppercase tracking-wide">Your Tier</p>
                  <h2 className="text-3xl font-serif font-bold capitalize">{tier}</h2>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-sm mb-1">Total Points</p>
                <p className="text-5xl font-bold">{points}</p>
              </div>
            </div>

            {nextTier && (
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Progress to {nextTier}</span>
                  <span className="text-sm font-bold">{pointsToNextTier} points to go</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div
                    className="bg-white rounded-full h-3 transition-all duration-500"
                    style={{ width: `${(points / nextTierPoints!) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Your Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-coffee-light/10"
            >
              <h3 className="text-2xl font-serif font-bold text-coffee-dark mb-6 flex items-center gap-3">
                <Zap className="text-gold-accent" size={28} />
                Your Benefits
              </h3>
              <ul className="space-y-4">
                {getTierBenefits().map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="bg-gold-accent/10 rounded-full p-1.5 mt-0.5">
                      <Star size={14} className="text-gold-accent fill-gold-accent" />
                    </div>
                    <span className="text-coffee-dark">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* How to Earn */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-coffee-light/10"
            >
              <h3 className="text-2xl font-serif font-bold text-coffee-dark mb-6 flex items-center gap-3">
                <TrendingUp className="text-gold-accent" size={28} />
                How to Earn
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-gold-accent/10 rounded-full p-1.5 mt-0.5">
                    <Gift size={14} className="text-gold-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-coffee-dark">Make a Purchase</p>
                    <p className="text-sm text-coffee-medium">Earn 1 point for every $1 spent</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-gold-accent/10 rounded-full p-1.5 mt-0.5">
                    <Trophy size={14} className="text-gold-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-coffee-dark">Reach Higher Tiers</p>
                    <p className="text-sm text-coffee-medium">Earn bonus points with every purchase</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-gold-accent/10 rounded-full p-1.5 mt-0.5">
                    <Star size={14} className="text-gold-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-coffee-dark">Birthday Bonus</p>
                    <p className="text-sm text-coffee-medium">Get 50 bonus points on your birthday</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-gradient-to-r from-gold-accent to-gold-light rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-serif font-bold text-coffee-dark mb-4">
              Start Earning Today!
            </h3>
            <p className="text-coffee-dark/80 mb-6">
              Every purchase gets you closer to exclusive rewards
            </p>
            <Link
              href="/menu"
              className="inline-block bg-coffee-dark text-gold-accent px-8 py-4 rounded-full font-bold hover:bg-white transition-all duration-300"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
