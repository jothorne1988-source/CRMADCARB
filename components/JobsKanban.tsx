"use client";
import useSWR from "swr";
import axios from "axios";
import { useState } from "react";

const fetcher = (url: string) => axios.get(url).then(r => r.data);

const STAGES = ["SALE","SURVEY","DESIGN","INSTALL","COMPLETE"] as const;

type Job = { id: string; customer: { name: string }; stage: string; type: string; address: string };

export default function JobsKanban() {
  const { data, mutate } = useSWR<Job[]>("/api/jobs", fetcher);
  const [drag, setDrag] = useState<{id:string,from:string} | null>(null);

  const onDrop = async (stage: string) => {
    if (!drag) return;
    await axios.patch(`/api/jobs/${drag.id}`, { stage });
    setDrag(null);
    mutate();
  };

  return (
    <div className="grid grid-cols-5 gap-4">
      {STAGES.map(stage => (
        <div key={stage} className="bg-white rounded-2xl shadow p-3"
             onDragOver={e=>e.preventDefault()} onDrop={()=>onDrop(stage)}>
          <h3 className="font-semibold mb-2">{stage}</h3>
          <div className="space-y-2 min-h-40">
            {data?.filter(j=>j.stage===stage).map(job => (
              <div key={job.id} draggable onDragStart={()=>setDrag({id:job.id,from:job.stage})}
                   className="p-3 border rounded-xl cursor-move">
                <div className="text-sm font-medium">{job.customer?.name}</div>
                <div className="text-xs text-gray-600">{job.type} · {job.address}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
