import { Section } from "@/components/layout/section";
import { RequestPush } from "@/components/notifications/RequestPush";

export default function NotificationsPage() {
  return (
    <main className="flex flex-col gap-4 text-slate-100">
      <Section
        title="Notifications"
        description="Push via FCM; offline tasks still cached."
      >
        <RequestPush />
      </Section>
    </main>
  );
}

