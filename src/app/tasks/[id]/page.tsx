"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

// Mock task data - in real app, fetch from Firestore
const mockTask = {
  id: "1",
  title: "Deep Clean 2-Bedroom Apartment",
  description:
    "I need someone to thoroughly clean my 2-bedroom apartment in Gwarinpa. This includes:\n\n• Sweeping and mopping all floors\n• Cleaning all bathrooms (toilet, sink, shower)\n• Wiping down all surfaces\n• Cleaning windows\n• Organizing and dusting\n\nAll cleaning supplies will be provided. The apartment is on the 2nd floor. Please bring your own transportation.",
  location: "Gwarinpa, Abuja",
  pay: 15000,
  category: "Cleaning",
  status: "Posted",
  posted: "2 hours ago",
  client: {
    name: "Amina",
    rating: 4.8,
    tasksCompleted: 12,
  },
};

export default function TaskDetailPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    setLoading(true);
    // Simulate task acceptance
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    router.push("/tasks/feed");
  };

  return (
    <main className="flex min-h-screen flex-col px-6 py-8">
      <div className="mx-auto w-full max-w-[420px]">
        {/* Back Button */}
        <Link
          href="/tasks/feed"
          className="mb-6 inline-flex items-center text-sm text-[#6ee7b7] transition-colors hover:text-[#10b981]"
        >
          ← Back to Tasks
        </Link>

        {/* Task Details Card */}
        <div className="card-glow mb-6 rounded-2xl p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-[rgba(16,185,129,0.2)] px-3 py-1 text-xs font-semibold text-[#10b981]">
                {mockTask.category}
              </span>
              <span className="text-xs text-[#a5d6a7]">{mockTask.posted}</span>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-white">
              {mockTask.title}
            </h1>
            <div className="flex items-center gap-2 text-base text-[#a5d6a7]">
              <span>📍</span>
              <span className="font-semibold">{mockTask.location}</span>
            </div>
          </div>

          {/* Pay Amount */}
            <div className="mb-6 rounded-xl bg-[rgba(16,185,129,0.1)] p-4 backdrop-blur-sm">
            <div className="text-sm text-[#a5d6a7]">You'll earn</div>
            <div className="text-4xl font-bold text-[#10b981]">
              ₦{mockTask.pay.toLocaleString()}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="mb-3 text-lg font-semibold text-white">
              Task Details
            </h2>
            <div className="whitespace-pre-line text-base leading-relaxed text-[#6ee7b7]">
              {mockTask.description}
            </div>
          </div>

          {/* Client Info */}
          <div className="mb-6 rounded-xl border border-[rgba(16,185,129,0.2)] bg-[rgba(6,78,59,0.4)] p-4">
            <div className="mb-2 text-sm text-[#6ee7b7]">Posted by</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">
                  {mockTask.client.name}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#6ee7b7]">
                  <span>⭐ {mockTask.client.rating}</span>
                  <span>•</span>
                  <span>{mockTask.client.tasksCompleted} tasks completed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="mb-6">
            <div className="text-sm text-[#6ee7b7]">Status</div>
            <div className="mt-2 inline-block rounded-full bg-[rgba(16,185,129,0.2)] px-4 py-2 text-sm font-semibold text-[#10b981]">
              {mockTask.status}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleAccept}
            disabled={loading || mockTask.status !== "Posted"}
            className="btn-shiny h-16 w-full rounded-2xl text-lg font-bold text-[#022c22] transition-all disabled:opacity-50 disabled:active:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#022c22] border-t-transparent"></span>
                Accepting...
              </span>
            ) : (
              "Accept This Task"
            )}
          </button>
          <button className="h-14 w-full rounded-2xl border-2 border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.1)] text-base font-semibold text-[#10b981] backdrop-blur-sm transition-all active:scale-[0.98]">
            Save for Later
          </button>
        </div>

        {/* Safety Info */}
        <div className="mt-6 rounded-xl bg-[rgba(16,185,129,0.1)] p-4 backdrop-blur-sm">
          <p className="text-center text-xs text-[#6ee7b7]">
            🔒 Payment secured in escrow • ✅ Verified helpers only • 💬 Chat
            available after acceptance
          </p>
        </div>
      </div>
    </main>
  );
}
