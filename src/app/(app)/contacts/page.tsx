"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button, Card, SectionHeader } from "@/components/ui";
import { getAuthToken } from "@/lib/api-client";

export default function ContactsUploadPage() {
  const [contactsFile, setContactsFile] = useState<File | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactsFile) return;

    const formData = new FormData();
    formData.append("file", contactsFile);

    const token = await getAuthToken();
    if (!token) {
      alert("Your session has expired. Please log in again.");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contacts/upload`,
      {
        headers: {
          // Cross-domain: cookies aren't shared, so send the JWT explicitly.
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: formData,
      },
    );

    if (!res.ok) {
      alert("Upload failed. Please try again.");
      return;
    }

    alert("Uploaded");
  };

  return (
    <Card className="m-6">
      <SectionHeader title="Upload Contacts" />

      <form onSubmit={handleUpload} className="p-5 space-y-4">
        <div className="border-dashed border p-6 text-center relative">
          <Upload className="mx-auto" />
          <input
            type="file"
            className="absolute inset-0 opacity-0"
            onChange={(e) => setContactsFile(e.target.files?.[0] || null)}
          />
          <p>{contactsFile?.name || "Upload CSV/XLS"}</p>
        </div>

        <Button disabled={!contactsFile}>Upload</Button>
      </form>
    </Card>
  );
}
