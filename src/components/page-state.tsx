import type { ReactNode } from "react";
import { AlertCircle, Inbox, Loader2 } from "lucide-react";
import { Button, Card } from "@/components/ui";
import type { PageStateKind } from "@/types/platform";

export function PageState({
  action,
  description,
  state,
  title,
}: {
  action?: ReactNode;
  description: string;
  state: Exclude<PageStateKind, "ready">;
  title: string;
}) {
  const Icon =
    state === "loading" ? Loader2 : state === "error" ? AlertCircle : Inbox;

  return (
    <Card className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-md bg-[#f1f5f9] text-[#14213d]">
        <Icon className={state === "loading" ? "animate-spin" : ""} size={22} />
      </span>
      <h2 className="mt-4 text-lg font-semibold text-[#14213d]">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-[#64748b]">
        {description}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </Card>
  );
}

export function RetryButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button onClick={onClick} tone="secondary">
      Retry
    </Button>
  );
}

