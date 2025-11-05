"use client";
import useSWR from "swr";
import axios from "axios";
import { useState } from "react";

const fetcher = (url: string) => axios.get(url).then(r => r.data);

export default function LeadsPage() {
  const { data, mutate } = useSWR("/api/leads", fetcher);
  const [notes, setNotes] = useState("");
  const [score, setScore] = useState<number | null>(null);

  const add = async () => {
    const r = await axios.post("/api/leads", { notes });
    setNotes("");
    mutate();
  };

  const scoreLead = async () => {
    const r = await axios.post("/api/ai/leadscore", { notes });
    setScore(r.data.score);
  };

  return (
    <main className="space-y-4">
      <h2 className="text-xl font-semibold">Leads</h2>
      <div className="flex gap-2">
        <input value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Lead notes" className="border px-3 py-2 rounded-xl w-full" />
        <button onClick={scoreLead} className="px-3 py-2 border rounded-xl">AI score</button>
        <button onClick={add} className="px-3 py-2 border rounded-xl">Add</button>
      </div>
      {score !== null && <p className="text-sm">Estimated score: <b>{score}</b>/100</p>}
      <ul className="space-y-2">
        {data?.map((l:any)=> (
          <li key={l.id} className="p-3 bg-white border rounded-xl">
            <div className="text-sm">{l.notes}</div>
            <div className="text-xs text-gray-600">score: {l.score ?? "—"}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
