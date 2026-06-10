"use client";

import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  FileText,
  Upload,
  Trash2,
  MessageSquare,
} from "lucide-react";
import { Badge, Button, Card, SectionHeader } from "@/components/ui";

type Doc = {
  id: string;
  filename: string;
  file_type?: string;
  file_size?: string;
  pages?: number;
  status?: "Ready" | "Processing";
  upload_date?: string;
};

const statusTone = {
  Ready: "green",
  Processing: "amber",
} as const;

export default function KnowledgeBasePage() {
  const [items, setItems] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [asking, setAsking] = useState(false);

  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fetchDocs = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/rag/documents`,
        { credentials: "include" }
      );

      const data = await res.json();
      setItems(data.documents || []);
    } catch (err) {
      console.error("Failed to load docs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const uploadFile = async (file: File) => {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/rag/upload`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Upload failed");

      await fetchDocs();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const deleteDoc = async (id: string) => {
    const ok = confirm("Delete this document?");
    if (!ok) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/rag/documents/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      setItems((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  const askRag = async () => {
    if (!query.trim()) return;

    setAnswer("");
    setAsking(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/rag/query`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: query }),
          credentials: "include",
        }
      );

      const data = await res.json();

      setAnswer(data.answer || "No answer found");
    } catch (err) {
      console.error(err);
      setAnswer("Failed to query RAG");
    } finally {
      setAsking(false);
    }
  };

  const ready = items.filter((i) => i.status === "Ready").length;
  const processing = items.filter((i) => i.status === "Processing").length;
  const pages = items.reduce((t, i) => t + (i.pages || 0), 0);

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-4 py-5 text-[#14213d] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#16a34a]">AI Center</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">
              Knowledge base
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748b]">
              Upload PDFs, documents, and FAQs that the assistant can use for
              grounded customer support answers.
            </p>
          </div>

          <Button
            className="gap-2"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={16} />
            {uploading ? "Uploading..." : "Upload knowledge"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="application/pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadFile(file);
            }}
          />
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="p-4">
            <BookOpen className="text-[#16a34a]" size={18} />
            <p className="mt-3 text-sm text-[#64748b]">Ready sources</p>
            <p className="mt-1 text-2xl font-semibold">{ready}</p>{" "}
          </Card>

          <Card className="p-4">
            <FileText className="text-indigo-600" />
            <p className="text-sm text-gray-500 mt-2">Total pages</p>
            <p className="text-2xl font-semibold">{pages}</p>
          </Card>

          <Card className="p-4">
            <Upload className="text-amber-500" />
            <p className="text-sm text-gray-500 mt-2">Processing</p>
            <p className="text-2xl font-semibold">{processing}</p>
          </Card>
        </section>

        <Card>
          <SectionHeader title="Uploaded sources" />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead className="text-xs uppercase text-gray-500">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Size</th>
                  <th className="p-3">Pages</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {items.map((doc) => (
                  <tr key={doc.id} className="border-t">
                    <td className="p-3 font-medium">{doc.filename}</td>
                    <td className="p-3">{doc.file_type || "PDF"}</td>
                    <td className="p-3">{doc.file_size || "-"}</td>
                    <td className="p-3">{doc.pages || 0}</td>

                    <td className="p-3">
                      <Badge tone={statusTone[doc.status || "Processing"]}>
                        {doc.status || "Processing"}
                      </Badge>
                    </td>

                    <td className="p-3">
                      <Button
                        className="text-red-600"
                        onClick={() => deleteDoc(doc.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5">
          <SectionHeader title="Test your RAG assistant" />

          <div className="flex gap-2 mt-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask something from your documents..."
              className="flex-1 border rounded px-3 py-2"
            />

            <Button onClick={askRag} disabled={asking}>
              <MessageSquare size={16} />
              {asking ? "Thinking..." : "Ask"}
            </Button>
          </div>

          {answer && (
            <div className="mt-4 p-3 bg-gray-50 rounded text-sm whitespace-pre-wrap">
              {answer}
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
