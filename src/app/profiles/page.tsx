import { Section } from "@/components/layout/section";
import { ProfileForm } from "@/components/profiles/ProfileForm";

export default function ProfilesPage() {
  return (
    <main className="flex flex-col gap-4 text-slate-100">
      <Section
        title="Profile"
        description="Keep details simple and clear for low-literacy users."
      >
        <ProfileForm />
      </Section>
    </main>
  );
}

