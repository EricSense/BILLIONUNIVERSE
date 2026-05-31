import { filterSignals, getSignalStats } from "@/lib/data/signals";
import type { Severity, SystemId } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const systemId = searchParams.get("system") as SystemId | "all" | null;
  const severity = searchParams.get("severity") as Severity | "all" | null;
  const anomaliesOnly = searchParams.get("anomalies") === "true";
  const query = searchParams.get("q") ?? undefined;

  const signals = filterSignals({
    systemId: systemId ?? "all",
    severity: severity ?? "all",
    anomaliesOnly,
    query,
  });

  return NextResponse.json({
    signals,
    stats: getSignalStats(),
  });
}
