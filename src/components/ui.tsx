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
    primary: "bg-[#16a34a] text-white hover:bg-[#12823c]",
    secondary: "border border-[#d8e0e8] bg-white text-[#14213d] hover:bg-[#f8fafc]",
    ghost: "text-[#14213d] hover:bg-[#f1f5f9]",
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
    <section className={`rounded-md border border-[#dfe5ec] bg-white ${className}`}>
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
    <div className="flex flex-col gap-3 border-b border-[#edf1f5] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description ? <p className="mt-1 text-sm text-[#64748b]">{description}</p> : null}
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
    green: "bg-[#e8f6ef] text-[#047857]",
    blue: "bg-[#eaf2ff] text-[#1d4ed8]",
    red: "bg-[#fee2e2] text-[#b91c1c]",
    gray: "bg-[#f1f5f9] text-[#475569]",
    amber: "bg-[#fff7ed] text-[#c2410c]",
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
      className={`h-11 w-full rounded-md border border-[#d8e0e8] bg-white px-3 text-sm outline-none transition placeholder:text-[#94a3b8] focus:border-[#16a34a] ${className}`}
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
    <div className="h-2 rounded-full bg-[#e2e8f0]">
      <div className="h-2 rounded-full bg-[#16a34a]" style={{ width: `${value}%` }} />
    </div>
  );
}
