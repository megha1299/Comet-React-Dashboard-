import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { User } from '@/types';
import { Trophy, Star, Calendar } from 'lucide-react';

/**
 * UserProfile Component
 * 
 * Displays the user's profile information in a premium card design.
 * Features gamification elements like level, XP progress, and achievements.
 * 
 * Props:
 * @param user - User object containing profile data, level, XP, etc.
 * 
 * Design Features:
 * - Gradient background with animated pattern
 * - Avatar with trophy badge for achievements
 * - Animated progress bar for XP tracking
 * - Responsive layout for mobile and desktop
 */
interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  /**
   * Calculate XP progress percentage for the progress bar
   * Used to show visual progress towards next level
   */
  const progressPercentage = (user.currentXP / user.targetXP) * 100;

  return (
    <>
      {/* 
        Main profile card container
        - Animated entrance with Framer Motion
        - Gradient background for premium feel
        - Rounded corners and shadow for depth
        - White text for contrast against dark gradient
      */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 p-8 text-white shadow-2xl"
      >
      {/* 
        Decorative Background Pattern
        - SVG pattern overlay for texture
        - Low opacity to not interfere with content
        - Adds visual interest without being distracting
      */}
      <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50`} />
      
      {/* Content container with higher z-index to appear above pattern */}
      <div className="relative z-10">
        {/* 
          Header section with user info and level
          - Flexbox layout for responsive alignment
          - Space between for proper distribution
        */}
        <div className="flex items-center justify-between mb-8">
          {/* Left side: Avatar and basic info */}
          <div className="flex items-center space-x-6">
            {/* 
              Avatar container with hover animation
              - Relative positioning for trophy badge
              - Hover scale effect for interactivity
            */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              {/* 
                User avatar with styling
                - Large size (20x20) for prominence
                - Border with transparency for glass effect
                - Shadow for depth
              */}
              <Avatar className="h-20 w-20 border-3 border-white/20 shadow-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                {/* Fallback showing user initials if image fails */}
                <AvatarFallback className="bg-white/10 text-white text-lg font-semibold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {/* 
                Achievement trophy badge
                - Positioned absolutely over avatar
                - Yellow color for achievement feel
                - Shadow for depth
              */}
              <div className="absolute -bottom-2 -right-2 rounded-full bg-yellow-400 p-2 shadow-lg">
                <Trophy className="h-4 w-4 text-yellow-800" />
              </div>
            </motion.div>
            
            {/* User name and title section */}
            <div className="space-y-2">
              {/* User's full name with large, bold typography */}
              <h2 className="text-3xl font-bold leading-tight">{user.name}</h2>
              {/* 
                User title/status badge
                - Semi-transparent background
                - Star icon for premium feel
                - Hover effect for interactivity
              */}
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 text-sm px-3 py-1">
                <Star className="mr-2 h-4 w-4" />
                {user.title}
              </Badge>
            </div>
          </div>
          
          {/* Right side: Level and membership info */}
          <div className="text-right space-y-1">
            {/* Current level display with large typography */}
            <div className="text-4xl font-bold">Level {user.level}</div>
            {/* Membership duration with calendar icon */}
            <div className="flex items-center text-sm opacity-80">
              <Calendar className="mr-2 h-4 w-4" />
              Since {new Date(user.memberSince).getFullYear()}
            </div>
          </div>
        </div>

        {/* 
          XP Progress Section
          - Shows progress towards next level
          - Animated progress bar
          - Clear labeling of current vs target XP
        */}
        <div className="space-y-4">
          {/* Progress bar header with current stats */}
          <div className="flex items-center justify-between text-sm">
            {/* Progress label */}
            <span className="opacity-90 font-medium">Progress to Level {user.level + 1}</span>
            {/* Current XP vs target XP */}
            <span className="font-semibold">{user.currentXP} / {user.targetXP} XP</span>
          </div>
          
          {/* 
            Progress bar container
            - Relative positioning for overlay effects
            - Custom styling for premium look
          */}
          <div className="relative">
            {/* Base progress bar component */}
            <Progress 
              value={progressPercentage} 
              className="h-4 bg-white/20"
            />
            {/* 
              Animated gradient overlay
              - Adds premium glow effect
              - Animates width based on progress
              - Delayed animation for better UX
            */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 opacity-20"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          
          {/* Remaining XP needed for next level */}
          <div className="text-sm opacity-75 font-medium">
            {user.targetXP - user.currentXP} XP to next level
          </div>
        </div>
      </div>
      </motion.div>
    </>
  );
}