import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CalendarGrid } from './components/CalendarGrid';
import { Sidebar } from './components/Sidebar';
import { AddTaskModal } from './components/AddTaskModal';
import MobileApp from './MobileApp';

// Define task completion state type
interface TaskCompletionState {
  [taskId: string]: boolean;
}

export default function App() {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [sidebarMode, setSidebarMode] = useState<'notes' | 'ai'>('ai');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Centralized task completion state
  const [taskCompletions, setTaskCompletions] = useState<TaskCompletionState>({
    '1': false, // Team Meeting
    '2': false, // Review PRs
    '3': true,  // Design Review - completed
    '4': false, // Sprint Planning
    '5': false, // Client Call
    '6': false, // Update Docs
    '7': true,  // Code Refactor - completed
    '8': true,  // Deploy to Prod - completed
    '9': true,  // QA Testing - completed
    '10': false, // Weekly Review
    '11': false, // Project Kickoff
  });

  // Track recently completed tasks for sparkle effect
  const [recentlyCompleted, setRecentlyCompleted] = useState<string | null>(null);

  const toggleTaskCompletion = (taskId: string) => {
    setTaskCompletions(prev => {
      const newState = !prev[taskId];
      // If task is being completed (false -> true), trigger sparkle effect
      if (newState) {
        setRecentlyCompleted(taskId);
        // Remove sparkle after animation
        setTimeout(() => setRecentlyCompleted(null), 1000);
      }
      return { ...prev, [taskId]: newState };
    });
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleSidebarToggle = (mode: 'notes' | 'ai') => {
    if (isSidebarOpen && sidebarMode === mode) {
      // Clicking the active button closes the sidebar
      setIsSidebarOpen(false);
    } else {
      // Clicking inactive button or when sidebar is closed opens/switches mode
      setSidebarMode(mode);
      setIsSidebarOpen(true);
    }
  };

  // Show mobile version on small screens
  if (isMobile) {
    return <MobileApp />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        currentMonth={currentMonth}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        onAddTask={() => setIsAddTaskModalOpen(true)}
        sidebarMode={isSidebarOpen ? sidebarMode : null}
        onSidebarToggle={handleSidebarToggle}
      />
      
      <main className="flex max-w-[1440px] mx-auto">
        <div 
          className="p-8 transition-all" 
          style={{ width: isSidebarOpen ? '75%' : '100%' }}
        >
          <CalendarGrid 
            currentMonth={currentMonth} 
            taskCompletions={taskCompletions}
            onToggleTask={toggleTaskCompletion}
            recentlyCompleted={recentlyCompleted}
          />
        </div>
        
        {isSidebarOpen && (
          <div className="border-l border-gray-200" style={{ width: '25%' }}>
            <Sidebar 
              mode={sidebarMode} 
              onClose={() => setIsSidebarOpen(false)} 
            />
          </div>
        )}
      </main>

      <AddTaskModal 
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
      />
    </div>
  );
}