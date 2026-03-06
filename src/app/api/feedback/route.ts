import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import type { CreateFeedbackBody } from '@/types/feedback';

export async function POST(request: NextRequest) {
  try {
    const body: CreateFeedbackBody = await request.json();
    const { type, message, email } = body;
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    if (!type || typeof type !== 'string') {
      return NextResponse.json({ error: 'Type is required' }, { status: 400 });
    }

    const supabase = supabaseAdmin();
    const { error } = await supabase.from('feedback').insert({
      type,
      message: message.trim(),
      email: email?.trim() || null,
    });

    if (error) {
      console.error('[Feedback insert error]', error);
      return NextResponse.json(
        { error: 'Failed to store feedback' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
