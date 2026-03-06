import { SignalFeed } from '@/components/SignalFeed';
import { FeedbackSection } from '@/components/FeedbackSection';

export default function DashboardPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">
          Multi-System Signal Dashboard
        </h1>
        <p className="mt-1 text-zinc-400">
          Cross-system anomalies and intersections — macro, supply chain,
          energy, tech, policy.
        </p>
      </div>

      <SignalFeed />

      <section id="feedback" className="mt-16 scroll-mt-8">
        <FeedbackSection />
      </section>
    </>
  );
}
