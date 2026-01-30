import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Minus, Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const travelerTypes = [
  { id: 'single', label: 'Solo', emoji: '🧑', defaultCount: 1, showCounter: false },
  { id: 'couple', label: 'Couple', emoji: '👫', defaultCount: 2, showCounter: false },
  { id: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦', defaultCount: 4, showCounter: true },
  { id: 'friends', label: 'Friends', emoji: '👥', defaultCount: 4, showCounter: true },
  { id: 'others', label: 'Others', emoji: '🎯', defaultCount: 2, showCounter: true },
];

export default function TravelerSelector({ type, count, onTypeChange, onCountChange }) {
  const selectedType = travelerTypes.find(t => t.id === type);
  const showCounter = selectedType?.showCounter ?? false;

  const handleTypeChange = (newType) => {
    const typeData = travelerTypes.find(t => t.id === newType);
    onTypeChange(newType);
    onCountChange(typeData?.defaultCount || 1);
  };

  return (
    <div className="space-y-4">
      <Label className="flex items-center gap-2 text-base">
        <Users className="text-blue-500" size={20} />
        Who's Traveling?
      </Label>

      <div className="grid grid-cols-5 gap-2">
        {travelerTypes.map((option) => (
          <motion.button
            key={option.id}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTypeChange(option.id)}
            className={`p-3 rounded-xl border-2 transition-all text-center ${
              type === option.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <span className="text-2xl block">{option.emoji}</span>
            <p className={`text-xs font-medium mt-1 ${
              type === option.id ? 'text-blue-700' : 'text-gray-600'
            }`}>
              {option.label}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Counter for groups */}
      <AnimatePresence>
        {showCounter && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl mt-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700">Number of Travelers</p>
                  <p className="text-sm text-gray-500">How many people in total?</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-2"
                    onClick={() => onCountChange(Math.max(1, count - 1))}
                    disabled={count <= 1}
                  >
                    <Minus size={18} />
                  </Button>
                  <span className="text-2xl font-bold w-12 text-center text-blue-600">
                    {count}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-2"
                    onClick={() => onCountChange(Math.min(20, count + 1))}
                    disabled={count >= 20}
                  >
                    <Plus size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}