import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
      <header className="relative border-b border-universe-border/50 bg-universe-dark/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <span className="text-lg font-semibold tracking-tight text-white">
            Billion Universe
          </span>
          <nav className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg bg-universe-accent px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              Get early access
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 py-24 text-center sm:py-32">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Multi-system intelligence
          <br />
          <span className="text-universe-accent">in one place</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
          Map how complex systems interact — economy, supply chain, politics,
          tech. See connections, model cascades, and get cross-system insight in
          real time.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-lg bg-universe-accent px-6 py-3 text-base font-medium text-white transition hover:opacity-90"
          >
            Open dashboard
          </Link>
          <Link
            href="/dashboard#feedback"
            className="rounded-lg border border-universe-border bg-universe-card px-6 py-3 text-base font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
          >
            Request a demo
          </Link>
        </div>
        <p className="mt-8 text-sm text-zinc-500">
          Pre-seed · AI × Systems Theory · 2026
        </p>
      </main>

      <footer className="relative border-t border-universe-border/50 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} Billion Universe. Confidential.
        </div>
      </footer>
    </div>
  );
}
