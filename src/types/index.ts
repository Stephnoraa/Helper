import { TASK_STATUSES, TRUST_LEVELS } from "@/lib/constants";

export type Role = "client" | "worker" | "admin";

export type TrustLevel =
  (typeof TRUST_LEVELS)[keyof typeof TRUST_LEVELS];

export type TaskStatus = (typeof TASK_STATUSES)[keyof typeof TASK_STATUSES];

export type UserProfile = {
  id: string;
  fullName: string;
  phone: string;
  role: Role;
  city: string;
  state: string;
  skills?: string[];
  trustLevel: TrustLevel;
  rating?: number;
  jobsCompleted?: number;
  reliability?: number;
  createdAt?: number;
};

export type Task = {
  id?: string;
  title: string;
  description: string;
  location: string;
  budget: number;
  taskType: string;
  urgency: string;
  safetyLevel: string;
  status: TaskStatus;
  clientId: string;
  workerId?: string;
  city: string;
  state: string;
  createdAt?: number;
};

