import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTaskModal({
  isOpen,
  onClose,
}: AddTaskModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px] p-0 gap-0">
        <DialogTitle className="sr-only">
          Create New Task or Note
        </DialogTitle>
        <DialogDescription className="sr-only">
          Create a new task to add to your calendar or write a
          daily note
        </DialogDescription>

        {/* Modal Header - SINGLE X Close Button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-gray-900">New Task</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close dialog"
          ></button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="task-title">Task Title</Label>
            <Input
              id="task-title"
              placeholder="Enter task title..."
              className="border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="task-date">Due Date</Label>
            <Input
              id="task-date"
              type="date"
              className="border-gray-200"
            />
          </div>

          <div className="space-y-3">
            <Label>Priority</Label>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  className="w-4 h-4 text-red-500 border-gray-300 focus:ring-red-500"
                />
                <span className="text-gray-700">
                  High Priority
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value="low"
                  defaultChecked
                  className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">
                  Low Priority
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer - Cancel and Save buttons */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Save Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}