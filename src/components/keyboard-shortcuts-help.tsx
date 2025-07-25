import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Keyboard } from 'lucide-react';

interface KeyboardShortcutsHelpProps {
  children?: React.ReactNode;
}

const KeyboardShortcutsHelp = ({ children }: KeyboardShortcutsHelpProps) => {
  const shortcuts = [
    {
      keys: `Ctrl + Alt + N`,
      description: 'Create new task',
    },
    {
      keys: `Ctrl + Alt + A`,
      description: 'Select all tasks',
    },
    {
      keys: `Ctrl + Alt + D`,
      description: 'Duplicate selected task (when one is selected)',
    },
    {
      keys: 'Delete',
      description: 'Delete selected tasks',
    },
    {
      keys: `Ctrl + Alt + F`,
      description: 'Focus search box',
    },
    {
      keys: 'Escape',
      description: 'Clear selections and close dialogs',
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <Keyboard className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Use these keyboard shortcuts to navigate and manage tasks quickly.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {shortcut.description}
              </span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                {shortcut.keys}
              </kbd>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KeyboardShortcutsHelp;
