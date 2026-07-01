import { notifications } from "@/lib/mock-data";
import { Badge, Card, SectionHeader } from "@/components/ui";


export default function NotificationPanel() {
  return (
    <Card className="absolute right-4 top-14 z-40 w-[calc(100vw-32px)] max-w-sm shadow-xl sm:right-6">
      <SectionHeader title="Notifications" description="CRM activity and integration blockers" />
      <div className="divide-y divide-border">
        {notifications.map((item) => (
          <div key={item.id} className="space-y-2 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">{item.title}</p>
              <Badge tone={item.tone as "green" | "blue" | "red" | "gray" | "amber"}>New</Badge>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">{item.detail}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}