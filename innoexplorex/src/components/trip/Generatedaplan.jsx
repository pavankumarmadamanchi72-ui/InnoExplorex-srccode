import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Calendar, Hotel, Bus, Cloud, AlertTriangle, 
  Gift, Utensils, Shirt, Star, Clock, IndianRupee,
  Phone, ExternalLink, Wifi, Car, Coffee, Bath
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SectionCard = ({ icon: Icon, title, color, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
  >
    <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
      <CardHeader className={`bg-gradient-to-r ${color} text-white py-4`}>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon size={22} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {children}
      </CardContent>
    </Card>
  </motion.div>
);

export default function GeneratedPlan({ plan, tripData }) {
  if (!plan) return null;

  return (
    <div className="space-y-6">
      {/* Header Summary */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-3xl p-6 text-white shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
            <MapPin size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{plan.destination_name}</h2>
            <p className="text-white/80">{tripData.from_location} → {tripData.to_location}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-white/20 rounded-xl p-3 text-center">
            <Calendar size={20} className="mx-auto mb-1" />
            <p className="text-sm font-medium">{plan.duration || '3-4'} Days</p>
          </div>
          <div className="bg-white/20 rounded-xl p-3 text-center">
            <IndianRupee size={20} className="mx-auto mb-1" />
            <p className="text-sm font-medium">₹{plan.total_estimated_cost?.toLocaleString() || tripData.budget_amount?.toLocaleString()}</p>
          </div>
          <div className="bg-white/20 rounded-xl p-3 text-center">
            <Star size={20} className="mx-auto mb-1" />
            <p className="text-sm font-medium">{plan.trip_rating || '4.5'}/5</p>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="travel" className="w-full">
        <TabsList className="grid grid-cols-4 gap-2 bg-gray-100 p-1 rounded-2xl h-auto">
          <TabsTrigger value="travel" className="rounded-xl py-3 data-[state=active]:bg-white">
            <span className="flex flex-col items-center gap-1">
              <Bus size={18} />
              <span className="text-xs">Travel</span>
            </span>
          </TabsTrigger>
          <TabsTrigger value="hotels" className="rounded-xl py-3 data-[state=active]:bg-white">
            <span className="flex flex-col items-center gap-1">
              <Hotel size={18} />
              <span className="text-xs">Hotels</span>
            </span>
          </TabsTrigger>
          <TabsTrigger value="itinerary" className="rounded-xl py-3 data-[state=active]:bg-white">
            <span className="flex flex-col items-center gap-1">
              <Calendar size={18} />
              <span className="text-xs">Itinerary</span>
            </span>
          </TabsTrigger>
          <TabsTrigger value="extras" className="rounded-xl py-3 data-[state=active]:bg-white">
            <span className="flex flex-col items-center gap-1">
              <Gift size={18} />
              <span className="text-xs">More</span>
            </span>
          </TabsTrigger>
        </TabsList>

        {/* Travel Options */}
        <TabsContent value="travel" className="mt-4 space-y-4">
          <SectionCard icon={Bus} title="🚌 Travel Options" color="from-blue-500 to-cyan-500">
            <div className="space-y-3">
              {plan.travel_options?.map((option, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.mode === 'flight' ? '✈️' : option.mode === 'train' ? '🚂' : option.mode === 'bus' ? '🚌' : '🚗'}</span>
                    <div>
                      <p className="font-bold">{option.name || option.mode}</p>
                      <p className="text-sm text-gray-500">{option.duration} • {option.distance}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">₹{option.cost?.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">per person</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>

        {/* Hotels */}
        <TabsContent value="hotels" className="mt-4 space-y-4">
          <SectionCard icon={Hotel} title="🏨 Recommended Hotels" color="from-purple-500 to-pink-500">
            <div className="space-y-4">
              {plan.hotels?.map((hotel, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-lg">{hotel.name}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(hotel.stars || 3)].map((_, idx) => (
                            <Star key={idx} size={14} className="text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{hotel.location}</p>
                      </div>
                      <Badge className={`${
                        hotel.category === 'budget' ? 'bg-green-100 text-green-700' :
                        hotel.category === 'mid-range' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {hotel.category}
                      </Badge>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {hotel.amenities?.map((amenity, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1">
                          {amenity === 'WiFi' && <Wifi size={12} />}
                          {amenity === 'Parking' && <Car size={12} />}
                          {amenity === 'Breakfast' && <Coffee size={12} />}
                          {amenity === 'Pool' && <Bath size={12} />}
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t">
                      <div>
                        <p className="text-2xl font-bold text-green-600">₹{hotel.price_per_night?.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">per night</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                          <Star size={14} className="text-yellow-600 fill-yellow-600" />
                          <span className="text-sm font-bold text-yellow-700">{hotel.rating}</span>
                        </div>
                        {hotel.phone && (
                          <a href={`tel:${hotel.phone}`} className="p-2 bg-green-50 rounded-full text-green-600">
                            <Phone size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>

        {/* Itinerary */}
        <TabsContent value="itinerary" className="mt-4 space-y-4">
          <SectionCard icon={Calendar} title="📅 Day-wise Itinerary" color="from-orange-500 to-amber-500">
            <div className="space-y-4">
              {plan.itinerary?.map((day, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-6 pb-4 border-l-2 border-orange-300 last:pb-0"
                >
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {i + 1}
                  </div>
                  <h4 className="font-bold text-lg mb-2">{day.title}</h4>
                  <ul className="space-y-2">
                    {day.activities?.map((activity, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-orange-500 mt-0.5">•</span>
                        <div>
                          <span className="font-medium">{activity.time}</span> - {activity.description}
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>

        {/* Extras */}
        <TabsContent value="extras" className="mt-4 space-y-4">
          {/* Weather */}
          <SectionCard icon={Cloud} title="🌦️ Weather Forecast" color="from-sky-500 to-blue-500">
            <div className="flex items-center gap-4 p-3 bg-sky-50 rounded-xl">
              <span className="text-4xl">{plan.weather?.icon || '☀️'}</span>
              <div>
                <p className="font-bold text-xl">{plan.weather?.temperature || '28°C'}</p>
                <p className="text-sm text-gray-600">{plan.weather?.condition || 'Pleasant weather expected'}</p>
              </div>
            </div>
          </SectionCard>

          {/* Safety Alerts */}
          {plan.safety_alerts && plan.safety_alerts.length > 0 && (
            <SectionCard icon={AlertTriangle} title="🚨 Safety Alerts" color="from-red-500 to-rose-500">
              <div className="space-y-2">
                {plan.safety_alerts.map((alert, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 bg-red-50 rounded-lg">
                    <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{alert}</p>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {/* Food & Clothing */}
          <div className="grid grid-cols-2 gap-4">
            <SectionCard icon={Utensils} title="🍲 Food" color="from-green-500 to-emerald-500">
              <ul className="space-y-2 text-sm">
                {plan.food_suggestions?.map((food, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span>🍽️</span> {food}
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard icon={Shirt} title="👗 Clothing" color="from-pink-500 to-rose-500">
              <ul className="space-y-2 text-sm">
                {plan.clothing_suggestions?.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span>👕</span> {item}
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>

          {/* Rewards */}
          {plan.rewards && (
            <SectionCard icon={Gift} title="🎁 Rewards & Offers" color="from-yellow-500 to-orange-500">
              <div className="space-y-2">
                {plan.rewards.map((reward, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl">
                    <span className="text-2xl">🎉</span>
                    <div>
                      <p className="font-medium">{reward.title}</p>
                      <p className="text-xs text-gray-500">{reward.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}