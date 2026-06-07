"use client";

import { useEffect, useState } from "react";
import { Upload, Trash2, FileText } from "lucide-react";
import { Button, Card, SectionHeader } from "@/components/ui";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

type RagDoc = {
  id: string;
  filename: string;
  created_at: string;
};

export default function RagUploadPage() {
  const [ragFile, setRagFile] = useState<File | null>(null);
  const [docs, setDocs] = useState<RagDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [asking, setAsking] = useState(false);
  const [sources, setSources] = useState<any[]>([]);
  const [queryId, setQueryId] = useState("");
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    async function loadDocs() {
      try {
        const res = await fetch(`${API_BASE}/api/rag/documents`, {
          credentials: "include",
        });

        const json = await res.json();
        setDocs(json.documents || []);
      } catch (err) {
        console.error("Failed to load docs:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDocs();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ragFile) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", ragFile);

      const res = await fetch(`${API_BASE}/api/rag/upload`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Upload failed");

      const json = await res.json();

      // append new doc
      setDocs((prev) => [json.document, ...prev]);
      setRagFile(null);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/rag/documents/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const text = await res.text();

      console.log("📡 DELETE status:", res.status);
      console.log("📡 DELETE response:", text);

      if (!res.ok) throw new Error(text);

      setDocs((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };
  const handleAskRag = async () => {
    if (!query.trim()) return;

    try {
      setAsking(true);

      setAnswer("");
      setSources([]);
      setQueryId("");
      setIsFallback(false);

      const res = await fetch(`${API_BASE}/api/rag/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          question: query,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Query failed");
      }

      setAnswer(json.answer || "");
      setSources(json.sources || []);
      setQueryId(json.queryId || "");
      setIsFallback(Boolean(json.fallback));
    } catch (err) {
      console.error("RAG query error:", err);

      setAnswer(
        err instanceof Error
          ? err.message
          : "An error occurred while querying documents.",
      );
    } finally {
      setAsking(false);
    }
  };
  return (
    <Card className="m-6">
      <SectionHeader title="RAG Documents" />

      <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-2">
        {/* ---------------- UPLOAD ---------------- */}
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="relative rounded-lg border border-dashed p-8 text-center hover:bg-gray-50">
            <Upload className="mx-auto mb-2 text-gray-500" />

            <input
              type="file"
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={(e) => setRagFile(e.target.files?.[0] || null)}
            />

            <p className="text-sm text-gray-600">
              {ragFile?.name || "Drop or select PDF / TXT / DOC"}
            </p>
          </div>

          <Button
            type="submit"
            disabled={!ragFile || uploading}
            className="bg-black text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            onClick={() => console.log("button clicked")}
          >
            {uploading ? "Uploading..." : "Upload Document"}
          </Button>
        </form>

        {/* ---------------- DOCUMENT LIST ---------------- */}
        <div className="rounded-lg border p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-700">
            Uploaded Documents
          </h3>

          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : docs.length === 0 ? (
            <p className="text-sm text-gray-500">No documents uploaded yet</p>
          ) : (
            <ul className="space-y-2">
              {docs.map((doc) => (
                <li
                  key={doc.id}
                  className="flex items-center justify-between rounded border px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">{doc.filename}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(doc.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ---------------- RAG TEST ---------------- */}
        <div className="mt-6 border-t pt-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-700">Test RAG</h3>

          <div className="flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !asking) {
                  handleAskRag();
                }
              }}
              placeholder="Ask something from your documents..."
              className="w-full rounded border px-3 py-2 text-sm"
            />

            <Button
              onClick={handleAskRag}
              disabled={asking || !query}
              className="bg-blue-600 text-white"
            >
              {asking ? "Thinking..." : "Ask"}
            </Button>
          </div>

          {answer && (
            <div className="mt-4 space-y-3">
              <div className="rounded border bg-gray-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-semibold text-gray-900">Answer</p>

                  {isFallback && (
                    <span className="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                      Fallback Mode
                    </span>
                  )}
                </div>

                <div className="whitespace-pre-wrap text-sm text-gray-700">
                  {answer}
                </div>

                {queryId && (
                  <div className="mt-3 border-t pt-2 text-xs text-gray-500">
                    Query ID: {queryId}
                  </div>
                )}
              </div>

              {sources.length > 0 && (
                <div className="rounded border p-4">
                  <h4 className="mb-3 font-semibold text-gray-900">
                    Retrieved Sources ({sources.length})
                  </h4>

                  <div className="space-y-3">
                    {sources.map((source, index) => (
                      <div
                        key={`${source.documentId}-${index}`}
                        className="rounded bg-gray-50 p-3"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-medium text-blue-600">
                            Source {index + 1}
                          </span>

                          <span className="text-xs text-gray-500">
                            Similarity: {(source.similarity * 100).toFixed(1)}%
                          </span>
                        </div>

                        <p className="line-clamp-5 text-sm text-gray-700">
                          {source.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
