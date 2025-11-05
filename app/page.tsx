import Link from "next/link";
import JobsKanban from "../components/JobsKanban";

export default function Page() {
  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Pipeline</h2>
        <Link className="underline" href="/jobs/new">New Job</Link>
      </div>
      <JobsKanban />
    </main>
  );
}
