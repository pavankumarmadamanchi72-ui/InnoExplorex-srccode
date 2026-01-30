import React from 'react';
import { motion } from 'framer-motion';
import { Navigation } from 'lucide-react';
import { Label } from '@/components/ui/label';

const travelModes = [
  { id: 'flight', label: 'Flight', emoji: '✈️', description: 'Fastest' },
  { id: 'train', label: 'Train', emoji: '🚂', description: 'Comfortable' },
  { id: 'bus', label: 'Bus', emoji: '🚌', description: 'Budget' },
  { id: 'car', label: 'Car', emoji: '🚗', description: 'Flexible' },
];

export default function TravelModeSelector({ value, onChange }) {
  return (
    <div className="space-y-4">
      <Label className="flex items-center gap-2 text-base">
        <Navigation className="text-indigo-500" size={20} />
        Mode of Travel
      </Label>

      <div className="grid grid-cols-4 gap-3">
        {travelModes.map((mode) => (
          <motion.button
            key={mode.id}
            type="button"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(mode.id)}
            className={`p-4 rounded-2xl border-2 transition-all text-center ${
              value === mode.id
                ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <span className="text-3xl block mb-2">{mode.emoji}</span>
            <p className={`font-bold text-sm ${
              value === mode.id ? 'text-indigo-700' : 'text-gray-700'
            }`}>
              {mode.label}
            </p>
            <p className={`text-xs mt-0.5 ${
              value === mode.id ? 'text-indigo-500' : 'text-gray-400'
            }`}>
              {mode.description}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}