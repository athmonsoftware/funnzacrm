import { Card, TextInput, Button } from "@/components/ui"

function ProfileLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#edf1f5] pb-3 last:border-0">
      <span className="text-[#64748b]">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <section className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
      <Card className="p-5">
        <div className="grid size-16 place-items-center rounded-md bg-[#e8f6ef] text-2xl font-bold text-[#047857]">
          K
        </div>
        <h2 className="mt-4 text-xl font-semibold">Kelvin</h2>
        <p className="mt-1 text-sm text-[#64748b]">Frontend CRM owner</p>
        <div className="mt-5 space-y-3 text-sm">
          <ProfileLine label="Role" value="Admin designer" />
          <ProfileLine label="Project" value="Funza AI CRM" />
          <ProfileLine label="Status" value="Building frontend" />
        </div>
      </Card>
      <Card className="p-5">
        <h2 className="text-lg font-semibold">Business profile</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {["Business name", "Industry", "Primary phone", "Support email"].map((label) => (
            <TextInput key={label} label={label} />
          ))}
        </div>
        <Button className="mt-5">Save profile</Button>
      </Card>
    </section>
  )
}
