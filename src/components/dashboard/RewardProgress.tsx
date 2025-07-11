import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RewardPoints } from '@/types';
import { TrendingUp, TrendingDown, Minus, Target, Award } from 'lucide-react';

/**
 * RewardProgress Component
 * 
 * Displays comprehensive reward points analytics and progress tracking.
 * Features multiple chart types and trend analysis for user engagement.
 * 
 * Props:
 * @param rewardPoints - Object containing all reward points data and metrics
 * 
 * Features:
 * - Total points display with trend indicators
 * - Progress towards next milestone with pie chart
 * - Monthly comparison with bar chart
 * - Responsive card layout
 * - Interactive charts with tooltips
 */
interface RewardProgressProps {
  rewardPoints: RewardPoints;
}

export function RewardProgress({ rewardPoints }: RewardProgressProps) {
  /**
   * Data structure for pie chart showing milestone progress
   * Splits current points vs remaining points to milestone
   */
  const progressData = [
    { name: 'Earned', value: rewardPoints.current, fill: '#3b82f6' },
    { name: 'Remaining', value: rewardPoints.nextMilestone - rewardPoints.current, fill: '#e5e7eb' }
  ];

  /**
   * Data structure for bar chart comparing monthly performance
   * Shows last month vs current month points earned
   */
  const monthlyData = [
    { month: 'Last Month', points: rewardPoints.lastMonth },
    { month: 'This Month', points: rewardPoints.thisMonth }
  ];

  /**
   * Dynamic icon selection based on trend direction
   * Maps trend strings to appropriate Lucide icons
   */
  const TrendIcon = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Minus
  }[rewardPoints.trend];

  /**
   * Dynamic color selection based on trend direction
   * Green for positive, red for negative, gray for stable
   */
  const trendColor = {
    up: 'text-green-600',
    down: 'text-red-600',
    stable: 'text-gray-600'
  }[rewardPoints.trend];

  /**
   * Calculate completion percentage for milestone progress
   * Used in pie chart and percentage displays
   */
  const completionPercentage = (rewardPoints.current / rewardPoints.nextMilestone) * 100;

  return (
    <>
      {/* Main grid container - 2 columns on medium screens and up */}
      <div className="grid gap-8 md:grid-cols-2">
      {/* 
        Total Points Card
        - Shows current reward points total
        - Displays trend information
        - Premium styling with gradient background
      */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* 
          Card with special styling
          - Primary color border for emphasis
          - Gradient background for premium feel
          - Full height to match adjacent card
        */}
        <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 h-full">
          {/* Card header with icon and title */}
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-3 text-xl">
              {/* Award icon for achievement theme */}
              <Award className="h-6 w-6 text-primary" />
              <span>Total Reward Points</span>
            </CardTitle>
          </CardHeader>
          {/* Card content with points data */}
          <CardContent className="space-y-6">
            {/* 
              Main points display
              - Large, bold typography for emphasis
              - Primary color for brand consistency
              - Formatted with thousands separators
            */}
            <div className="text-4xl font-bold text-primary">
              {rewardPoints.current.toLocaleString()}
            </div>
            
            {/* 
              Trend indicator section
              - Dynamic icon based on trend direction
              - Color-coded text for quick understanding
              - Shows monthly change in points
            */}
            <div className="flex items-center space-x-3 text-sm">
              <TrendIcon className={`h-5 w-5 ${trendColor}`} />
              <span className={trendColor}>
                {/* Dynamic prefix based on trend direction */}
                {rewardPoints.trend === 'up' ? '+' : rewardPoints.trend === 'down' ? '-' : ''}
                {Math.abs(rewardPoints.thisMonth - rewardPoints.lastMonth)} points this month
              </span>
            </div>

            {/* Total lifetime points earned */}
            <div className="text-sm text-muted-foreground">
              Total earned: {rewardPoints.total.toLocaleString()} points
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 
        Next Milestone Progress Card
        - Shows progress towards next reward milestone
        - Features pie chart visualization
        - Displays completion percentage
      */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Standard card styling with full height */}
        <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 h-full">
          {/* Card header with target icon */}
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-3 text-xl">
              {/* Target icon for milestone theme */}
              <Target className="h-6 w-6 text-orange-600" />
              <span>Next Milestone</span>
            </CardTitle>
          </CardHeader>
          {/* Card content with milestone data */}
          <CardContent className="space-y-6">
            {/* Milestone target and completion percentage */}
            <div className="flex items-center justify-between">
              {/* Target milestone points */}
              <span className="text-3xl font-bold">{rewardPoints.nextMilestone.toLocaleString()}</span>
              {/* Completion percentage */}
              <span className="text-sm text-muted-foreground font-medium">
                {Math.round(completionPercentage)}% complete
              </span>
            </div>
            
            {/* 
              Pie chart container
              - Fixed height for consistent layout
              - Centered chart positioning
              - Responsive container for chart scaling
            */}
            <div className="h-40 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                {/* 
                  Pie chart showing progress
                  - Donut style with inner radius
                  - Custom colors for earned vs remaining
                  - Starts at top (90 degrees) for better visual
                */}
                <PieChart>
                  <Pie
                    data={progressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {/* Map data to colored segments */}
                    {progressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Remaining points needed display */}
            <div className="text-center text-sm text-muted-foreground font-medium">
              {(rewardPoints.nextMilestone - rewardPoints.current).toLocaleString()} points to go
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 
        Monthly Comparison Chart
        - Spans full width (2 columns)
        - Bar chart comparing monthly performance
        - Interactive tooltips for detailed data
      */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="md:col-span-2"
      >
        {/* Full-width card for chart */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          {/* Chart header */}
          <CardHeader>
            <CardTitle className="text-2xl">Monthly Progress</CardTitle>
          </CardHeader>
          {/* Chart content */}
          <CardContent>
            {/* 
              Chart container with fixed height
              - Responsive container for proper scaling
              - Adequate height for readability
            */}
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                {/* 
                  Bar chart for monthly comparison
                  - Proper margins for labels
                  - X-axis shows months
                  - Y-axis shows point values
                  - Interactive tooltip on hover
                */}
                <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  {/* X-axis configuration */}
                  <XAxis dataKey="month" />
                  {/* Y-axis configuration */}
                  <YAxis />
                  {/* Interactive tooltip with custom formatting */}
                  <Tooltip formatter={(value) => [`${value} points`, 'Points Earned']} />
                  {/* 
                    Bar configuration
                    - Primary blue color
                    - Rounded top corners for modern look
                  */}
                  <Bar 
                    dataKey="points" 
                    fill="#3b82f6" 
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      </div>
    </>
  );
}