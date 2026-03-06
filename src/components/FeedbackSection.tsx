'use client';

import { useState } from 'react';

type FeedbackType = 'bug' | 'feature' | 'content' | 'other';

export function FeedbackSection() {
  const [type, setType] = useState<FeedbackType>('feature');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, message: message.trim(), email: email.trim() || undefined }),
      });
      if (!res.ok) throw new Error('Send failed');
      setMessage('');
      setEmail('');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="rounded-xl border border-universe-border bg-universe-card p-6">
      <h2 className="text-lg font-semibold text-white">
        Help us build the right product
      </h2>
      <p className="mt-1 text-sm text-zinc-400">
        Report bugs, suggest features, or tell us what signals and systems
        matter most to you. Your feedback drives the roadmap.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Type
          </label>
          <div className="flex flex-wrap gap-2">
            {(['feature', 'bug', 'content', 'other'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`rounded-lg border px-3 py-2 text-sm capitalize ${
                  type === t
                    ? 'border-universe-accent bg-universe-accent/20 text-white'
                    : 'border-universe-border text-zinc-400 hover:border-zinc-500'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="feedback-message" className="mb-2 block text-sm font-medium text-zinc-300">
            Message
          </label>
          <textarea
            id="feedback-message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What should we improve or add?"
            rows={4}
            className="w-full rounded-lg border border-universe-border bg-universe-dark px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-universe-accent focus:outline-none focus:ring-1 focus:ring-universe-accent"
          />
        </div>
        <div>
          <label htmlFor="feedback-email" className="mb-2 block text-sm font-medium text-zinc-300">
            Email (optional — for follow-up)
          </label>
          <input
            id="feedback-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full max-w-md rounded-lg border border-universe-border bg-universe-dark px-4 py-2 text-sm text-white placeholder-zinc-500 focus:border-universe-accent focus:outline-none focus:ring-1 focus:ring-universe-accent"
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded-lg bg-universe-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending…' : 'Send feedback'}
          </button>
          {status === 'sent' && (
            <span className="text-sm text-emerald-400">Thanks, we got it.</span>
          )}
          {status === 'error' && (
            <span className="text-sm text-rose-400">Something went wrong. Try again.</span>
          )}
        </div>
      </form>
    </div>
  );
}
