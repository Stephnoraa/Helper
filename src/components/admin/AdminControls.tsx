"use client";

import { useState } from "react";
import { setTrustLevel } from "@/lib/firebase/firestore";
import { TRUST_LEVELS } from "@/lib/constants";

export function AdminControls() {
  const [targetUser, setTargetUser] = useState("");
  const [trust, setTrust] = useState<string>(TRUST_LEVELS.VERIFIED_ID);
  const [status, setStatus] = useState("");

  const update = async () => {
    if (!targetUser) return;
    setStatus("Updating trust level...");
    try {
      await setTrustLevel(targetUser, trust);
      setStatus("Updated.");
    } catch (err: any) {
      console.error(err);
      setStatus(err.message || "Failed");
    }
  };

  return (
    <div className="card flex flex-col gap-3">
      <label className="text-sm text-slate-200">
        User ID
        <input
          className="mt-1 w-full rounded-lg bg-slate-900 px-3 py-2 text-white outline-none border border-slate-700"
          value={targetUser}
          onChange={(e) => setTargetUser(e.target.value)}
        />
      </label>
      <label className="text-sm text-slate-200">
        Trust level
        <select
          className="mt-1 w-full rounded-lg bg-slate-900 px-3 py-2 text-white border border-slate-700"
          value={trust}
          onChange={(e) => setTrust(e.target.value)}
        >
          <option value={TRUST_LEVELS.UNVERIFIED}>Unverified</option>
          <option value={TRUST_LEVELS.VERIFIED_ID}>Verified ID</option>
          <option value={TRUST_LEVELS.TRUSTED_WORKER}>Trusted Worker</option>
          <option value={TRUST_LEVELS.RESTRICTED}>Restricted</option>
        </select>
      </label>
      <button
        onClick={update}
        className="w-full rounded-lg bg-amber-500 py-3 text-sm font-semibold text-white"
      >
        Save
      </button>
      <div className="text-xs text-slate-300">{status}</div>
    </div>
  );
}

