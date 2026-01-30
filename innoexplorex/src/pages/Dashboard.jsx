import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Compass, Luggage, Image, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import FloatingChatbot from '@/components/common/FloatingChatbot';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

export default function Dashboard() {
  const cards = [
    {
      icon: Compass,
      title: 'EXPLORE',
      subtitle: 'Discover Amazing Places',
      emoji: '🧭',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      shadowColor: 'shadow-blue-500/30',
      link: 'Explore'
    },
    {
      icon: Luggage,
      title: 'PLAN MY TRIP',
      subtitle: 'AI-Powered Planning',
      emoji: '🧳',
      gradient: 'from-orange-500 via-pink-500 to-purple-500',
      shadowColor: 'shadow-pink-500/30',
      link: 'PlanTrip'
    },
    {
      icon: Image,
      title: 'GALLERY',
      subtitle: 'Travel Memories',
      emoji: '📸',
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      shadowColor: 'shadow-green-500/30',
      link: 'Gallery'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-r from-orange-300/20 to-pink-300/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 md:p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <MapPin className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                InnoExploreX
              </h1>
              <p className="text-xs text-gray-500">Smart Tourism 360</p>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                What would you like to do? 🌟
              </span>
            </h2>
            <p className="text-gray-600 text-lg">Choose an option to get started</p>
          </motion.div>

          {/* Main Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <Link to={createPageUrl(card.link)}>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -8 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card className={`relative overflow-hidden border-0 shadow-2xl ${card.shadowColor} rounded-3xl cursor-pointer group`}>
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-90`} />
                      
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      
                      {/* Content */}
                      <div className="relative p-8 md:p-10 text-white text-center">
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                          className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
                        >
                          <span className="text-5xl md:text-6xl">{card.emoji}</span>
                        </motion.div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">
                          {card.title}
                        </h3>
                        <p className="text-white/80 text-sm md:text-base">
                          {card.subtitle}
                        </p>

                        {/* Arrow Indicator */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="mt-6 inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium"
                        >
                          Tap to open →
                        </motion.div>
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { label: 'Destinations', value: '500+', emoji: '🗺️' },
              { label: 'Happy Travelers', value: '10K+', emoji: '😊' },
              { label: 'States Covered', value: '29', emoji: '🇮🇳' },
              { label: 'VR Tours', value: '100+', emoji: '🎥' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="bg-white/80 backdrop-blur rounded-2xl p-4 text-center shadow-lg"
              >
                <span className="text-2xl">{stat.emoji}</span>
                <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <FloatingChatbot />
    </div>
  );
}