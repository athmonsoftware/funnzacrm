import type { ReactNode } from "react";

type ButtonTone = "primary" | "secondary" | "ghost";

export function Button({
  children,
  tone = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  tone?: ButtonTone;
}) {
  const tones: Record<ButtonTone, string> = {
    primary: "bg-funza-primary text-white hover:bg-funza-primary/90",
    secondary: "border border-border bg-card text-foreground hover:bg-muted",
    ghost: "text-foreground hover:bg-muted",
  };

  return (
    <button
      className={`inline-flex h-11 items-center justify-center rounded-md px-4 text-sm font-semibold transition ${tones[tone]} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-md border border-border bg-card text-card-foreground ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function Badge({
  children,
  tone = "green",
}: {
  children: ReactNode;
  tone?: "green" | "blue" | "red" | "gray" | "amber";
}) {
  const tones = {
    green: "bg-funza-primary-light text-funza-primary",
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    red: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    gray: "bg-muted text-muted-foreground",
    amber: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  };

  return (
    <span className={`inline-flex w-fit items-center rounded-md px-2 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function TextInput({
  label,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
}) {
  const input = (
    <input
      className={`h-11 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-funza-primary ${className}`}
      {...props}
    />
  );

  if (!label) return input;

  return (
    <label className="space-y-2 text-sm font-medium">
      <span>{label}</span>
      {input}
    </label>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 rounded-full bg-muted">
      <div className="h-2 rounded-full bg-funza-primary" style={{ width: `${value}%` }} />
    </div>
  );
}
