import { 
  Briefcase,
  GraduationCap,
  HeartPulse,
  ShoppingBag,
  Landmark,
  Cog,
} from 'lucide-react';

// ============================================================================
// Types
// ============================================================================

export type Role = 'USER' | 'ORGANIZATION' | null;
export type Step = 'role' | 'details';

export interface OrganizationType {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

// ============================================================================
// Constants
// ============================================================================

export const ORGANIZATION_TYPES: OrganizationType[] = [
  { 
    id: 'TECHNOLOGY', 
    label: 'Technology', 
    icon: Cog,
    description: 'Software, IT services, SaaS'
  },
  { 
    id: 'RETAIL', 
    label: 'Retail & E-commerce', 
    icon: ShoppingBag,
    description: 'Online stores, retail chains'
  },
  { 
    id: 'HEALTHCARE', 
    label: 'Healthcare', 
    icon: HeartPulse,
    description: 'Hospitals, clinics, health services'
  },
  { 
    id: 'FINANCE', 
    label: 'Finance & Banking', 
    icon: Landmark,
    description: 'Banks, insurance, fintech'
  },
  { 
    id: 'EDUCATION', 
    label: 'Education', 
    icon: GraduationCap,
    description: 'Schools, universities, e-learning'
  },
  { 
    id: 'OTHER', 
    label: 'Other', 
    icon: Briefcase,
    description: 'Other industry types'
  },
];

