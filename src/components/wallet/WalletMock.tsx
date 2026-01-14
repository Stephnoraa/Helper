"use client";

import { useState } from "react";

export function WalletMock() {
  const [balance, setBalance] = useState(5000);
  const [escrow, setEscrow] = useState(0);
  const [status, setStatus] = useState("");

  const deposit = (amt: number) => {
    setBalance((b) => b + amt);
    setStatus("Wallet funded (mock).");
  };

  const lock = (amt: number) => {
    if (amt > balance) {
      setStatus("Insufficient balance.");
      return;
    }
    setBalance((b) => b - amt);
    setEscrow((e) => e + amt);
    setStatus("Funds locked in escrow.");
  };

  const release = () => {
    setEscrow((e) => {
      setBalance((b) => b + e);
      return 0;
    });
    setStatus("Escrow released.");
  };

  const overrideRefund = () => {
    setBalance((b) => b + escrow);
    setEscrow(0);
    setStatus("Admin override: refunded.");
  };

  return (
    <div className="card flex flex-col gap-3 text-slate-100">
      <div className="glass p-3 rounded-lg">
        <p className="text-sm">Wallet: ₦{balance}</p>
        <p className="text-sm text-slate-300">Escrow: ₦{escrow}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <button
          onClick={() => deposit(2000)}
          className="rounded-lg bg-sky-500 px-3 py-2 font-semibold text-white"
        >
          Deposit ₦2000
        </button>
        <button
          onClick={() => lock(1500)}
          className="rounded-lg bg-slate-800 px-3 py-2 text-white"
        >
          Lock ₦1500
        </button>
        <button
          onClick={release}
          className="rounded-lg bg-emerald-500 px-3 py-2 font-semibold text-white"
        >
          Release
        </button>
        <button
          onClick={overrideRefund}
          className="rounded-lg bg-amber-500 px-3 py-2 font-semibold text-white"
        >
          Admin override
        </button>
      </div>
      <div className="text-xs text-slate-300">{status}</div>
    </div>
  );
}

