"use client";
import axios from "axios";
import { useState } from "react";

export default function NewJobPage() {
  const [form, setForm] = useState({ customerName: "", address: "", type: "DOMESTIC" });
  const submit = async () => {
    const r = await axios.post("/api/jobs", { address: form.address, type: form.type, orgId: "seed-org", customer: { connectOrCreate: { where: { email: `${form.customerName}@example.com` }, create: { name: form.customerName, orgId: "seed-org" } } } });
    window.location.href = "/";
  };
  return (
    <main className="space-y-4">
      <h2 className="text-xl font-semibold">New Job</h2>
      <div className="space-y-2 max-w-md">
        <input placeholder="Customer name" className="border px-3 py-2 rounded-xl w-full" value={form.customerName} onChange={e=>setForm({...form, customerName:e.target.value})} />
        <input placeholder="Address" className="border px-3 py-2 rounded-xl w-full" value={form.address} onChange={e=>setForm({...form, address:e.target.value})} />
        <select className="border px-3 py-2 rounded-xl w-full" value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
          <option>DOMESTIC</option>
          <option>COMMERCIAL</option>
        </select>
        <button onClick={submit} className="px-3 py-2 border rounded-xl">Create</button>
      </div>
    </main>
  );
}
