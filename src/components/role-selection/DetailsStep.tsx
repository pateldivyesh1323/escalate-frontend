import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { ORGANIZATION_TYPES } from './types';

// ============================================================================
// Details Step
// ============================================================================

interface DetailsStepProps {
  selectedRole: 'USER' | 'ORGANIZATION';
  displayName: string;
  setDisplayName: (name: string) => void;
  orgName: string;
  setOrgName: (name: string) => void;
  orgType: string;
  setOrgType: (type: string) => void;
  orgDescription: string;
  setOrgDescription: (description: string) => void;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
  existingName?: string;
}

export function DetailsStep({
  selectedRole,
  displayName,
  setDisplayName,
  orgName,
  setOrgName,
  orgType,
  setOrgType,
  orgDescription,
  setOrgDescription,
  onBack,
  onSubmit,
  loading,
  existingName,
}: DetailsStepProps) {
  const isUser = selectedRole === 'USER';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          {isUser ? 'Complete Your Profile' : 'Organization Details'}
        </h1>
        <p className="text-muted-foreground">
          {isUser 
            ? 'Let us know how to address you'
            : 'Tell us about your organization'
          }
        </p>
      </div>

      {/* Form */}
      <div className="max-w-md mx-auto space-y-6">
        {isUser ? (
          <UserDetailsForm
            displayName={displayName}
            setDisplayName={setDisplayName}
            existingName={existingName}
            loading={loading}
          />
        ) : (
          <OrganizationDetailsForm
            orgName={orgName}
            setOrgName={setOrgName}
            orgType={orgType}
            setOrgType={setOrgType}
            orgDescription={orgDescription}
            setOrgDescription={setOrgDescription}
            loading={loading}
          />
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 max-w-md mx-auto">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={loading}
          className="flex-1 h-12"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={onSubmit}
          disabled={loading}
          className="flex-1 h-12 shadow-md hover:shadow-lg transition-all"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Setting up...
            </>
          ) : (
            <>
              Complete Setup
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// ============================================================================
// User Details Form
// ============================================================================

interface UserDetailsFormProps {
  displayName: string;
  setDisplayName: (name: string) => void;
  existingName?: string;
  loading: boolean;
}

function UserDetailsForm({ 
  displayName, 
  setDisplayName, 
  existingName, 
  loading 
}: UserDetailsFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="displayName" className="text-foreground font-medium">
          Your Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="displayName"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Enter your full name"
          disabled={loading}
          className="h-12"
        />
        {existingName && (
          <p className="text-xs text-muted-foreground">
            Pre-filled from your account. You can update it if needed.
          </p>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Organization Details Form
// ============================================================================

interface OrganizationDetailsFormProps {
  orgName: string;
  setOrgName: (name: string) => void;
  orgType: string;
  setOrgType: (type: string) => void;
  orgDescription: string;
  setOrgDescription: (description: string) => void;
  loading: boolean;
}

function OrganizationDetailsForm({ 
  orgName, 
  setOrgName, 
  orgType, 
  setOrgType, 
  orgDescription,
  setOrgDescription,
  loading 
}: OrganizationDetailsFormProps) {
  return (
    <div className="space-y-6">
      {/* Organization Name */}
      <div className="space-y-2">
        <Label htmlFor="orgName" className="text-foreground font-medium">
          Organization Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="orgName"
          type="text"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          placeholder="e.g., Acme Corporation"
          disabled={loading}
          className="h-12"
        />
      </div>

      {/* Organization Type */}
      <div className="space-y-3">
        <Label className="text-foreground font-medium">
          Industry Type <span className="text-destructive">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {ORGANIZATION_TYPES.map((type) => {
            const Icon = type.icon;
            const isSelected = orgType === type.id;
            
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setOrgType(type.id)}
                disabled={loading}
                className={`
                  p-4 rounded-lg border-2 text-left transition-all duration-200
                  ${isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-slate-200 hover:border-primary/50'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${isSelected ? 'text-primary' : 'text-slate-500'}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                      {type.label}
                    </p>
                  </div>
                  {isSelected && (
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Organization Description */}
      <div className="space-y-2">
        <Label htmlFor="orgDescription" className="text-foreground font-medium">
          Organization Description
        </Label>
        <Textarea
          id="orgDescription"
          value={orgDescription}
          onChange={(e) => setOrgDescription(e.target.value)}
          placeholder="Briefly describe what your organization does, its mission, or the type of candidates you're looking to assess..."
          disabled={loading}
          className="min-h-[120px] resize-none"
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground text-right">
          {orgDescription.length}/500 characters
        </p>
      </div>
    </div>
  );
}
