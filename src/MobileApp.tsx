import { useState } from 'react';
import { MobileHome } from './components/mobile/MobileHome';
import { MobileAddTask } from './components/mobile/MobileAddTask';
import { MobileTaskDetails } from './components/mobile/MobileTaskDetails';
import { MobileNavigation } from './components/mobile/MobileNavigation';
import { MobileAI } from './components/mobile/MobileAI';
import { MobileNotes } from './components/mobile/MobileNotes';

type Screen = 'home' | 'addTask' | 'taskDetails' | 'ai' | 'notes';

export default function MobileApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setCurrentScreen('taskDetails');
  };

  return (
    <div className="h-screen w-screen max-w-[390px] mx-auto bg-white flex flex-col overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {currentScreen === 'home' && (
          <MobileHome
            currentMonth={currentMonth}
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
            onTaskClick={handleTaskClick}
          />
        )}
        
        {currentScreen === 'addTask' && (
          <MobileAddTask onClose={() => setCurrentScreen('home')} />
        )}
        
        {currentScreen === 'taskDetails' && (
          <MobileTaskDetails
            task={selectedTask}
            onClose={() => setCurrentScreen('home')}
          />
        )}

        {currentScreen === 'ai' && (
          <MobileAI onClose={() => setCurrentScreen('home')} />
        )}

        {currentScreen === 'notes' && (
          <MobileNotes onClose={() => setCurrentScreen('home')} />
        )}
      </div>

      {/* Bottom Navigation */}
      <MobileNavigation
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
      />
    </div>
  );
}
