'use client';

import { useEffect, useMemo, useState } from 'react';
import type { FeedbackRow } from '@/types/feedback';

type LoadState = 'idle' | 'loading' | 'loaded' | 'error';

function readStoredToken() {
  if (typeof window === 'undefined') return '';
  return window.localStorage.getItem('BU_ADMIN_TOKEN') || '';
}

function storeToken(token: string) {
  window.localStorage.setItem('BU_ADMIN_TOKEN', token);
}

export function AdminFeedbackClient() {
  const [token, setToken] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [state, setState] = useState<LoadState>('idle');
  const [items, setItems] = useState<FeedbackRow[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setToken(readStoredToken());
  }, []);

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return items;
    return items.filter((i) => i.status === statusFilter);
  }, [items, statusFilter]);

  async function load() {
    if (!token) return;
    setState('loading');
    setErrorMsg(null);
    try {
      const url =
        statusFilter === 'all'
          ? '/api/admin/feedback'
          : `/api/admin/feedback?status=${encodeURIComponent(statusFilter)}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { items: FeedbackRow[] };
      setItems(data.items || []);
      setState('loaded');
    } catch (e) {
      setState('error');
      setErrorMsg(e instanceof Error ? e.message : 'Failed to load');
    }
  }

  async function updateRow(id: string, patch: Partial<Pick<FeedbackRow, 'status' | 'tags'>>) {
    const res = await fetch('/api/admin/feedback', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, ...patch }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  }

  return (
    <div className="rounded-xl border border-universe-border bg-universe-card p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">
            Admin token
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="BU_ADMIN_TOKEN"
              className="w-80 max-w-full rounded-lg border border-universe-border bg-universe-dark px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-universe-accent focus:outline-none focus:ring-1 focus:ring-universe-accent"
            />
            <button
              type="button"
              onClick={() => storeToken(token)}
              className="rounded-lg border border-universe-border bg-universe-dark px-3 py-2 text-sm text-zinc-300 hover:border-zinc-500 hover:text-white"
            >
              Save
            </button>
          </div>
          <p className="text-xs text-zinc-500">
            This is only used to call the protected admin API.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="text-sm text-zinc-500">Status:</label>
          {(['all', 'new', 'triaged', 'planned', 'done', 'ignored'] as const).map(
            (s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`rounded-full px-3 py-1 text-sm ${
                  statusFilter === s
                    ? 'bg-universe-accent text-white'
                    : 'bg-universe-dark text-zinc-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            )
          )}
          <button
            type="button"
            onClick={load}
            disabled={!token || state === 'loading'}
            className="ml-2 rounded-lg bg-universe-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
          >
            {state === 'loading' ? 'Loading…' : 'Load feedback'}
          </button>
        </div>
      </div>

      {state === 'error' && (
        <div className="mt-4 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">
          Failed to load: {errorMsg}
        </div>
      )}

      <div className="mt-6 space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-universe-border bg-universe-dark p-4 text-sm text-zinc-400">
            No feedback yet (or filter returned none).
          </div>
        ) : (
          filtered.map((f) => (
            <div
              key={f.id}
              className="rounded-lg border border-universe-border bg-universe-dark p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-white">
                    {f.type}{' '}
                    <span className="text-xs font-normal text-zinc-500">
                      · {new Date(f.created_at).toLocaleString()}
                    </span>
                  </div>
                  {f.email && (
                    <div className="text-xs text-zinc-500">{f.email}</div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={f.status}
                    onChange={async (e) => {
                      const next = e.target.value;
                      setItems((prev) =>
                        prev.map((x) => (x.id === f.id ? { ...x, status: next } : x))
                      );
                      await updateRow(f.id, { status: next });
                    }}
                    className="rounded-lg border border-universe-border bg-universe-card px-3 py-2 text-sm text-zinc-200 focus:border-universe-accent focus:outline-none"
                  >
                    {(['new', 'triaged', 'planned', 'done', 'ignored'] as const).map(
                      (s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <p className="mt-3 text-sm text-zinc-300 whitespace-pre-wrap">
                {f.message}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs text-zinc-500">Tags:</span>
                <input
                  defaultValue={(f.tags || []).join(', ')}
                  placeholder="comma,separated,tags"
                  onBlur={async (e) => {
                    const nextTags = e.target.value
                      .split(',')
                      .map((t) => t.trim())
                      .filter(Boolean);
                    setItems((prev) =>
                      prev.map((x) => (x.id === f.id ? { ...x, tags: nextTags } : x))
                    );
                    await updateRow(f.id, { tags: nextTags });
                  }}
                  className="w-72 max-w-full rounded-lg border border-universe-border bg-universe-card px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:border-universe-accent focus:outline-none"
                />
                <span className="text-xs text-zinc-600">
                  (updates on blur)
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

