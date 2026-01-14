import { Section } from "@/components/layout/section";
import { SafetyPanel } from "@/components/safety/SafetyPanel";

export default function TrustSafetyPage() {
  return (
    <main className="flex flex-col gap-4 text-slate-100">
      <Section
        title="Trust & safety"
        description="Emergency, disputes, and device logging."
      >
        <SafetyPanel />
      </Section>
    </main>
  );
}

