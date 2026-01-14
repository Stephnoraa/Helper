"use client";

import { useEffect, useState } from "react";
import { createTask, defaultTask } from "@/lib/firebase/firestore";
import { TASK_TYPES, SAFETY_LEVELS, TASK_STATUSES } from "@/lib/constants";
import { Task } from "@/types";

type Props = { clientId?: string };

export function TaskCreate({ clientId }: Props) {
  const [task, setTask] = useState<Task>(
    defaultTask({
      clientId: clientId || "demo-client",
      city: "Abuja",
      state: "FCT",
    }),
  );
  const [status, setStatus] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("taskDraft");
    if (saved) {
      try {
        setTask(JSON.parse(saved));
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("taskDraft", JSON.stringify(task));
  }, [task]);

  const update = (key: keyof Task, value: any) =>
    setTask((p) => ({ ...p, [key]: value }));

  const submit = async () => {
    setStatus("Saving to Firestore...");
    try {
      await createTask({ ...task, status: TASK_STATUSES.POSTED });
      setStatus("Task posted and held in escrow (mock).");
    } catch (err: any) {
      console.error(err);
      setStatus(err.message || "Failed to create task");
    }
  };

  return (
    <div className="card flex flex-col gap-3">
      <label className="text-sm text-slate-200">
        Task title
        <input
          className="mt-1 w-full rounded-lg bg-slate-900 px-3 py-2 text-white outline-none border border-slate-700"
          value={task.title}
          onChange={(e) => update("title", e.target.value)}
        />
      </label>
      <label className="text-sm text-slate-200">
        Description
        <textarea
          className="mt-1 w-full rounded-lg bg-slate-900 px-3 py-2 text-white outline-none border border-slate-700"
          rows={3}
          value={task.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </label>
      <label className="text-sm text-slate-200">
        Location (city/state)
        <div className="flex gap-2 mt-1">
          <input
            className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-white outline-none border border-slate-700"
            value={task.city}
            onChange={(e) => update("city", e.target.value)}
          />
          <input
            className="w-24 rounded-lg bg-slate-900 px-3 py-2 text-white outline-none border border-slate-700"
            value={task.state}
            onChange={(e) => update("state", e.target.value)}
          />
        </div>
      </label>
      <label className="text-sm text-slate-200">
        Budget (₦)
        <input
          type="number"
          className="mt-1 w-full rounded-lg bg-slate-900 px-3 py-2 text-white outline-none border border-slate-700"
          value={task.budget}
          onChange={(e) => update("budget", Number(e.target.value))}
        />
      </label>
      <label className="text-sm text-slate-200">
        Task type
        <select
          className="mt-1 w-full rounded-lg bg-slate-900 px-3 py-2 text-white border border-slate-700"
          value={task.taskType}
          onChange={(e) => update("taskType", e.target.value)}
        >
          {TASK_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="text-sm text-slate-200">
        Urgency
        <select
          className="mt-1 w-full rounded-lg bg-slate-900 px-3 py-2 text-white border border-slate-700"
          value={task.urgency}
          onChange={(e) => update("urgency", e.target.value)}
        >
          <option value="normal">Normal</option>
          <option value="urgent">Urgent</option>
          <option value="same_day">Same day</option>
        </select>
      </label>
      <label className="text-sm text-slate-200">
        Safety level
        <select
          className="mt-1 w-full rounded-lg bg-slate-900 px-3 py-2 text-white border border-slate-700"
          value={task.safetyLevel}
          onChange={(e) => update("safetyLevel", e.target.value)}
        >
          <option value={SAFETY_LEVELS.NORMAL}>Normal</option>
          <option value={SAFETY_LEVELS.SENSITIVE}>Sensitive</option>
        </select>
      </label>
      <button
        onClick={submit}
        className="w-full rounded-lg bg-emerald-500 py-3 text-sm font-semibold text-white"
      >
        Post task
      </button>
      <div className="text-xs text-slate-300">{status}</div>
    </div>
  );
}

