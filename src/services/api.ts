import { mockUser, mockBenefits, mockRewardPoints } from '@/data/mockData';
import { DashboardData } from '@/types';

/**
 * Utility function to simulate network delay
 * 
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after the specified delay
 * 
 * Used to simulate realistic API response times for better UX testing
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Dashboard API Service
 * 
 * Simulates backend API calls with realistic delays and responses.
 * Provides mock data for development and testing purposes.
 * 
 * Features:
 * - Simulated network delays
 * - Mock success/failure rates
 * - Realistic data structures
 * - Error handling simulation
 */
export const dashboardApi = {
  /**
   * Fetches all dashboard data
   * 
   * @returns Promise<DashboardData> - Complete dashboard data object
   * 
   * Simulates:
   * - Network delay (1.5 seconds)
   * - Data aggregation from multiple sources
   * - Successful API response
   * 
   * In a real app, this would make HTTP requests to:
   * - /api/user/profile
   * - /api/benefits
   * - /api/rewards/points
   */
  async getDashboardData(): Promise<DashboardData> {
    // Simulate realistic API response time
    await delay(1500);
    
    // Return aggregated mock data
    return {
      user: mockUser,
      benefits: mockBenefits,
      rewardPoints: mockRewardPoints,
      isLoading: false
    };
  },

  /**
   * Claims a benefit for the user
   * 
   * @param benefitId - The unique identifier of the benefit to claim
   * @returns Promise<boolean> - Success status of the claim operation
   * 
   * Simulates:
   * - Network delay (800ms)
   * - 90% success rate (realistic failure scenarios)
   * - Backend validation and processing
   * 
   * In a real app, this would:
   * - POST to /api/benefits/{benefitId}/claim
   * - Validate user eligibility
   * - Update benefit status in database
   * - Send confirmation notifications
   */
  async claimBenefit(benefitId: string): Promise<boolean> {
    // Simulate API processing time
    await delay(800);
    
    // Simulate realistic success rate (90% success, 10% failure)
    // This helps test error handling in the UI
    return Math.random() > 0.1;
  }
};