export function StatCard({
  label,
  value,
  hint,
  variant = "default",
}: {
  label: string;
  value: string | number;
  hint?: string;
  variant?: "default" | "alert" | "success";
}) {
  const hintColor =
    variant === "alert" ? "text-red-400" : variant === "success" ? "text-emerald-400" : "text-slate-500";

  return (
    <div className="rounded-xl border border-white/10 bg-surface-card p-4">
      <div className="font-display text-2xl text-white">{value}</div>
      <div className="mt-0.5 text-xs text-slate-500">{label}</div>
      {hint && <div className={`mt-1 text-xs ${hintColor}`}>{hint}</div>}
    </div>
  );
}
