"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) return;

    setLoading(true);
    // Simulate OTP send
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    router.push("/role-select");
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.startsWith("234")) {
      return `+234 ${digits.slice(3)}`;
    }
    if (digits.startsWith("0")) {
      return `+234 ${digits.slice(1)}`;
    }
    return digits ? `+234 ${digits}` : "";
  };

  return (
    <main className="flex min-h-screen flex-col px-6 py-12">
      <div className="mx-auto w-full max-w-[420px]">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-sm text-[#6ee7b7] transition-colors hover:text-[#10b981]"
        >
          ← Back to Home
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="mb-3 text-4xl font-bold text-white">
            Welcome to Helper
          </h1>
          <p className="text-lg text-[#6ee7b7]">
            Enter your phone number to get started. We'll send you a
            verification code.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="phone"
              className="mb-3 block text-sm font-semibold text-[#10b981]"
            >
              Nigerian Phone Number
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#6ee7b7]">
                🇳🇬
              </div>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="+234 801 234 5678"
                className="input-green h-16 w-full rounded-2xl border-2 border-[rgba(16,185,129,0.3)] bg-[rgba(6,78,59,0.6)] pl-12 pr-4 text-lg text-white placeholder:text-[#6ee7b7] backdrop-blur-sm transition-all focus:outline-none"
                required
              />
            </div>
            <p className="mt-2 text-xs text-[#6ee7b7]">
              We'll never share your number. Secure and private.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || phone.length < 10}
            className="btn-shiny h-16 rounded-2xl text-lg font-bold text-[#022c22] transition-all disabled:opacity-50 disabled:active:scale-100"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#022c22] border-t-transparent"></span>
                Sending Code...
              </span>
            ) : (
              "Send Verification Code"
            )}
          </button>
        </form>

        {/* Trust Info */}
        <div className="mt-8 rounded-xl bg-[rgba(16,185,129,0.1)] p-4 backdrop-blur-sm">
          <p className="text-center text-xs text-[#6ee7b7]">
            🔐 Your data is protected. We use industry-standard security to
            keep your information safe.
          </p>
        </div>
      </div>
    </main>
  );
}
