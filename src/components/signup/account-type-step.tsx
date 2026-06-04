import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { accountTypes } from "./constants";
import { type AccountType, type SignupFormValues } from "./types";

export function AccountTypeStep({
  accountType,
  setValue,
  errors,
}: {
  accountType: AccountType;
  setValue: any;
  errors: any;
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-base font-semibold">Registering category</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          This determines the profile and verification details needed for your
          workspace.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {accountTypes.map((type) => {
          const TypeIcon = type.icon;
          const selected = accountType === type.value;

          return (
            <button
              key={type.value}
              type="button"
              onClick={() =>
                setValue("accountType", type.value, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              className={cn(
                "flex min-h-24 items-start gap-3 rounded-md border p-4 text-left transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none",
                selected
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-input/20 hover:bg-input/40"
              )}
              aria-pressed={selected}
            >
              <span
                className={cn(
                  "grid size-10 shrink-0 place-items-center rounded-md",
                  selected
                    ? "bg-background/15"
                    : "bg-background ring-1 ring-border"
                )}
              >
                <TypeIcon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{type.label}</span>
                <span
                  className={cn(
                    "mt-1 block text-xs leading-5",
                    selected
                      ? "text-background/75"
                      : "text-muted-foreground"
                  )}
                >
                  {type.detail}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
