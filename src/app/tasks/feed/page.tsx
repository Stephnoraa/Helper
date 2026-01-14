"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const exampleTasks = [
  {
    id: "1",
    title: "Deep Clean 2-Bedroom Apartment",
    location: "Gwarinpa, Abuja",
    pay: 15000,
    category: "Cleaning",
    posted: "2 hours ago",
    urgent: true,
  },
  {
    id: "2",
    title: "Run Errands - Shopping & Delivery",
    location: "Wuse 2, Abuja",
    pay: 5000,
    category: "Errands",
    posted: "5 hours ago",
    urgent: false,
  },
  {
    id: "3",
    title: "Event Setup - Chair Arrangement",
    location: "Maitama, Abuja",
    pay: 12000,
    category: "Event",
    posted: "1 day ago",
    urgent: false,
  },
  {
    id: "4",
    title: "Home Repairs - Fix Leaking Tap",
    location: "Asokoro, Abuja",
    pay: 8000,
    category: "Repairs",
    posted: "3 hours ago",
    urgent: true,
  },
];

export default function TaskFeedPage() {
  const [filter, setFilter] = useState("all");

  return (
    <main className="flex min-h-screen flex-col px-4 py-6">
      <div className="mx-auto w-full max-w-[420px]">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Available Tasks</h1>
            <p className="text-sm text-[#6ee7b7]">
              Find work that matches your skills
            </p>
          </div>
          <Link
            href="/tasks/post"
            className="btn-shiny flex h-12 items-center justify-center rounded-xl px-4 text-sm font-bold text-[#022c22] shadow-lg"
          >
            + Post
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
          {["all", "urgent", "cleaning", "errands"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                filter === tab
                  ? "bg-[#10b981] text-[#022c22]"
                  : "bg-[rgba(6,78,59,0.6)] text-[#6ee7b7]"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="flex flex-col gap-4">
          {exampleTasks.map((task) => (
            <Link
              key={task.id}
              href={`/tasks/${task.id}`}
              className="card-glow rounded-2xl p-5 transition-all active:scale-[0.98]"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white">
                      {task.title}
                    </h2>
                    {task.urgent && (
                      <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
                        Urgent
                      </span>
                    )}
                  </div>
                  <div className="mb-2 flex items-center gap-2 text-sm text-[#6ee7b7]">
                    <span>📍</span>
                    <span>{task.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#6ee7b7]">
                    <span className="rounded-full bg-[rgba(16,185,129,0.2)] px-2 py-1 text-[#10b981]">
                      {task.category}
                    </span>
                    <span>•</span>
                    <span>{task.posted}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-[rgba(16,185,129,0.2)] pt-4">
                <div>
                  <div className="text-xs text-[#a5d6a7]">Pay</div>
                  <div className="text-2xl font-bold text-[#10b981]">
                    ₦{task.pay.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#10b981]">
                  View Details
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-6 text-center">
          <button className="text-sm font-semibold text-[#10b981]">
            Load More Tasks
          </button>
        </div>
      </div>
    </main>
  );
}
