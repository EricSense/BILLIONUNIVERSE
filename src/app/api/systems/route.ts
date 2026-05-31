import { SYSTEM_LINKS, SYSTEMS } from "@/lib/data/systems";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    systems: SYSTEMS,
    links: SYSTEM_LINKS,
  });
}
