import { Card, TextInput, Button } from "@/components/ui";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

function ProfileLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#edf1f5] pb-3 last:border-0">
      <span className="text-[#64748b]">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

async function updateProfile(formData: FormData) {
  "use server";

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) throw new Error("Unauthorized");

  const payload = {
    userId: session.user.id,
    full_name: formData.get("full_name"),
    business_name: formData.get("business_name"),
    industry: formData.get("industry"),
    phone: formData.get("phone"),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/profile/${session.user.id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("Update failed:", text);
    throw new Error("Failed to update profile");
  }
}

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return (
      <div className="p-6 text-sm text-red-500">
        You must be logged in to view this page.
      </div>
    );
  }

  // 🔥 FETCH FULL PROFILE HERE
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/profile/${user.id}`,
    { cache: "no-store" },
  );

  const profile = await res.json();

  const initials = profile.full_name?.charAt(0).toUpperCase() ?? "U";

  return (
    <section className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
      {/* LEFT CARD */}
      <Card className="p-5">
        <div className="grid size-16 place-items-center rounded-md bg-[#e8f6ef] text-2xl font-bold text-[#047857]">
          {initials}
        </div>

        <h2 className="mt-4 text-xl font-semibold">{profile.full_name}</h2>
        <p className="mt-1 text-sm text-[#64748b]">{profile.email}</p>

        <div className="mt-4 space-y-3">
          <ProfileLine
            label="Business"
            value={profile.business_name ?? "Not set"}
          />
          <ProfileLine label="Industry" value={profile.industry ?? "Not set"} />
          <ProfileLine label="Phone" value={profile.phone ?? "Not set"} />
        </div>
      </Card>

      {/* RIGHT CARD */}
      <Card className="p-5">
        <h2 className="text-lg font-semibold">Business profile</h2>

        <form action={updateProfile}>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <TextInput
              name="full_name"
              label="Full name"
              defaultValue={profile.full_name ?? ""}
            />

            <TextInput
              name="business_name"
              label="Business name"
              defaultValue={profile.business_name ?? ""}
            />

            <TextInput
              name="industry"
              label="Industry"
              defaultValue={profile.industry ?? ""}
            />

            <TextInput
              name="phone"
              label="Primary phone"
              defaultValue={profile.phone ?? ""}
            />
          </div>

          <Button className="mt-5" type="submit">
            Save profile
          </Button>
        </form>
      </Card>
    </section>
  );
}
