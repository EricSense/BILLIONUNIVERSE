import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-universe-dark">
      <header className="sticky top-0 z-10 border-b border-universe-border bg-universe-dark/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="text-base font-semibold text-white">
            Billion Universe
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-universe-accent"
            >
              Signals
            </Link>
            <Link
              href="/dashboard#feedback"
              className="text-sm text-zinc-400 hover:text-white"
            >
              Feedback
            </Link>
            <span className="text-xs text-zinc-500">Early access</span>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}
