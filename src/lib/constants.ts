export const ROLES = {
  CLIENT: "client",
  WORKER: "worker",
  ADMIN: "admin",
} as const;

export const TRUST_LEVELS = {
  UNVERIFIED: "unverified",
  VERIFIED_ID: "verified_id",
  TRUSTED_WORKER: "trusted_worker",
  RESTRICTED: "restricted",
} as const;

export const TASK_STATUSES = {
  POSTED: "posted",
  ACCEPTED: "accepted",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  DISPUTED: "disputed",
  CLOSED: "closed",
} as const;

export const JOB_STEPS = {
  ACCEPTED: "accepted",
  ARRIVED: "arrived",
  STARTED: "started",
  COMPLETED: "completed",
  CONFIRMED: "confirmed",
} as const;

export const SAFETY_LEVELS = {
  NORMAL: "normal",
  SENSITIVE: "sensitive",
} as const;

export const TASK_TYPES = ["errand", "cleaning", "tech", "home", "delivery"];

export const NIGERIA_CALLING_CODE = "+234";

