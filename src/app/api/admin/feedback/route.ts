import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import type { FeedbackRow } from '@/types/feedback';

function isAuthorized(request: NextRequest) {
  const token = process.env.BU_ADMIN_TOKEN;
  if (!token) return false;
  const auth = request.headers.get('authorization') || '';
  return auth === `Bearer ${token}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const status = url.searchParams.get('status'); // optional

  const supabase = supabaseAdmin();
  let q = supabase
    .from('feedback')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200);

  if (status) q = q.eq('status', status);

  const { data, error } = await q.returns<FeedbackRow[]>();
  if (error) {
    console.error('[Admin feedback list error]', error);
    return NextResponse.json({ error: 'Failed to load feedback' }, { status: 500 });
  }
  return NextResponse.json({ items: data ?? [] });
}

export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as {
    id: string;
    status?: string;
    tags?: string[];
  };

  if (!body?.id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  const supabase = supabaseAdmin();
  const update: Record<string, unknown> = {};
  if (body.status !== undefined) update.status = body.status;
  if (body.tags !== undefined) update.tags = body.tags;

  const { error } = await supabase.from('feedback').update(update).eq('id', body.id);
  if (error) {
    console.error('[Admin feedback update error]', error);
    return NextResponse.json({ error: 'Failed to update feedback' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

