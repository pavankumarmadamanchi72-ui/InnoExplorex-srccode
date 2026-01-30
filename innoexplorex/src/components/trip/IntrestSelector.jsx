import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Label } from '@/components/ui/label';

const interests = [
  { id: 'adventure', label: 'Adventure', emoji: '🏕️' },
  { id: 'culture', label: 'Culture', emoji: '🎭' },
  { id: 'nature', label: 'Nature', emoji: '🌿' },
  { id: 'photography', label: 'Photography', emoji: '📸' },
  { id: 'food', label: 'Food', emoji: '🍲' },
  { id: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { id: 'spiritual', label: 'Spiritual', emoji: '🕉️' },
  { id: 'wildlife', label: 'Wildlife', emoji: '🦁' },
  { id: 'beach', label: 'Beach', emoji: '🏖️' },
  { id: 'history', label: 'History', emoji: '🏛️' },
  { id: 'nightlife', label: 'Nightlife', emoji: '🎉' },
  { id: 'wellness', label: 'Wellness', emoji: '🧘' },
];

export default function InterestSelector({ selected, onChange }) {
  const toggleInterest = (interest) => {
    if (selected.includes(interest)) {
      onChange(selected.filter(i => i !== interest));
    } else {
      onChange([...selected, interest]);
    }
  };

  return (
    <div className="space-y-4">
      <Label className="flex items-center gap-2 text-base">
        <Heart className="text-red-500" size={20} />
        Your Interests (Select multiple)
      </Label>

      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => {
          const isSelected = selected.includes(interest.id);
          return (
            <motion.button
              key={interest.id}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleInterest(interest.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all ${
                isSelected
                  ? 'border-pink-500 bg-pink-50 text-pink-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="text-lg">{interest.emoji}</span>
              <span className="font-medium text-sm">{interest.label}</span>
              {isSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-pink-500"
                >
                  ✓
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}