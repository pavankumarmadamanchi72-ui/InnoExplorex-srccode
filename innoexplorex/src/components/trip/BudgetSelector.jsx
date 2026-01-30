import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, IndianRupee } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const budgetOptions = [
  { 
    id: 'low', 
    label: 'Budget Friendly', 
    emoji: '💰', 
    range: '₹5,000 - ₹15,000',
    color: 'from-green-400 to-emerald-500',
    defaultAmount: 10000
  },
  { 
    id: 'medium', 
    label: 'Comfortable', 
    emoji: '💎', 
    range: '₹15,000 - ₹40,000',
    color: 'from-blue-400 to-cyan-500',
    defaultAmount: 25000
  },
  { 
    id: 'high', 
    label: 'Luxury', 
    emoji: '👑', 
    range: '₹40,000+',
    color: 'from-purple-400 to-pink-500',
    defaultAmount: 60000
  }
];

export default function BudgetSelector({ value, amount, onChange, onAmountChange }) {
  return (
    <div className="space-y-4">
      <Label className="flex items-center gap-2 text-base">
        <Wallet className="text-green-500" size={20} />
        Budget Type
      </Label>
      
      <div className="grid grid-cols-3 gap-3">
        {budgetOptions.map((option) => (
          <motion.button
            key={option.id}
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              onChange(option.id);
              onAmountChange(option.defaultAmount);
            }}
            className={`relative p-4 rounded-2xl border-2 transition-all ${
              value === option.id
                ? 'border-transparent shadow-lg'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            {value === option.id && (
              <motion.div
                layoutId="budgetBg"
                className={`absolute inset-0 bg-gradient-to-br ${option.color} rounded-2xl`}
              />
            )}
            <div className={`relative ${value === option.id ? 'text-white' : 'text-gray-700'}`}>
              <span className="text-3xl block mb-2">{option.emoji}</span>
              <p className="font-bold text-sm">{option.label}</p>
              <p className={`text-xs mt-1 ${value === option.id ? 'text-white/80' : 'text-gray-500'}`}>
                {option.range}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Custom Amount Input */}
      <div className="mt-4">
        <Label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <IndianRupee size={16} />
          Your Estimated Budget
        </Label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
          <Input
            type="number"
            value={amount || ''}
            onChange={(e) => onAmountChange(parseInt(e.target.value) || 0)}
            placeholder="Enter amount"
            className="pl-8 h-14 rounded-xl border-2 text-lg font-semibold"
          />
        </div>
      </div>
    </div>
  );
}