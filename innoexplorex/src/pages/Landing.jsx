import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  PlayCircle, Phone, Mail, Globe, Sparkles, 
  MapPin, Compass, Mountain, Palmtree, Building2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import FloatingChatbot from '@/components/common/FloatingChatbot';

export default function Landing() {
  const features = [
    { icon: Compass, text: 'AI Trip Planner', color: 'from-blue-500 to-cyan-500' },
    { icon: Mountain, text: 'VR Experiences', color: 'from-green-500 to-emerald-500' },
    { icon: Palmtree, text: 'Hidden Gems', color: 'from-orange-500 to-yellow-500' },
    { icon: Building2, text: 'Heritage Tours', color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-orange-300/30 to-pink-300/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-300/30 to-purple-300/30 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <MapPin className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                InnoExploreX
              </h1>
              <p className="text-xs text-gray-500">Smart Tourism 360</p>
            </div>
          </motion.div>
          
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-4 md:px-6 pt-8 md:pt-16 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full mb-6 shadow-lg"
              >
                <Sparkles className="text-yellow-500" size={20} />
                <span className="text-sm font-medium text-gray-700">AI-Powered Smart Tourism</span>
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome to
                </span>
                <br />
                <span className="text-gray-800">Smart Tourism</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  for Everyone! 🙏
                </span>
              </h2>

              <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Plan your dream trip across India with AI assistance. 
                Easy for everyone - from children to seniors!
              </p>

              {/* CTA Button */}
              <Link to={createPageUrl('Auth')}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="h-16 px-10 text-xl rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:opacity-90 shadow-2xl shadow-pink-500/30"
                  >
                    <PlayCircle className="mr-3" size={32} />
                    GET STARTED
                  </Button>
                </motion.div>
              </Link>

              {/* Contact Info */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8">
                <a href="tel:6303036776" className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow hover:shadow-lg transition-all">
                  <Phone className="text-green-500" size={20} />
                  <span className="text-sm font-medium">6303036776</span>
                </a>
                <a href="mailto:innoexplorex@gmail.com" className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow hover:shadow-lg transition-all">
                  <Mail className="text-blue-500" size={20} />
                  <span className="text-sm font-medium">innoexplorex@gmail.com</span>
                </a>
              </div>
            </motion.div>

            {/* Right Content - Feature Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/80 backdrop-blur p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="text-white" size={28} />
                  </div>
                  <h3 className="font-bold text-gray-800">{feature.text}</h3>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Destination Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                ✨ Explore Incredible India
              </span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Taj Mahal', img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400' },
                { name: 'Goa Beaches', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400' },
                { name: 'Kerala', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400' },
                { name: 'Jaipur', img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400' },
              ].map((dest, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="relative rounded-2xl overflow-hidden shadow-lg aspect-square"
                >
                  <img src={dest.img} alt={dest.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white font-bold">{dest.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <FloatingChatbot />
    </div>
  );
}