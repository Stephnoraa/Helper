"use client";

import { useState } from "react";

export function SafetyPanel() {
  const [log, setLog] = useState<string[]>([]);

  const logAction = (action: string) => {
    setLog((l) => [`${new Date().toLocaleTimeString()}: ${action}`, ...l]);
  };

  return (
    <div className="card flex flex-col gap-3 text-slate-100">
      <div className="grid grid-cols-2 gap-2 text-sm">
        <button
          onClick={() => logAction("Emergency reported")}
          className="rounded-lg bg-red-500 px-3 py-3 font-semibold text-white"
        >
          Emergency
        </button>
        <button
          onClick={() => logAction("Dispute opened")}
          className="rounded-lg bg-amber-500 px-3 py-3 font-semibold text-white"
        >
          Open dispute
        </button>
        <button
          onClick={() => logAction("Sensitive task hidden")}
          className="rounded-lg bg-slate-800 px-3 py-3 text-white"
        >
          Hide sensitive
        </button>
        <button
          onClick={() => logAction("Device fingerprint captured")}
          className="rounded-lg bg-slate-800 px-3 py-3 text-white"
        >
          Log device/IP
        </button>
      </div>
      <div className="glass p-3 rounded-lg text-xs text-slate-200 space-y-1 max-h-32 overflow-auto">
        {log.length === 0 ? (
          <p>No safety events yet.</p>
        ) : (
          log.map((l) => <p key={l}>{l}</p>)
        )}
      </div>
    </div>
  );
}

