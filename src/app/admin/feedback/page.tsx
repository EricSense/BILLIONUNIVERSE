import { AdminFeedbackClient } from '@/components/AdminFeedbackClient';

export const dynamic = 'force-dynamic';

export default function AdminFeedbackPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Feedback inbox</h1>
        <p className="mt-1 text-zinc-400">
          Review, tag, and triage incoming feedback from users and design
          partners.
        </p>
      </div>
      <AdminFeedbackClient />
    </div>
  );
}

