"use client";

import { useEffect, useState } from "react";
import {
  subscribeTasksByWorker,
  updateTaskStatus,
  recordJobStep,
} from "@/lib/firebase/firestore";
import {
  TASK_STATUSES,
  TRUST_LEVELS,
  SAFETY_LEVELS,
  JOB_STEPS,
} from "@/lib/constants";
import { Task } from "@/types";

type Props = {
  workerId?: string;
  city?: string;
  skills?: string[];
  trustLevel?: string;
};

export function TaskDiscovery({
  workerId = "demo-worker",
  city = "Abuja",
  skills = ["errand"],
  trustLevel = TRUST_LEVELS.UNVERIFIED,
}: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const unsub = subscribeTasksByWorker(city, skills, trustLevel, setTasks);
    return () => unsub();
  }, [city, skills, trustLevel]);

  const accept = async (taskId: string) => {
    setStatus("Accepting...");
    try {
      await updateTaskStatus(taskId, TASK_STATUSES.ACCEPTED, workerId);
      await recordJobStep(taskId, JOB_STEPS.ACCEPTED);
      setStatus("Accepted.");
    } catch (err: any) {
      console.error(err);
      setStatus(err.message || "Failed to accept");
    }
  };

  const markStep = async (taskId: string, step: string, nextStatus?: string) => {
    setStatus("Updating...");
    try {
      await recordJobStep(taskId, step);
      if (nextStatus) {
        await updateTaskStatus(taskId, nextStatus, workerId);
      }
      setStatus("Updated.");
    } catch (err: any) {
      console.error(err);
      setStatus(err.message || "Failed");
    }
  };

  const visibleTasks = tasks.filter((t) => {
    if (t.safetyLevel === SAFETY_LEVELS.SENSITIVE) {
      return trustLevel === TRUST_LEVELS.TRUSTED_WORKER;
    }
    return true;
  });

  return (
    <div className="card flex flex-col gap-3">
      {visibleTasks.length === 0 ? (
        <p className="text-sm text-slate-300">No tasks yet. Stay online.</p>
      ) : (
        visibleTasks.map((t) => (
          <div key={t.id} className="glass p-3 rounded-xl space-y-2">
            <div className="flex justify-between text-sm text-white">
              <span className="font-semibold">{t.title}</span>
              <span className="text-sky-300">₦{t.budget}</span>
            </div>
            <p className="text-xs text-slate-300">{t.description}</p>
            <p className="text-xs text-slate-400">
              {t.taskType} • {t.city}, {t.state} • {t.urgency}
            </p>
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => accept(t.id!)}
                className="flex-1 rounded-lg bg-emerald-500 px-3 py-2 font-semibold text-white"
              >
                Accept
              </button>
              <button className="flex-1 rounded-lg bg-slate-800 px-3 py-2 text-white">
                Decline
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => markStep(t.id!, JOB_STEPS.ARRIVED)}
                className="rounded-lg bg-slate-800 px-3 py-2 text-white"
              >
                Arrived
              </button>
              <button
                onClick={() =>
                  markStep(t.id!, JOB_STEPS.STARTED, TASK_STATUSES.IN_PROGRESS)
                }
                className="rounded-lg bg-slate-800 px-3 py-2 text-white"
              >
                Start
              </button>
              <button
                onClick={() =>
                  markStep(t.id!, JOB_STEPS.COMPLETED, TASK_STATUSES.COMPLETED)
                }
                className="rounded-lg bg-slate-800 px-3 py-2 text-white"
              >
                Complete
              </button>
              <button
                onClick={() =>
                  markStep(t.id!, JOB_STEPS.CONFIRMED, TASK_STATUSES.CLOSED)
                }
                className="rounded-lg bg-slate-800 px-3 py-2 text-white"
              >
                Client confirm
              </button>
            </div>
          </div>
        ))
      )}
      <div className="text-xs text-slate-300">{status}</div>
    </div>
  );
}

