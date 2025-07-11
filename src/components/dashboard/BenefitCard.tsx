import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Benefit } from '@/types';
import { 
  Utensils, 
  Tv, 
  Fuel, 
  Plane, 
  Bike, 
  ShoppingBag, 
  Check, 
  Clock,
  Gift
} from 'lucide-react';

/**
 * Icon mapping for different benefit types
 * Maps string identifiers to Lucide React icon components
 */
const iconMap = {
  utensils: Utensils,
  tv: Tv,
  fuel: Fuel,
  plane: Plane,
  bike: Bike,
  'shopping-bag': ShoppingBag,
  gift: Gift
};

/**
 * Color schemes for different benefit categories
 * Each category has its own color palette for visual distinction
 */
const categoryColors = {
  discount: 'bg-blue-500/10 text-blue-600 border-blue-200',
  voucher: 'bg-purple-500/10 text-purple-600 border-purple-200',
  cashback: 'bg-green-500/10 text-green-600 border-green-200',
  exclusive: 'bg-orange-500/10 text-orange-600 border-orange-200'
};

/**
 * BenefitCard Component
 * 
 * Displays individual benefit information in a card format.
 * Features interactive hover effects, claim functionality, and status indicators.
 * 
 * Props:
 * @param benefit - Benefit object containing all benefit data
 * @param onClaim - Callback function to handle benefit claiming
 * @param index - Card index for staggered animations
 * 
 * Features:
 * - Hover animations and scaling effects
 * - Category-based color coding
 * - Expiration warnings
 * - Claim status management
 * - Responsive design
 */
interface BenefitCardProps {
  benefit: Benefit;
  onClaim: (id: string) => void;
  index: number;
}

export function BenefitCard({ benefit, onClaim, index }: BenefitCardProps) {
  /**
   * Get the appropriate icon component for this benefit
   * Falls back to Gift icon if specific icon not found
   */
  const IconComponent = iconMap[benefit.icon as keyof typeof iconMap] || Gift;
  
  /**
   * Check if benefit is expiring soon (within 7 days)
   * Used to show warning badges and styling
   */
  const isExpiringSoon = new Date(benefit.expiresAt) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    // Main card container with animations
    // - Staggered entrance animation based on index
    // - Hover effects: scale up and lift (translateY)
    // - Minimum height for consistent card sizes
    // - Flex layout for proper content distribution
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group relative rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 min-h-[280px] flex flex-col"
    >
      {/* 
        Hover gradient overlay
        - Subtle gradient that appears on hover
        - Adds depth and premium feel
        - Positioned absolutely to cover entire card
      */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Content container with higher z-index */}
      <div className="relative z-10 flex flex-col h-full">
        {/* 
          Card header section
          - Icon and category badges
          - Flexbox layout with space between
        */}
        <div className="flex items-start justify-between mb-6">
          {/* 
            Benefit icon container
            - Category-specific background color
            - Rounded corners for modern look
            - Proper padding for icon spacing
          */}
          <div className={`rounded-lg p-3 ${categoryColors[benefit.category]}`}>
            <IconComponent className="h-6 w-6" />
          </div>
          
          {/* Right side badges container */}
          <div className="flex flex-col items-end space-y-2">
            {/* Category badge */}
            <Badge variant="outline" className="capitalize text-xs px-2 py-1">
              {benefit.category}
            </Badge>
            {/* Conditional expiration warning badge */}
            {isExpiringSoon && (
              <Badge variant="destructive" className="text-xs px-2 py-1">
                <Clock className="mr-1 h-3 w-3" />
                Expires Soon
              </Badge>
            )}
          </div>
        </div>

        {/* 
          Card content section
          - Flexible layout to fill available space
          - Proper spacing between elements
        */}
        <div className="space-y-4 flex-1 flex flex-col">
          {/* 
            Benefit description section
            - Takes up available space with flex-1
            - Proper typography hierarchy
          */}
          <div className="flex-1">
            {/* Benefit title with proper typography */}
            <h3 className="font-semibold text-lg leading-tight mb-2">{benefit.title}</h3>
            {/* Benefit description with muted color */}
            <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
          </div>

          {/* 
            Card footer section
            - Value display and expiration date
            - Claim button
          */}
          <div className="space-y-4">
            {/* Value and expiration info row */}
            <div className="flex items-center justify-between">
              {/* Benefit value with prominent styling */}
              <div className="text-2xl font-bold text-primary">{benefit.value}</div>
              {/* Expiration date with smaller, muted text */}
              <div className="text-xs text-muted-foreground text-right">
                Expires {new Date(benefit.expiresAt).toLocaleDateString()}
              </div>
            </div>

            {/* 
              Claim button
              - Full width for better mobile experience
              - Conditional styling based on claim status
              - Disabled state for already claimed benefits
              - Gradient background for unclaimed benefits
            */}
            <Button
              onClick={() => onClaim(benefit.id)}
              disabled={benefit.claimed}
              className={`w-full h-11 font-medium ${
                benefit.claimed
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary'
              }`}
            >
              {/* Conditional button content based on claim status */}
              {benefit.claimed ? (
                <>
                  {/* Claimed state: checkmark icon + text */}
                  <Check className="mr-2 h-4 w-4" />
                  Claimed
                </>
              ) : (
                'Claim Now'
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}