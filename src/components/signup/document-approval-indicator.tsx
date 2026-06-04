import { CheckCircle, Clock, Loader2, XCircle } from "lucide-react";
import { type DocumentApprovalStatus } from "./types";

export function DocumentApprovalIndicator({ status }: { status: DocumentApprovalStatus }) {
  switch (status) {
    case "uploading":
      return (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Loader2 className="size-3 animate-spin" />
          <span>Uploading...</span>
        </div>
      );
    case "approved":
      return (
        <div className="flex items-center gap-2 text-xs text-green-600">
          <CheckCircle className="size-3" />
          <span>Approved</span>
        </div>
      );
    case "rejected":
      return (
        <div className="flex items-center gap-2 text-xs text-red-600">
          <XCircle className="size-3" />
          <span>Rejected</span>
        </div>
      );
    case "pending":
    default:
      return (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="size-3" />
          <span>Pending approval</span>
        </div>
      );
  }
}
