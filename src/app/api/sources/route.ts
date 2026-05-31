import { DATA_SOURCES, getSourceStats } from "@/lib/data/sources";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    sources: DATA_SOURCES,
    stats: getSourceStats(),
    refreshedAt: new Date().toISOString(),
  });
}
