"use client";

import { useState } from "react";
import { getMessagingIfSupported } from "@/lib/firebase/client";
import { getToken, onMessage } from "firebase/messaging";

export function RequestPush() {
  const [status, setStatus] = useState("");

  const request = async () => {
    try {
      const messaging = await getMessagingIfSupported();
      if (!messaging) {
        setStatus("Push not supported in this browser.");
        return;
      }
      const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
      const token = await getToken(messaging, { vapidKey });
      setStatus(token ? "Push ready." : "Permission denied.");
      onMessage(messaging, (payload) => {
        console.log("FCM foreground", payload);
      });
    } catch (err: any) {
      console.error(err);
      setStatus(err.message || "Push failed");
    }
  };

  return (
    <div className="card flex flex-col gap-3 text-slate-100">
      <button
        onClick={request}
        className="w-full rounded-lg bg-sky-500 py-3 text-sm font-semibold text-white"
      >
        Enable notifications
      </button>
      <div className="text-xs text-slate-300">{status}</div>
    </div>
  );
}

