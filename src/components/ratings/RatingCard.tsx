"use client";

import { useState } from "react";

export function RatingCard() {
  const [score, setScore] = useState(5);
  const [review, setReview] = useState("");
  const [status, setStatus] = useState("");

  const submit = () => {
    setStatus(`Rated worker ${score}/5. This will raise reliability.`);
  };

  return (
    <div className="card flex flex-col gap-3 text-slate-100">
      <label className="text-sm">
        Rate worker
        <input
          type="number"
          min={1}
          max={5}
          className="mt-1 w-full rounded-lg bg-slate-900 px-3 py-2 text-white outline-none border border-slate-700"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
        />
      </label>
      <label className="text-sm">
        Short feedback
        <textarea
          className="mt-1 w-full rounded-lg bg-slate-900 px-3 py-2 text-white outline-none border border-slate-700"
          rows={3}
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </label>
      <button
        onClick={submit}
        className="w-full rounded-lg bg-emerald-500 py-3 text-sm font-semibold text-white"
      >
        Submit rating
      </button>
      <div className="text-xs text-slate-300">{status}</div>
    </div>
  );
}

