"use client";

import { useState } from "react";
import { upsertUserProfile } from "@/lib/firebase/firestore";
import { TRUST_LEVELS } from "@/lib/constants";
import { UserProfile } from "@/types";

type Props = { uid?: string };

export function ProfileForm({ uid }: Props) {
  const [form, setForm] = useState<Partial<UserProfile>>({
    fullName: "",
    phone: "",
    city: "Abuja",
    state: "FCT",
    role: "worker",
    trustLevel: TRUST_LEVELS.UNVERIFIED,
    skills: [],
  });
  const [skillInput, setSkillInput] = useState("");
  const [status, setStatus] = useState("");

  const update = (key: keyof UserProfile, value: any) =>
    setForm((p) => ({ ...p, [key]: value }));

  const addSkill = () => {
    if (!skillInput.trim()) return;
    setForm((p) => ({ ...p, skills: [...(p.skills || []), skillInput.trim()] }));
    setSkillInput("");
  };

  const save = async () => {
    if (!uid) {
      setStatus("You need to sign in first.");
      return;
    }
    setStatus("Saving...");
    try {
      await upsertUserProfile(uid, {
        ...form,
        id: uid,
      });
      setStatus("Profile saved.");
    } catch (err: any) {
      console.error(err);
      setStatus(err.message || "Failed to save");
    }
  };

  return (
    <div className="card flex flex-col gap-3">
      <label className="text-sm text-slate-200">
        Full name
        <input
          className="mt-1 w-full rounded-lg bg-slate-900 px-3 py-2 text-white outline-none border border-slate-700"
          value={form.fullName || ""}
          onChange={(e) => update("fullName", e.target.value)}
        />
      </label>
      <label className="text-sm text-slate-200">
        Phone (read-only once verified)
        <input
          className="mt-1 w-full rounded-lg bg-slate-800 px-3 py-2 text-white outline-none border border-slate-700"
          value={form.phone || ""}
          onChange={(e) => update("phone", e.target.value)}
        />
      </label>
      <div className="flex gap-2">
        <label className="flex-1 text-sm text-slate-200">
          City
          <input
            className="mt-1 w-full rounded-lg bg-slate-900 px-3 py-2 text-white outline-none border border-slate-700"
            value={form.city || ""}
            onChange={(e) => update("city", e.target.value)}
          />
        </label>
        <label className="flex-1 text-sm text-slate-200">
          State
          <input
            className="mt-1 w-full rounded-lg bg-slate-900 px-3 py-2 text-white outline-none border border-slate-700"
            value={form.state || ""}
            onChange={(e) => update("state", e.target.value)}
          />
        </label>
      </div>
      <label className="text-sm text-slate-200">
        Role
        <select
          className="mt-1 w-full rounded-lg bg-slate-900 px-3 py-2 text-white border border-slate-700"
          value={form.role}
          onChange={(e) => update("role", e.target.value)}
        >
          <option value="client">Client</option>
          <option value="worker">Worker</option>
        </select>
      </label>
      {form.role === "worker" ? (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-white outline-none border border-slate-700"
              placeholder="Add skill (errand, cleaning, tech...)"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
            />
            <button
              onClick={addSkill}
              className="rounded-lg bg-sky-500 px-3 text-sm font-semibold text-white"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(form.skills || []).map((s) => (
              <span
                key={s}
                className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-100"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ) : null}
      <label className="text-sm text-slate-200">
        Trust level
        <select
          className="mt-1 w-full rounded-lg bg-slate-900 px-3 py-2 text-white border border-slate-700"
          value={form.trustLevel}
          onChange={(e) => update("trustLevel", e.target.value)}
        >
          <option value={TRUST_LEVELS.UNVERIFIED}>Unverified</option>
          <option value={TRUST_LEVELS.VERIFIED_ID}>Verified ID</option>
          <option value={TRUST_LEVELS.TRUSTED_WORKER}>Trusted Worker</option>
          <option value={TRUST_LEVELS.RESTRICTED}>Restricted</option>
        </select>
      </label>
      <label className="text-sm text-slate-200">
        Rating
        <input
          type="number"
          className="mt-1 w-full rounded-lg bg-slate-900 px-3 py-2 text-white outline-none border border-slate-700"
          value={form.rating ?? ""}
          onChange={(e) => update("rating", Number(e.target.value))}
        />
      </label>
      <label className="text-sm text-slate-200">
        Jobs completed
        <input
          type="number"
          className="mt-1 w-full rounded-lg bg-slate-900 px-3 py-2 text-white outline-none border border-slate-700"
          value={form.jobsCompleted ?? ""}
          onChange={(e) => update("jobsCompleted", Number(e.target.value))}
        />
      </label>
      <button
        onClick={save}
        className="w-full rounded-lg bg-emerald-500 py-3 text-sm font-semibold text-white"
      >
        Save profile
      </button>
      <div className="text-xs text-slate-300">{status}</div>
    </div>
  );
}

