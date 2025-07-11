import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from './UserProfile';
import { UserProfileSkeleton } from './UserProfileSkeleton';
import { BenefitsSection } from './BenefitsSection';
import { BenefitsSkeleton } from './BenefitsSkeleton';
import { RewardProgress } from './RewardProgress';
import { RewardProgressSkeleton } from './RewardProgressSkeleton';
import { ThemeToggle } from './ThemeToggle';
import { useDashboardStore } from '@/store/dashboardStore';
import { useToast } from '@/hooks/use-toast';

/**
 * Main Dashboard Component
 * 
 * This is the root dashboard component that orchestrates all dashboard sections.
 * It handles data loading, state management, and coordinates between different sections.
 * 
 * Features:
 * - Loads dashboard data on component mount
 * - Manages benefit claiming functionality
 * - Provides toast notifications for user feedback
 * - Renders header with theme toggle
 * - Organizes main content sections with proper spacing
 */
export function Dashboard() {
  const { 
    user, 
    benefits, 
    rewardPoints, 
    isLoading, 
    loadDashboardData, 
    claimBenefit 
  } = useDashboardStore();
  
  const { toast } = useToast();

  /**
   * Effect hook to load dashboard data when component mounts
   * Triggers the API call to fetch user data, benefits, and reward points
   */
  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  /**
   * Handles benefit claiming functionality
   * 
   * @param benefitId - The unique identifier of the benefit to claim
   * 
   * Process:
   * 1. Calls the claimBenefit API through the store
   * 2. Shows success toast notification on successful claim
   * 3. Shows error toast notification if claim fails
   */
  const handleClaimBenefit = async (benefitId: string) => {
    try {
      await claimBenefit(benefitId);
      toast({
        title: "Benefit Claimed!",
        description: "Your benefit has been successfully claimed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to claim benefit. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main dashboard container with full height background */}
      {/* 
        Sticky Header Section
        - Stays at top during scroll
        - Contains logo and theme toggle
        - Uses backdrop blur for modern glass effect
        - Border bottom for visual separation
      */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
        {/* Header content container with responsive padding */}
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo section with animated entrance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            {/* Logo icon with gradient background */}
            <div className="rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 p-3">
              <span className="text-xl font-bold text-white">C</span>
            </div>
            {/* Brand name */}
            <span className="text-2xl font-bold">COMET</span>
          </motion.div>
          
          {/* Theme toggle button */}
          <ThemeToggle />
        </div>
      </header>

      {/* 
        Main Content Area
        - Container with max width for better readability
        - Responsive padding for different screen sizes
        - Vertical spacing between sections
      */}
      <main className="container mx-auto px-6 py-10 space-y-12 max-w-7xl">
        {/* 
          User Profile Section
          - Shows user avatar, level, XP progress
          - Displays loading skeleton while data loads
          - Animated entrance when data is ready
        */}
        <section>
          {isLoading ? (
            <UserProfileSkeleton />
          ) : (
            <UserProfile user={user} />
          )}
        </section>

        {/* 
          Reward Progress Section
          - Displays reward points and progress charts
          - Shows monthly trends and milestones
          - Animated section header with staggered entrance
        */}
        <section>
          {/* Section header with animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            {/* Section title */}
            <h2 className="text-3xl font-bold mb-3">Reward Progress</h2>
            {/* Section description */}
            <p className="text-muted-foreground text-lg">Track your points and milestones</p>
          </motion.div>
          
          {/* Conditional rendering based on loading state */}
          {isLoading ? (
            <RewardProgressSkeleton />
          ) : (
            <RewardProgress rewardPoints={rewardPoints} />
          )}
        </section>

        {/* 
          Benefits Section
          - Grid of benefit cards
          - Handles benefit claiming
          - Shows loading skeletons during data fetch
        */}
        <section>
          {isLoading ? (
            <BenefitsSkeleton />
          ) : (
            <BenefitsSection 
              benefits={benefits} 
              onClaimBenefit={handleClaimBenefit}
            />
          )}
        </section>
      </main>
    </div>
  );
}