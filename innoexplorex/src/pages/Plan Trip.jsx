import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ArrowLeft, MapPin, Calendar, Sparkles, 
  Loader2, AlertCircle, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { base44 } from '@/api/base44Client';

import BudgetSelector from '@/components/trip/BudgetSelector';
import TravelerSelector from '@/components/trip/TravelerSelector';
import InterestSelector from '@/components/trip/InterestSelector';
import TravelModeSelector from '@/components/trip/TravelModeSelector';
import GeneratedPlan from '@/components/trip/GeneratedPlan';
import FloatingChatbot from '@/components/common/FloatingChatbot';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

// Fallback plan data in case AI fails
const fallbackPlan = {
  destination_name: "Incredible India Tour",
  duration: "4 Days",
  total_estimated_cost: 25000,
  trip_rating: "4.5",
  travel_options: [
    { mode: "train", name: "Rajdhani Express", duration: "8 hours", distance: "600 km", cost: 1500 },
    { mode: "bus", name: "Volvo AC Bus", duration: "10 hours", distance: "600 km", cost: 800 },
    { mode: "flight", name: "IndiGo/SpiceJet", duration: "2 hours", distance: "600 km", cost: 4500 }
  ],
  hotels: [
    { 
      name: "Hotel Royal Paradise", 
      category: "budget", 
      stars: 3, 
      location: "City Center",
      price_per_night: 1500,
      rating: 4.2,
      amenities: ["WiFi", "Breakfast", "AC"],
      phone: "1800-123-4567"
    },
    { 
      name: "Grand Heritage Inn", 
      category: "mid-range", 
      stars: 4, 
      location: "Near Tourist Hub",
      price_per_night: 3500,
      rating: 4.5,
      amenities: ["WiFi", "Breakfast", "Pool", "Parking"],
      phone: "1800-234-5678"
    },
    { 
      name: "Luxury Palace Resort", 
      category: "luxury", 
      stars: 5, 
      location: "Premium Location",
      price_per_night: 8000,
      rating: 4.8,
      amenities: ["WiFi", "Breakfast", "Pool", "Spa", "Parking"],
      phone: "1800-345-6789"
    }
  ],
  itinerary: [
    {
      title: "Arrival & Local Exploration",
      activities: [
        { time: "Morning", description: "Arrive and check into hotel" },
        { time: "Afternoon", description: "Visit local markets and food streets" },
        { time: "Evening", description: "Sunset viewpoint and local cuisine dinner" }
      ]
    },
    {
      title: "Heritage & Culture Day",
      activities: [
        { time: "Morning", description: "Visit historical monuments and temples" },
        { time: "Afternoon", description: "Museum and cultural center visit" },
        { time: "Evening", description: "Traditional cultural show" }
      ]
    },
    {
      title: "Adventure & Nature",
      activities: [
        { time: "Morning", description: "Nature walk or adventure activity" },
        { time: "Afternoon", description: "Scenic spots and photography" },
        { time: "Evening", description: "Local shopping and souvenirs" }
      ]
    },
    {
      title: "Departure Day",
      activities: [
        { time: "Morning", description: "Breakfast and final sightseeing" },
        { time: "Afternoon", description: "Check-out and departure" }
      ]
    }
  ],
  weather: {
    icon: "☀️",
    temperature: "28°C",
    condition: "Pleasant weather, light clothing recommended"
  },
  safety_alerts: [
    "Keep valuables secure while sightseeing",
    "Stay hydrated and carry water bottles"
  ],
  food_suggestions: [
    "Local Street Food",
    "Traditional Thali",
    "Regional Sweets",
    "Fresh Fruit Juices"
  ],
  clothing_suggestions: [
    "Light cotton clothes",
    "Comfortable walking shoes",
    "Sunglasses and hat",
    "Light jacket for evenings"
  ],
  rewards: [
    { title: "Early Bird Discount", description: "10% off on hotel bookings" },
    { title: "Travel Points", description: "Earn 500 reward points" }
  ]
};

export default function PlanTrip() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  
  const [tripData, setTripData] = useState({
    from_location: '',
    to_location: '',
    start_date: '',
    end_date: '',
    budget_type: 'medium',
    budget_amount: 25000,
    traveler_type: 'couple',
    traveler_count: 2,
    interests: [],
    travel_mode: 'train'
  });

  // Get destination from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dest = params.get('destination');
    if (dest) {
      setTripData(prev => ({ ...prev, to_location: dest }));
    }
  }, []);

  const updateTripData = (field, value) => {
    setTripData(prev => ({ ...prev, [field]: value }));
  };

  const generatePlan = async () => {
    setLoading(true);
    setRetryCount(0);

    // Auto-fill defaults if missing
    const filledData = {
      ...tripData,
      from_location: tripData.from_location || 'Delhi',
      to_location: tripData.to_location || 'Jaipur',
      start_date: tripData.start_date || new Date().toISOString().split('T')[0],
      end_date: tripData.end_date || new Date(Date.now() + 4*24*60*60*1000).toISOString().split('T')[0],
      interests: tripData.interests.length > 0 ? tripData.interests : ['culture', 'food']
    };

    const attemptGeneration = async (attempt = 1) => {
      try {
        const prompt = `Generate a detailed travel plan for a trip in India:
        
FROM: ${filledData.from_location}
TO: ${filledData.to_location}
DATES: ${filledData.start_date} to ${filledData.end_date}
BUDGET: ${filledData.budget_type} budget (₹${filledData.budget_amount} total)
TRAVELERS: ${filledData.traveler_count} ${filledData.traveler_type}
INTERESTS: ${filledData.interests.join(', ')}
TRAVEL MODE PREFERRED: ${filledData.travel_mode}

Provide REAL hotel recommendations with actual prices based on the budget:
- For LOW budget (under ₹15,000): Suggest budget hotels ₹800-1500/night
- For MEDIUM budget (₹15,000-40,000): Suggest mid-range hotels ₹2000-4000/night  
- For HIGH budget (over ₹40,000): Suggest luxury hotels ₹5000-15000/night

Include at least 3 specific hotel names with real pricing for the destination.

Return a comprehensive JSON with real-time cost estimates.`;

        const response = await base44.integrations.Core.InvokeLLM({
          prompt,
          add_context_from_internet: true,
          response_json_schema: {
            type: "object",
            properties: {
              destination_name: { type: "string" },
              duration: { type: "string" },
              total_estimated_cost: { type: "number" },
              trip_rating: { type: "string" },
              travel_options: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    mode: { type: "string" },
                    name: { type: "string" },
                    duration: { type: "string" },
                    distance: { type: "string" },
                    cost: { type: "number" }
                  }
                }
              },
              hotels: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    category: { type: "string" },
                    stars: { type: "number" },
                    location: { type: "string" },
                    price_per_night: { type: "number" },
                    rating: { type: "number" },
                    amenities: { type: "array", items: { type: "string" } },
                    phone: { type: "string" }
                  }
                }
              },
              itinerary: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    activities: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          time: { type: "string" },
                          description: { type: "string" }
                        }
                      }
                    }
                  }
                }
              },
              weather: {
                type: "object",
                properties: {
                  icon: { type: "string" },
                  temperature: { type: "string" },
                  condition: { type: "string" }
                }
              },
              safety_alerts: { type: "array", items: { type: "string" } },
              food_suggestions: { type: "array", items: { type: "string" } },
              clothing_suggestions: { type: "array", items: { type: "string" } },
              rewards: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" }
                  }
                }
              }
            }
          }
        });

        setGeneratedPlan(response);
        setTripData(filledData);
        setStep(2);
      } catch (error) {
        console.log(`Attempt ${attempt} failed, retrying...`);
        setRetryCount(attempt);
        
        if (attempt < 3) {
          await new Promise(r => setTimeout(r, 1000));
          await attemptGeneration(attempt + 1);
        } else {
          // Use fallback plan
          const customizedFallback = {
            ...fallbackPlan,
            destination_name: `Trip to ${filledData.to_location}`,
            total_estimated_cost: filledData.budget_amount
          };
          setGeneratedPlan(customizedFallback);
          setTripData(filledData);
          setStep(2);
        }
      }
    };

    await attemptGeneration();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to={createPageUrl('Dashboard')}>
            <Button variant="ghost" className="gap-2 rounded-full">
              <ArrowLeft size={20} />
              <span className="hidden md:inline">Back</span>
            </Button>
          </Link>
          
          <h1 className="text-xl md:text-2xl font-bold">
            <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              🧳 Plan Your Trip
            </span>
          </h1>

          <LanguageSwitcher />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 pb-24">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
                <CardContent className="p-6 space-y-6">
                  {/* From & To */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <MapPin className="text-green-500" size={18} />
                        From (Starting Point)
                      </Label>
                      <Input
                        value={tripData.from_location}
                        onChange={(e) => updateTripData('from_location', e.target.value)}
                        placeholder="e.g., Delhi, Mumbai"
                        className="h-14 rounded-xl border-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <MapPin className="text-red-500" size={18} />
                        To (Destination)
                      </Label>
                      <Input
                        value={tripData.to_location}
                        onChange={(e) => updateTripData('to_location', e.target.value)}
                        placeholder="e.g., Jaipur, Goa"
                        className="h-14 rounded-xl border-2"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Calendar className="text-blue-500" size={18} />
                        Start Date
                      </Label>
                      <Input
                        type="date"
                        value={tripData.start_date}
                        onChange={(e) => updateTripData('start_date', e.target.value)}
                        className="h-14 rounded-xl border-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Calendar className="text-purple-500" size={18} />
                        End Date
                      </Label>
                      <Input
                        type="date"
                        value={tripData.end_date}
                        onChange={(e) => updateTripData('end_date', e.target.value)}
                        className="h-14 rounded-xl border-2"
                      />
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <BudgetSelector
                    value={tripData.budget_type}
                    amount={tripData.budget_amount}
                    onChange={(val) => updateTripData('budget_type', val)}
                    onAmountChange={(val) => updateTripData('budget_amount', val)}
                  />

                  {/* Traveler Selector */}
                  <TravelerSelector
                    type={tripData.traveler_type}
                    count={tripData.traveler_count}
                    onTypeChange={(val) => updateTripData('traveler_type', val)}
                    onCountChange={(val) => updateTripData('traveler_count', val)}
                  />

                  {/* Interests */}
                  <InterestSelector
                    selected={tripData.interests}
                    onChange={(val) => updateTripData('interests', val)}
                  />

                  {/* Travel Mode */}
                  <TravelModeSelector
                    value={tripData.travel_mode}
                    onChange={(val) => updateTripData('travel_mode', val)}
                  />

                  {/* Generate Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={generatePlan}
                      disabled={loading}
                      className="w-full h-16 rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:opacity-90 text-xl font-bold shadow-2xl shadow-pink-500/30"
                    >
                      {loading ? (
                        <span className="flex items-center gap-3">
                          <Loader2 className="animate-spin" size={24} />
                          {retryCount > 0 ? `Retrying (${retryCount}/3)...` : 'Creating Your Plan...'}
                        </span>
                      ) : (
                        <span className="flex items-center gap-3">
                          <Sparkles size={24} />
                          🤖 GENERATE MY SMART PLAN
                        </span>
                      )}
                    </Button>
                  </motion.div>

                  {loading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-sm text-gray-500"
                    >
                      <p>✨ AI is finding the best options for you...</p>
                      <p>🏨 Searching real hotel prices...</p>
                      <p>🚌 Calculating travel costs...</p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Back to Edit Button */}
              <div className="mb-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="gap-2 rounded-full"
                >
                  <RefreshCw size={16} />
                  Modify Trip
                </Button>
              </div>

              <GeneratedPlan plan={generatedPlan} tripData={tripData} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <FloatingChatbot />
    </div>
  );
}