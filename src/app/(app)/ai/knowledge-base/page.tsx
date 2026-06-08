import { BookOpen, FileText, Upload } from "lucide-react"
import { knowledgeBaseItems } from "@/lib/mock-data"
import { Badge, Button, Card, SectionHeader } from "@/components/ui"

const statusTone = {
  Ready: "green",
  Processing: "amber",
} as const

export default function KnowledgeBasePage() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-4 py-5 text-[#14213d] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#16a34a]">AI Center</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">Knowledge base</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748b]">
              Upload PDFs, documents, and FAQs that the assistant can use for grounded customer support answers.
            </p>
          </div>
          <Button className="gap-2">
            <Upload size={16} />
            Upload knowledge
          </Button>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="p-4">
            <BookOpen className="text-[#16a34a]" size={18} />
            <p className="mt-3 text-sm text-[#64748b]">Ready sources</p>
            <p className="mt-1 text-2xl font-semibold">{knowledgeBaseItems.filter((item) => item.status === "Ready").length}</p>
          </Card>
          <Card className="p-4">
            <FileText className="text-[#4f46e5]" size={18} />
            <p className="mt-3 text-sm text-[#64748b]">Total pages</p>
            <p className="mt-1 text-2xl font-semibold">{knowledgeBaseItems.reduce((total, item) => total + item.pages, 0)}</p>
          </Card>
          <Card className="p-4">
            <Upload className="text-[#f59e0b]" size={18} />
            <p className="mt-3 text-sm text-[#64748b]">Processing</p>
            <p className="mt-1 text-2xl font-semibold">{knowledgeBaseItems.filter((item) => item.status === "Processing").length}</p>
          </Card>
        </section>

        <Card>
          <SectionHeader title="Uploaded sources" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="bg-[#f8fafc] text-xs uppercase tracking-[0.12em] text-[#64748b]">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Size</th>
                  <th className="px-5 py-3">Pages</th>
                  <th className="px-5 py-3">Uploaded</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf1f5]">
                {knowledgeBaseItems.map((item) => (
                  <tr key={item.id} className="bg-white">
                    <td className="px-5 py-4 font-semibold">{item.name}</td>
                    <td className="px-5 py-4">{item.type}</td>
                    <td className="px-5 py-4 text-[#64748b]">{item.size}</td>
                    <td className="px-5 py-4">{item.pages}</td>
                    <td className="px-5 py-4 text-[#64748b]">{item.uploadDate}</td>
                    <td className="px-5 py-4">
                      <Badge tone={statusTone[item.status]}>{item.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </main>
  )
}
