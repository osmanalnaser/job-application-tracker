export type ApplicationStatus = "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED";

export interface JobApplication {
  id: number;
  company: string;
  position: string;
  location: string | null;
  jobUrl: string | null;
  salaryRange: string | null;
  status: ApplicationStatus;
  appliedDate: string;
  reminderDate: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationStats {
  total: number;
  applied: number;
  interview: number;
  offer: number;
  rejected: number;
}

export interface DashboardData {
  stats: ApplicationStats;
  recentApplications: JobApplication[];
  upcomingReminders: JobApplication[];
  todayReminders: JobApplication[];
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface AuthUser {
  name: string;
  email: string;
}