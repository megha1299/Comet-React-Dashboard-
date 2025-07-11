export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  currentXP: number;
  targetXP: number;
  title: string;
  memberSince: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  value: string;
  category: 'discount' | 'voucher' | 'cashback' | 'exclusive';
  claimed: boolean;
  expiresAt: string;
  terms?: string;
}

export interface RewardPoints {
  current: number;
  total: number;
  thisMonth: number;
  lastMonth: number;
  trend: 'up' | 'down' | 'stable';
  nextMilestone: number;
}

export interface DashboardData {
  user: User;
  benefits: Benefit[];
  rewardPoints: RewardPoints;
  isLoading: boolean;
}