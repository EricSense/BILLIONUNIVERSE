import { NextRequest, NextResponse } from 'next/server';

export type FeedbackBody = {
  type: string;
  message: string;
  email?: string;
};

// Store in DB / CRM later; for now log and return 200
export async function POST(request: NextRequest) {
  try {
    const body: FeedbackBody = await request.json();
    const { type, message, email } = body;
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    // TODO: persist to database (e.g. Supabase, Airtable, or your CRM)
    console.info('[Feedback]', { type, message: message.slice(0, 200), email });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
