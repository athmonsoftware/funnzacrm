import { Card } from "@/components/ui"

export default function AnalyticsPage() {
  return (
    <section className="grid gap-5 lg:grid-cols-3">
      {["Messages by channel", "Lead conversion", "AI response quality"].map((title, index) => (
        <Card key={title} className="p-5">
          <h2 className="font-semibold">{title}</h2>
          <div className="mt-6 flex h-56 items-end gap-3">
            {[54, 72, 38, 88, 64, 79].map((height, barIndex) => (
              <div
                key={`${title}-${barIndex}`}
                className="flex flex-1 items-end rounded-t-md bg-[#e2e8f0]"
                style={{ height: `${height + index * 3}%` }}
              >
                <div className="h-2/3 w-full rounded-t-md bg-[#16a34a]" />
              </div>
            ))}
          </div>
        </Card>
      ))}
    </section>
  )
}
