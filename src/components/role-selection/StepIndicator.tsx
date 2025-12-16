import { Check } from 'lucide-react';

interface StepIndicatorProps {
  stepNumber: number;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
}

export function StepIndicator({ stepNumber, label, isActive, isCompleted }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`
        w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors
        ${isCompleted 
          ? 'bg-primary text-primary-foreground' 
          : isActive 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-slate-100 text-slate-500'
        }
      `}>
        {isCompleted ? <Check className="h-4 w-4" /> : stepNumber}
      </div>
      <span className={`text-sm font-medium ${isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
        {label}
      </span>
    </div>
  );
}

