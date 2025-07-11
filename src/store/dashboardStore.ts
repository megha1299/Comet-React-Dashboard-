import { create } from 'zustand';
import { DashboardData, Benefit } from '@/types';
import { dashboardApi } from '@/services/api';

/**
 * Dashboard Store Interface
 * 
 * Extends the base DashboardData interface with store-specific methods.
 * Manages all dashboard state and provides actions for data manipulation.
 */
interface DashboardStore extends DashboardData {
  /** Loads all dashboard data from the API */
  loadDashboardData: () => Promise<void>;
  /** Claims a specific benefit by ID */
  claimBenefit: (benefitId: string) => Promise<void>;
  /** Manually sets the loading state */
  setLoading: (loading: boolean) => void;
}

/**
 * Dashboard Store using Zustand
 * 
 * Centralized state management for the entire dashboard.
 * Handles API calls, loading states, and data mutations.
 * 
 * Features:
 * - Async data loading with error handling
 * - Optimistic UI updates for benefit claiming
 * - Loading state management
 * - Type-safe state and actions
 */
export const useDashboardStore = create<DashboardStore>((set, get) => ({
  // Initial state - null values will be populated on load
  user: null as any,
  benefits: [],
  rewardPoints: null as any,
  isLoading: true,

  /**
   * Loads dashboard data from the API
   * 
   * Process:
   * 1. Sets loading state to true
   * 2. Calls the dashboard API
   * 3. Updates store with received data
   * 4. Sets loading state to false
   * 5. Handles errors gracefully
   */
  loadDashboardData: async () => {
    set({ isLoading: true });
    try {
      // Fetch data from mock API (includes simulated delay)
      const data = await dashboardApi.getDashboardData();
      // Update store with all received data
      set({ ...data, isLoading: false });
    } catch (error) {
      // Log error and ensure loading state is cleared
      console.error('Failed to load dashboard data:', error);
      set({ isLoading: false });
    }
  },

  /**
   * Claims a benefit by ID
   * 
   * @param benefitId - The unique identifier of the benefit to claim
   * 
   * Process:
   * 1. Calls the claim API
   * 2. If successful, updates the benefit status in the store
   * 3. Uses optimistic updates for better UX
   * 4. Handles errors gracefully
   */
  claimBenefit: async (benefitId: string) => {
    try {
      // Call the claim API (includes simulated delay and success rate)
      const success = await dashboardApi.claimBenefit(benefitId);
      if (success) {
        // Optimistically update the benefit status in the store
        // Maps through benefits array and updates the claimed status
        const benefits = get().benefits.map((benefit: Benefit) =>
          benefit.id === benefitId ? { ...benefit, claimed: true } : benefit
        );
        // Update store with modified benefits array
        set({ benefits });
      }
    } catch (error) {
      // Log error - UI will handle error display via toast
      console.error('Failed to claim benefit:', error);
    }
  },

  /**
   * Manually sets the loading state
   * 
   * @param loading - Boolean indicating if the app is in loading state
   * 
   * Useful for:
   * - Manual loading state control
   * - Testing loading UI states
   * - Handling specific loading scenarios
   */
  setLoading: (loading: boolean) => set({ isLoading: loading })
}));