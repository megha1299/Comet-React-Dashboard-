import { motion } from 'framer-motion';
import { BenefitCard } from './BenefitCard';
import { Benefit } from '@/types';
import { Gift } from 'lucide-react';

/**
 * BenefitsSection Component
 * 
 * Manages and displays all user benefits in a organized layout.
 * Separates available benefits from claimed ones for better UX.
 * 
 * Props:
 * @param benefits - Array of all user benefits
 * @param onClaimBenefit - Callback function to handle benefit claiming
 * 
 * Features:
 * - Separates available vs claimed benefits
 * - Responsive grid layout
 * - Animated section headers
 * - Benefit counting and status display
 */
interface BenefitsSectionProps {
  benefits: Benefit[];
  onClaimBenefit: (id: string) => void;
}

export function BenefitsSection({ benefits, onClaimBenefit }: BenefitsSectionProps) {
  /**
   * Filter benefits into available (unclaimed) and claimed categories
   * This separation improves UX by prioritizing actionable items
   */
  const availableBenefits = benefits.filter(b => !b.claimed);
  const claimedBenefits = benefits.filter(b => b.claimed);

  return (
    <>
      {/* Main section container with vertical spacing */}
      <div className="space-y-8">
      {/* 
        Section header with animation
        - Animated entrance from left
        - Icon and text combination
        - Benefit count for user awareness
      */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-4"
      >
        {/* 
          Section icon with gradient background
          - Gift icon for benefits theme
          - Pink to rose gradient for warmth
        */}
        <div className="rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 p-3">
          <Gift className="h-6 w-6 text-white" />
        </div>
        {/* Section title and description */}
        <div>
          {/* Main section heading */}
          <h2 className="text-3xl font-bold">Available Benefits</h2>
          {/* Dynamic count of available benefits */}
          <p className="text-muted-foreground text-lg">
            {availableBenefits.length} benefits waiting to be claimed
          </p>
        </div>
      </motion.div>

      {/* 
        Available benefits grid
        - Responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop
        - Consistent gap spacing between cards
        - Maps through available benefits only
      */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {availableBenefits.map((benefit, index) => (
          <BenefitCard
            key={benefit.id}
            benefit={benefit}
            onClaim={onClaimBenefit}
            index={index}
          />
        ))}
      </div>

      {/* 
        Claimed benefits section
        - Only renders if there are claimed benefits
        - Separate section for better organization
      */}
      {claimedBenefits.length > 0 && (
        <div className="space-y-6">
          {/* Claimed section header with muted styling */}
          <h3 className="text-2xl font-semibold text-muted-foreground">Recently Claimed</h3>
          {/* Claimed benefits grid with same responsive layout */}
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {claimedBenefits.map((benefit, index) => (
              <BenefitCard
                key={benefit.id}
                benefit={benefit}
                onClaim={onClaimBenefit}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
      </div>
    </>
  );
}