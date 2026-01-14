"use client";

import { useEffect, useMemo, useState } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { upsertUserProfile } from "@/lib/firebase/firestore";
import { NIGERIA_CALLING_CODE, ROLES, TRUST_LEVELS } from "@/lib/constants";

const ROLE_OPTIONS = [
  { value: ROLES.CLIENT, label: "Client" },
  { value: ROLES.WORKER, label: "Worker" },
];

export function PhoneAuth() {
  const auth = useMemo(() => getFirebaseAuth(), []);
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<string>(ROLES.CLIENT);
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const handler = () => setOffline(!navigator.onLine);
    handler();
    window.addEventListener("online", handler);
    window.addEventListener("offline", handler);
    return () => {
      window.removeEventListener("online", handler);
      window.removeEventListener("offline", handler);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (auth.appVerificationDisabledForTesting) return;
    try {
      if (!(window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
          },
        );
      }
    } catch (err) {
      console.error("recaptcha init failed", err);
    }
  }, [auth]);

  const normalizePhone = (input: string) => {
    const digits = input.replace(/\D/g, "");
    if (digits.startsWith("234")) return `+${digits}`;
    if (digits.startsWith("0")) return `${NIGERIA_CALLING_CODE}${digits.slice(1)}`;
    if (digits.startsWith("234") || digits.startsWith("2340"))
      return `+${digits.replace(/^2340/, "234")}`;
    if (digits.length === 10) return `${NIGERIA_CALLING_CODE}${digits}`;
    return `${NIGERIA_CALLING_CODE}${digits}`;
  };

  async function requestOtp() {
    setLoading(true);
    setStatus("Requesting OTP...");
    try {
      const formatted = normalizePhone(phone);
      if (!formatted.startsWith(NIGERIA_CALLING_CODE)) {
        throw new Error("Nigerian numbers only (+234)");
      }
      const verifier = (window as any).recaptchaVerifier as RecaptchaVerifier;
      const res = await signInWithPhoneNumber(auth, formatted, verifier);
      setConfirmation(res);
      setStatus("OTP sent. Check your SMS.");
    } catch (err: any) {
      console.error(err);
      setStatus(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp() {
    if (!confirmation) return;
    setLoading(true);
    setStatus("Verifying...");
    try {
      const cred = await confirmation.confirm(otp);
      const uid = cred.user.uid;
      await upsertUserProfile(uid, {
        id: uid,
        fullName: "",
        phone: normalizePhone(phone),
        role: role as any,
        city: "Abuja",
        state: "FCT",
        trustLevel: TRUST_LEVELS.UNVERIFIED,
      });
      setStatus("Signed in. Session cached.");
    } catch (err: any) {
      console.error(err);
      setStatus(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card flex flex-col gap-3">
      <div className="glass p-3 text-xs text-slate-200">
        Nigerian numbers only. We cache your session for offline re-entry.
      </div>
      <label className="text-sm text-slate-200">
        Phone number
        <input
          className="mt-1 w-full rounded-lg bg-slate-900 px-3 py-2 text-white outline-none border border-slate-700"
          inputMode="tel"
          placeholder="+234 801 234 5678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <div className="flex gap-2">
        {ROLE_OPTIONS.map((r) => (
          <button
            key={r.value}
            onClick={() => setRole(r.value)}
            className={`flex-1 rounded-lg px-3 py-2 text-sm ${
              role === r.value
                ? "bg-sky-500 text-white"
                : "bg-slate-900 text-slate-200"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
      {!confirmation ? (
        <button
          onClick={requestOtp}
          disabled={loading}
          className="w-full rounded-lg bg-sky-500 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      ) : (
        <>
          <label className="text-sm text-slate-200">
            Enter OTP
            <input
              className="mt-1 w-full rounded-lg bg-slate-900 px-3 py-2 text-white outline-none border border-slate-700"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </label>
          <button
            onClick={verifyOtp}
            disabled={loading}
            className="w-full rounded-lg bg-emerald-500 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify & Sign in"}
          </button>
        </>
      )}
      <div className="text-xs text-slate-300">{status}</div>
      {offline ? (
        <div className="text-xs text-amber-300">
          Offline detected — we will retry when you reconnect.
        </div>
      ) : null}
      <div id="recaptcha-container" />
    </div>
  );
}

