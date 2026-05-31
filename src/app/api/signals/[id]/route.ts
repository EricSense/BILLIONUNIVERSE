import { getSignal } from "@/lib/data/signals";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const signal = getSignal(id);

  if (!signal) {
    return NextResponse.json({ error: "Signal not found" }, { status: 404 });
  }

  return NextResponse.json({ signal });
}
