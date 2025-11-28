import { Home, Sparkles, StickyNote } from 'lucide-react';
import { FloatingActionButton } from './FloatingActionButton';
import { NavigationTab } from './NavigationTab';

interface MobileNavigationProps {
  currentScreen: string;
  onNavigate: (screen: 'home' | 'addTask' | 'ai' | 'notes') => void;
}

export function MobileNavigation({ currentScreen, onNavigate }: MobileNavigationProps) {
  return (
    <nav className="relative border-t border-gray-200 bg-white/80 backdrop-blur-lg">
      {/* Floating Action Button */}
      <FloatingActionButton onClick={() => onNavigate('addTask')} />

      {/* Navigation Tabs */}
      <div className="flex items-center justify-around px-2 py-2">
        <NavigationTab
          icon={Home}
          label="Anasayfa"
          isActive={currentScreen === 'home'}
          onClick={() => onNavigate('home')}
        />

        <NavigationTab
          icon={Sparkles}
          label="AI"
          isActive={currentScreen === 'ai'}
          onClick={() => onNavigate('ai')}
        />

        {/* Spacer for FAB */}
        <div className="w-16" />

        <NavigationTab
          icon={StickyNote}
          label="Notlar"
          isActive={currentScreen === 'notes'}
          onClick={() => onNavigate('notes')}
        />
      </div>
    </nav>
  );
}