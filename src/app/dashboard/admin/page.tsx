import { Section } from "@/components/layout/section";
import { AdminControls } from "@/components/admin/AdminControls";

export default function AdminDashboardPage() {
  return (
    <main className="flex flex-col gap-4 text-slate-100">
      <Section
        title="Admin controls"
        description="Approve workers, restrict users, override disputes."
      >
        <AdminControls />
      </Section>
    </main>
  );
}

