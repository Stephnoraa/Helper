import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { getDb } from "./client";
import { ROLES, TRUST_LEVELS, TASK_STATUSES } from "@/lib/constants";
import type { Task, UserProfile } from "@/types";

const db = getDb();

export async function upsertUserProfile(
  uid: string,
  data: Partial<UserProfile>,
) {
  const ref = doc(db, "users", uid);
  await setDoc(
    ref,
    {
      ...data,
      trustLevel: data.trustLevel ?? TRUST_LEVELS.UNVERIFIED,
      createdAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export async function createTask(input: Task) {
  const ref = collection(db, "tasks");
  return addDoc(ref, {
    ...input,
    createdAt: serverTimestamp(),
  });
}

export function subscribeTasksByWorker(
  city: string,
  skills: string[],
  trustLevel: string,
  onTasks: (tasks: Task[]) => void,
) {
  const q = query(
    collection(db, "tasks"),
    where("city", "==", city),
    where("status", "==", TASK_STATUSES.POSTED),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(q, (snap) => {
    const filtered = snap.docs
      .map((d) => ({ id: d.id, ...(d.data() as Task) }))
      .filter((t) => {
        const skillOk = !skills.length || skills.includes(t.taskType);
        const trustOk =
          t.safetyLevel !== "sensitive" || trustLevel === TRUST_LEVELS.TRUSTED_WORKER;
        return skillOk && trustOk;
      });
    onTasks(filtered);
  });
}

export async function updateTaskStatus(
  taskId: string,
  status: string,
  workerId?: string,
) {
  const ref = doc(db, "tasks", taskId);
  await updateDoc(ref, {
    status,
    workerId: workerId ?? null,
  });
}

export async function recordJobStep(taskId: string, step: string) {
  const ref = doc(db, "tasks", taskId, "timeline", step);
  await setDoc(ref, {
    at: serverTimestamp(),
  });
}

export async function setTrustLevel(uid: string, trustLevel: string) {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, { trustLevel });
}

export function defaultTask(input: Partial<Task>): Task {
  return {
    title: "",
    description: "",
    location: "",
    budget: 0,
    taskType: "errand",
    urgency: "normal",
    safetyLevel: "normal",
    status: TASK_STATUSES.POSTED,
    clientId: "",
    city: "",
    state: "",
    ...input,
  };
}

export const roleLabels = {
  [ROLES.CLIENT]: "Client",
  [ROLES.WORKER]: "Worker",
  [ROLES.ADMIN]: "Admin",
};

