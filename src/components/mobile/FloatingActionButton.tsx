import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute left-1/2 -translate-x-1/2 -top-7 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white flex items-center justify-center shadow-[0_6px_20px_rgba(37,99,235,0.4)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.5)] active:shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-all duration-200 active:scale-95 z-50"
      aria-label="Add new task"
    >
      <Plus className="h-7 w-7" strokeWidth={2.5} />
    </button>
  );
}