"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PostTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [pay, setPay] = useState("");
  const [category, setCategory] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const categories = [
    "Cleaning",
    "Errands",
    "Repairs",
    "Event",
    "Delivery",
    "Other",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !location || !pay || !category) return;

    setLoading(true);
    // Simulate task creation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    router.push("/tasks/feed");
  };

  return (
    <main className="flex min-h-screen flex-col px-6 py-8">
      <div className="mx-auto w-full max-w-[420px]">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/tasks/feed"
            className="mb-4 inline-flex items-center text-sm text-[#6ee7b7] transition-colors hover:text-[#10b981]"
          >
            ← Back to Tasks
          </Link>
          <h1 className="mb-2 text-4xl font-bold text-white">Post a Task</h1>
          <p className="text-lg text-[#6ee7b7]">
            Tell us what you need help with
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Task Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-3 block text-sm font-semibold text-[#10b981]"
            >
              Task Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Deep clean my 3-bedroom apartment"
              className="input-green h-14 w-full rounded-2xl border-2 border-[rgba(16,185,129,0.3)] bg-[rgba(6,78,59,0.6)] px-4 text-base text-white placeholder:text-[#6ee7b7] backdrop-blur-sm focus:outline-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="mb-3 block text-sm font-semibold text-[#10b981]"
            >
              Category *
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-green h-14 w-full rounded-2xl border-2 border-[rgba(0,255,136,0.3)] bg-[rgba(13,36,18,0.6)] px-4 text-base text-white backdrop-blur-sm focus:outline-none"
              required
            >
              <option value="" className="bg-[#064e3b]">
                Select category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#064e3b]">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-3 block text-sm font-semibold text-[#10b981]"
            >
              Description *
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details about the task. What needs to be done? Any special requirements?"
              rows={5}
              className="input-green w-full rounded-2xl border-2 border-[rgba(16,185,129,0.3)] bg-[rgba(6,78,59,0.6)] px-4 py-3 text-base text-white placeholder:text-[#6ee7b7] backdrop-blur-sm focus:outline-none"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="mb-3 block text-sm font-semibold text-[#10b981]"
            >
              Location *
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Gwarinpa, Abuja"
              className="input-green h-14 w-full rounded-2xl border-2 border-[rgba(16,185,129,0.3)] bg-[rgba(6,78,59,0.6)] px-4 text-base text-white placeholder:text-[#6ee7b7] backdrop-blur-sm focus:outline-none"
              required
            />
          </div>

          {/* Pay Amount */}
          <div>
            <label
              htmlFor="pay"
              className="mb-3 block text-sm font-semibold text-[#10b981]"
            >
              How much will you pay? (₦) *
            </label>
            <input
              id="pay"
              type="number"
              value={pay}
              onChange={(e) => setPay(e.target.value)}
              placeholder="5000"
              min="0"
              step="100"
              className="input-green h-14 w-full rounded-2xl border-2 border-[rgba(16,185,129,0.3)] bg-[rgba(6,78,59,0.6)] px-4 text-base text-white placeholder:text-[#6ee7b7] backdrop-blur-sm focus:outline-none"
              required
            />
            <p className="mt-2 text-xs text-[#6ee7b7]">
              💰 Fair pay attracts better helpers
            </p>
          </div>

          {/* Urgent Toggle */}
          <div className="flex items-center justify-between rounded-xl bg-[rgba(16,185,129,0.1)] p-4 backdrop-blur-sm">
            <div>
              <div className="font-semibold text-white">Urgent Task</div>
              <div className="text-xs text-[#6ee7b7]">
                Need this done quickly?
              </div>
            </div>
            <button
              type="button"
              onClick={() => setUrgent(!urgent)}
              className={`h-12 w-20 rounded-full transition-all ${
                urgent
                  ? "bg-[#10b981]"
                  : "bg-[rgba(16,185,129,0.3)]"
              }`}
            >
              <div
                className={`h-10 w-10 rounded-full bg-white shadow-lg transition-transform ${
                  urgent ? "translate-x-9" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={
              loading || !title || !description || !location || !pay || !category
            }
            className="btn-shiny h-16 rounded-2xl text-lg font-bold text-[#022c22] transition-all disabled:opacity-50 disabled:active:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#022c22] border-t-transparent"></span>
                Posting Task...
              </span>
            ) : (
              "Post Task Now"
            )}
          </button>
        </form>

        {/* Info */}
        <div className="mt-6 rounded-xl bg-[rgba(16,185,129,0.1)] p-4 backdrop-blur-sm">
          <p className="text-center text-xs text-[#6ee7b7]">
            ✅ Your payment is secured in escrow until the task is completed
          </p>
        </div>
      </div>
    </main>
  );
}
