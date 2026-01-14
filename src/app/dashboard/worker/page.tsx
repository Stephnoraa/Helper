import { Section } from "@/components/layout/section";
import { TaskDiscovery } from "@/components/tasks/TaskDiscovery";

export default function WorkerDashboardPage() {
  return (
    <main className="flex flex-col gap-4 text-slate-100">
      <Section
        title="Your pipeline"
        description="Quick actions with big buttons; offline cache ready."
      >
        <TaskDiscovery />
      </Section>
    </main>
  );
}

