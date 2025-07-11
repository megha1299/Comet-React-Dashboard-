import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/providers/ThemeProvider';

/**
 * ThemeToggle Component
 * 
 * Provides a dropdown menu for switching between light and dark themes.
 * Features smooth icon transitions and persistent theme storage.
 * 
 * Features:
 * - Animated icon transitions between sun and moon
 * - Dropdown menu with theme options
 * - Persistent theme storage via ThemeProvider
 * - Smooth animations with Framer Motion
 * - Accessible keyboard navigation
 */
export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <>
      {/* Dropdown menu container */}
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative overflow-hidden h-10 w-10">
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >

            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </motion.div>
          {/* Screen reader accessibility */}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      {/* 
        Dropdown content
        - Aligned to right edge of trigger
        - Compact width for theme options
      */}
      <DropdownMenuContent align="end" className="w-32">
        {/* 
          Light theme option
          - Sun icon for visual consistency
          - Cursor pointer for better UX
        */}
        <DropdownMenuItem onClick={() => setTheme('light')} className="cursor-pointer">
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        {/* 
          Dark theme option
          - Moon icon for visual consistency
          - Cursor pointer for better UX
        */}
        <DropdownMenuItem onClick={() => setTheme('dark')} className="cursor-pointer">
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}