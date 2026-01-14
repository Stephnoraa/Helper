import { Section } from "@/components/layout/section";
import { TaskCreate } from "@/components/tasks/TaskCreate";
import { TaskDiscovery } from "@/components/tasks/TaskDiscovery";
import { RatingCard } from "@/components/ratings/RatingCard";

export default function TasksPage() {
  return (
    <main className="flex flex-col gap-4 text-slate-100">
      <Section
        title="Create a task (Client)"
        description="Simple flow, few fields, Nigerian wording."
      >
        <TaskCreate />
      </Section>

      <Section
        title="Find tasks (Worker)"
        description="Filters by city, skills, trust; hides sensitive tasks."
      >
        <TaskDiscovery />
      </Section>

      <Section
        title="Rate a worker"
        description="Ratings feed reliability; sensitive tasks prefer trusted workers."
      >
        <RatingCard />
      </Section>
    </main>
  );
}

