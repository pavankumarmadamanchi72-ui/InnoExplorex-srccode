import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Mountain, Waves, Church, Castle, TreePine, Tent,
  Star, Play, ArrowLeft, MapPin, Search, X, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import FloatingChatbot from '@/components/common/FloatingChatbot';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

const categories = [
  { id: 'all', name: 'All', icon: '🌍', color: 'from-gray-500 to-gray-600' },
  { id: 'hills', name: 'Hills', icon: '🏔️', color: 'from-green-500 to-emerald-600' },
  { id: 'beaches', name: 'Beaches', icon: '🏖️', color: 'from-blue-400 to-cyan-500' },
  { id: 'temples', name: 'Temples', icon: '🛕', color: 'from-orange-500 to-amber-500' },
  { id: 'heritage', name: 'Heritage', icon: '🏰', color: 'from-purple-500 to-pink-500' },
  { id: 'wildlife', name: 'Wildlife', icon: '🦁', color: 'from-yellow-500 to-orange-500' },
  { id: 'adventure', name: 'Adventure', icon: '🏕️', color: 'from-red-500 to-rose-500' },
];

export default function Explore() {
  const { data: destinations = [], isLoading: loadingDestinations } = useQuery({
    queryKey: ['destinations'],
    queryFn: () => base44.entities.Destination.list('-rating', 100),
    initialData: []
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showVR, setShowVR] = useState(false);

  const filteredDestinations = destinations.filter(dest => {
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.state?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loadingDestinations) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading destinations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to={createPageUrl('Dashboard')}>
            <Button variant="ghost" className="gap-2 rounded-full">
              <ArrowLeft size={20} />
              <span className="hidden md:inline">Back</span>
            </Button>
          </Link>
          
          <h1 className="text-xl md:text-2xl font-bold">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🧭 Explore India
            </span>
          </h1>

          <LanguageSwitcher />
        </div>
      </header>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destinations..."
            className="pl-12 h-14 rounded-full border-2 border-purple-200 focus:border-purple-500 text-lg"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Category Chips */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="font-medium">{cat.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Destination Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredDestinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className="overflow-hidden rounded-3xl border-0 shadow-xl hover:shadow-2xl transition-all cursor-pointer group"
                  onClick={() => setSelectedDestination(dest)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={dest.image_url || dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    {/* VR Badge */}
                    {dest.vr_video_url && (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"
                      >
                        <Play size={14} className="text-purple-600 fill-purple-600" />
                        <span className="text-xs font-bold text-purple-600">VR</span>
                      </motion.div>
                    )}

                    {/* Rating Badge */}
                    <div className="absolute top-3 left-3 bg-yellow-400 px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                      <Star size={14} className="text-yellow-800 fill-yellow-800" />
                      <span className="text-sm font-bold text-yellow-800">{dest.rating}</span>
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{dest.name}</h3>
                      <div className="flex items-center gap-1 text-white/80 text-sm">
                        <MapPin size={14} />
                        {dest.state}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-16">
            <span className="text-6xl">🔍</span>
            <p className="text-xl text-gray-500 mt-4">No destinations found</p>
          </div>
        )}
      </div>

      {/* Destination Detail Dialog */}
      <Dialog open={!!selectedDestination} onOpenChange={() => setSelectedDestination(null)}>
        <DialogContent className="max-w-2xl p-0 rounded-3xl overflow-hidden">
          {selectedDestination && (
            <>
              <div className="relative aspect-video">
                {showVR && selectedDestination.vr_video_url ? (
                  <iframe
                    src={selectedDestination.vr_video_url}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                ) : (
                  <img
                    src={selectedDestination.image_url || selectedDestination.image}
                    alt={selectedDestination.name}
                    className="w-full h-full object-cover"
                  />
                )}
                
                {selectedDestination.vr_video_url && (
                  <Button
                    onClick={() => setShowVR(!showVR)}
                    className="absolute bottom-4 right-4 rounded-full bg-purple-600 hover:bg-purple-700 gap-2"
                  >
                    {showVR ? '📷 Photo' : '🎥 VR Tour'}
                  </Button>
                )}
              </div>

              <div className="p-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl flex items-center gap-3">
                    {selectedDestination.name}
                    <Badge className="bg-yellow-400 text-yellow-800">
                      <Star size={12} className="mr-1 fill-yellow-800" />
                      {selectedDestination.rating}
                    </Badge>
                  </DialogTitle>
                </DialogHeader>

                <div className="mt-4 space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={18} className="text-red-500" />
                  {selectedDestination.state}
                </div>

                <p className="text-gray-700">{selectedDestination.description}</p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-xl">
                    <span className="text-xl">📅</span>
                    <div>
                      <p className="text-xs text-gray-500">Best Time</p>
                      <p className="font-medium text-blue-700">{selectedDestination.best_time}</p>
                    </div>
                  </div>

                  {selectedDestination.budget_per_day && (
                    <div className="flex items-center gap-2 bg-green-50 p-3 rounded-xl">
                      <span className="text-xl">💰</span>
                      <div>
                        <p className="text-xs text-gray-500">Budget/Day</p>
                        <p className="font-medium text-green-700">₹{selectedDestination.budget_per_day}</p>
                      </div>
                    </div>
                  )}
                </div>

                  <Link to={createPageUrl('PlanTrip') + `?destination=${selectedDestination.name}`}>
                    <Button className="w-full h-14 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-lg font-bold">
                      🧳 Plan Trip to {selectedDestination.name}
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <FloatingChatbot />
    </div>
  );
}