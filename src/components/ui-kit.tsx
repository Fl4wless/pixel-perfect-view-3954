import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "soft" | "ghost" | "outline";
}) {
  return (
    <button
      {...props}
      className={cn(
        "tap inline-flex items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-medium transition-all duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-45",
        variant === "primary" &&
          "bg-primary text-primary-foreground shadow-soft hover:brightness-110",
        variant === "soft" && "bg-primary-soft text-secondary-foreground hover:brightness-[0.98]",
        variant === "outline" && "border border-border bg-card text-foreground hover:bg-secondary",
        variant === "ghost" && "text-muted-foreground hover:bg-secondary",
        className,
      )}
    />
  );
}

export function Field({
  label,
  hint,
  error,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string | undefined; error?: string | undefined }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-muted-foreground">{label}</span>
      <input
        {...props}
        aria-invalid={!!error}
        className={cn(
          "tap w-full rounded-2xl border bg-card px-4 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/10",
          error ? "border-destructive" : "border-border",
          className,
        )}
      />
      {error ? (
        <span className="mt-1.5 block text-sm text-destructive">{error}</span>
      ) : hint ? (
        <span className="mt-1.5 block text-sm text-muted-foreground">{hint}</span>
      ) : null}
    </label>
  );
}

export function Tag({
  active,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean | undefined }) {
  return (
    <button
      {...props}
      aria-pressed={active}
      className={cn(
        "tap flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.97]",
        active
          ? "border-primary bg-primary-soft text-secondary-foreground shadow-soft"
          : "border-border bg-card text-muted-foreground hover:border-primary/40",
      )}
    >
      {active && <span aria-hidden>✓</span>}
      {children}
    </button>
  );
}

export function Card({ className, children }: { className?: string | undefined; children: ReactNode }) {
  return <div className={cn("surface p-5", className)}>{children}</div>;
}

export function Screen({
  title,
  subtitle,
  children,
  action,
}: {
  title: string;
  subtitle?: string | undefined;
  children: ReactNode;
  action?: ReactNode | undefined;
}) {
  return (
    <div className="mx-auto w-full max-w-md px-5 pb-8">
      <header className="safe-top flex items-end justify-between gap-3 pb-5">
        <div>
          <h1 className="text-[1.75rem] leading-tight">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </header>
      {children}
    </div>
  );
}

export function EmptyState({
  symbol,
  title,
  text,
  children,
}: {
  symbol: string;
  title: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <div className="surface flex flex-col items-center px-6 py-12 text-center">
      <span className="mb-3 text-3xl" aria-hidden>
        {symbol}
      </span>
      <h2 className="text-xl">{title}</h2>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground">{text}</p>
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}

export function Skeleton({ className }: { className?: string | undefined }) {
  return <div className={cn("animate-pulse rounded-2xl bg-secondary", className)} />;
}
