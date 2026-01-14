import { Section } from "@/components/layout/section";
import { WalletMock } from "@/components/wallet/WalletMock";

export default function WalletPage() {
  return (
    <main className="flex flex-col gap-4 text-slate-100">
      <Section
        title="Wallet & escrow (mock)"
        description="Lock funds until job confirmed. Admin can override for disputes."
      >
        <WalletMock />
      </Section>
    </main>
  );
}

