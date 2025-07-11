import { Dashboard } from '@/components/dashboard/Dashboard';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="cred-ui-theme">
      <Dashboard />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;