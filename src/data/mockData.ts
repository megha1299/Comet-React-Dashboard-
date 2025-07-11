import { User, Benefit, RewardPoints } from '@/types';

/**
 * Mock User Data
 * 
 * Represents a typical CRED user with gamification elements.
 * Includes profile information, level progression, and membership details.
 */
export const mockUser: User = {
  id: '1',
  name: 'Arjun Mehta',
  email: 'arjun.mehta@example.com',
  // Using Pexels stock photo for realistic avatar
  avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  // Gamification elements
  level: 7,
  currentXP: 2840,
  targetXP: 3500,
  // User status and membership info
  title: 'Gold Member',
  memberSince: '2022-03-15'
};

/**
 * Mock Benefits Data
 * 
 * Represents various types of benefits available to CRED users.
 * Includes different categories, values, and expiration dates.
 * Mix of claimed and unclaimed benefits for realistic testing.
 */
export const mockBenefits: Benefit[] = [
  // Dining discount benefit
  {
    id: '1',
    title: '20% Off Premium Dining',
    description: 'Exclusive discount at top restaurants across Mumbai and Delhi',
    icon: 'utensils',
    value: '₹2,500',
    category: 'discount',
    claimed: false,
    expiresAt: '2024-02-28',
    terms: 'Valid only on weekdays. Minimum order ₹1000.'
  },
  // Entertainment voucher
  {
    id: '2',
    title: 'Netflix Premium Voucher',
    description: '3 months free Netflix subscription worth ₹2,397',
    icon: 'tv',
    value: '₹2,397',
    category: 'voucher',
    claimed: false,
    expiresAt: '2024-01-31'
  },
  // Cashback benefit (already claimed)
  {
    id: '3',
    title: '5% Cashback on Fuel',
    description: 'Get cashback on fuel payments across all major petrol pumps',
    icon: 'fuel',
    value: '5%',
    category: 'cashback',
    claimed: true,
    expiresAt: '2024-03-31'
  },
  // Exclusive access benefit
  {
    id: '4',
    title: 'Airport Lounge Access',
    description: 'Complimentary access to premium airport lounges',
    icon: 'plane',
    value: 'Free',
    category: 'exclusive',
    claimed: false,
    expiresAt: '2024-12-31'
  },
  // Food delivery voucher
  {
    id: '5',
    title: 'Swiggy Super Membership',
    description: '6 months of free delivery and exclusive discounts',
    icon: 'bike',
    value: '₹899',
    category: 'voucher',
    claimed: false,
    expiresAt: '2024-02-15'
  },
  // Fashion voucher
  {
    id: '6',
    title: 'Myntra Fashion Voucher',
    description: '₹1000 shopping voucher for fashion and lifestyle',
    icon: 'shopping-bag',
    value: '₹1,000',
    category: 'voucher',
    claimed: false,
    expiresAt: '2024-01-30'
  }
];

/**
 * Mock Reward Points Data
 * 
 * Represents user's reward points status and analytics.
 * Includes current balance, trends, and milestone information.
 */
export const mockRewardPoints: RewardPoints = {
  // Current available points
  current: 15420,
  // Total points earned lifetime
  total: 47890,
  // Monthly point tracking
  thisMonth: 2840,
  lastMonth: 3120,
  // Trend analysis (down because thisMonth < lastMonth)
  trend: 'down',
  // Next milestone target
  nextMilestone: 20000
};