import { runScenario } from "@/lib/scenario-engine";
import type { ScenarioInput, SystemId } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<ScenarioInput>;

  if (!body.triggerSystemId || !body.change?.trim()) {
    return NextResponse.json(
      { error: "triggerSystemId and change are required" },
      { status: 400 }
    );
  }

  const validSystems: SystemId[] = ["macro", "supply", "energy", "political", "tech"];
  if (!validSystems.includes(body.triggerSystemId as SystemId)) {
    return NextResponse.json({ error: "Invalid triggerSystemId" }, { status: 400 });
  }

  const result = runScenario({
    triggerSystemId: body.triggerSystemId as SystemId,
    change: body.change.trim(),
    magnitude: body.magnitude,
  });

  return NextResponse.json({ scenario: result });
}
