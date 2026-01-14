"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RoleSelectPage() {
  const router = useRouter();

  const handleSelect = (role: "client" | "worker") => {
    if (role === "client") {
      router.push("/tasks/feed");
    } else {
      router.push("/tasks/feed");
    }
  };

  return (
    <main className="flex min-h-screen flex-col px-6 py-12">
      <div className="mx-auto w-full max-w-[420px]">
        {/* Back Button */}
        <Link
          href="/auth"
          className="mb-8 inline-flex items-center text-sm text-[#6ee7b7] transition-colors hover:text-[#10b981]"
        >
          ← Back
        </Link>

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-bold text-white">
            What would you like to do?
          </h1>
          <p className="text-lg text-[#6ee7b7]">
            Choose how you want to use Helper
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-5">
          {/* Client Card */}
          <button
            onClick={() => handleSelect("client")}
            className="card-glow flex flex-col gap-5 rounded-2xl p-7 text-left transition-all active:scale-[0.98] active:border-[#10b981]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] text-3xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                👤
              </div>
              <div className="flex-1">
                <h2 className="mb-1 text-2xl font-bold text-white">
                  I Need Help
                </h2>
                <p className="text-base text-[#6ee7b7]">
                  Post tasks and find trusted helpers
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#10b981]">
              <span>Get started →</span>
            </div>
          </button>

          {/* Worker Card */}
          <button
            onClick={() => handleSelect("worker")}
            className="card-glow flex flex-col gap-5 rounded-2xl p-7 text-left transition-all active:scale-[0.98] active:border-[#10b981]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] text-3xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                🛠️
              </div>
              <div className="flex-1">
                <h2 className="mb-1 text-2xl font-bold text-white">
                  I Want to Work
                </h2>
                <p className="text-base text-[#6ee7b7]">
                  Find tasks and earn money
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#10b981]">
              <span>Browse tasks →</span>
            </div>
          </button>
        </div>

        {/* Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-[#6ee7b7]">
            💡 You can switch between roles anytime in your profile settings
          </p>
        </div>
      </div>
    </main>
  );
}
