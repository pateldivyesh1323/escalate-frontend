import { Button } from '@/components/ui/button';
import { User, Building2, ArrowRight, Check } from 'lucide-react';
import type { Role } from './types';

// ============================================================================
// Role Selection Step
// ============================================================================

interface RoleSelectionStepProps {
  selectedRole: Role;
  onRoleSelect: (role: Role) => void;
  onContinue: () => void;
  loading: boolean;
}

export function RoleSelectionStep({ 
  selectedRole, 
  onRoleSelect, 
  onContinue, 
  loading 
}: RoleSelectionStepProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          How will you use EscalateConvo?
        </h1>
        <p className="text-muted-foreground">
          Select your role to personalize your experience
        </p>
      </div>

      {/* Role Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <RoleCard
          title="Test Taker"
          description="Take customer service assessments and improve your skills through AI-powered roleplay scenarios"
          icon={User}
          isSelected={selectedRole === 'USER'}
          onSelect={() => onRoleSelect('USER')}
          disabled={loading}
        />
        <RoleCard
          title="Company Admin"
          description="Create assessments, invite candidates, and evaluate their customer service abilities"
          icon={Building2}
          isSelected={selectedRole === 'ORGANIZATION'}
          onSelect={() => onRoleSelect('ORGANIZATION')}
          disabled={loading}
        />
      </div>

      {/* Continue Button */}
      <div className="pt-4">
        <Button
          onClick={onContinue}
          disabled={!selectedRole || loading}
          className="w-full h-12 text-base font-medium shadow-md hover:shadow-lg transition-all"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// ============================================================================
// Role Card Component
// ============================================================================

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  isSelected: boolean;
  onSelect: () => void;
  disabled: boolean;
}

function RoleCard({ 
  title, 
  description, 
  icon: Icon, 
  isSelected, 
  onSelect, 
  disabled 
}: RoleCardProps) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`
        group relative p-8 rounded-xl border-2 text-left transition-all duration-200
        ${isSelected
          ? 'border-primary bg-primary/5 shadow-lg'
          : 'border-slate-200 hover:border-primary/50 hover:shadow-md'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className={`
          p-4 rounded-full transition-colors
          ${isSelected ? 'bg-primary/10' : 'bg-slate-100 group-hover:bg-primary/5'}
        `}>
          <Icon className={`h-10 w-10 ${isSelected ? 'text-primary' : 'text-slate-600'}`} />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4">
          <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
            <Check className="h-4 w-4 text-primary-foreground" />
          </div>
        </div>
      )}
    </button>
  );
}

