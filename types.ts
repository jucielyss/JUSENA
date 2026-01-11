
export type UserRole = 'candidate' | 'employer';

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyType: 'market' | 'pharmacy' | 'restaurant' | 'shop' | 'bakery';
  salary: string;
  shift: 'morning' | 'afternoon' | 'night' | 'flexible';
  distance: number; // in km
  location: Location;
  description: string;
  requirements: string[];
  createdAt: string;
  status?: 'open' | 'in_process' | 'closed';
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface CandidateProfile {
  name: string;
  email: string;
  photo: string | null;
  videoResume: string | null; // URL ou Base64 do vídeo
  city: string;
  phone: string;
  visibility: 'public' | 'anonymous';
  hasWorkedBefore: boolean;
  lastRole?: string;
  lastCompany?: string;
  yearsOfExperience?: string;
  experiences: ExperienceEntry[];
  resumeFileName?: string;
  resumeUploadDate?: string;
  skills: string[];
  areasOfInterest: string[];
  shiftAvailability: string[]; // 'morning', 'afternoon', 'night', 'full'
  workTypePreference: string[]; // 'presencial', 'remoto', 'hibrido'
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: string;
}

export interface AppNotification {
  id: string;
  type: 'job_alert' | 'application_received' | 'profile_view';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  relatedId?: string;
}
