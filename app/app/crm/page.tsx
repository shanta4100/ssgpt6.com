"use client";

import { useState } from "react";

export default function CRM() {
  const [leads, setLeads] = useState<any[]>([]);
  const [form, setForm] = useState({
    company: "",
    name: "",
    email: "",
    status: "new"
  });

  const addLead = () => {
    setLeads([...leads, form]);
    setForm({ company: "", name: "", email: "", status: "new" });
  };

  return (
    <main style={{
      background: "#0b1a2f",
      color: "white",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <h1 style={{ color: "gold" }}>CRM System</h1>

      <input placeholder="Company"
        value={form.company}
        onChange={(e)=>setForm({...form, company:e.target.value})} />

      <input placeholder="Name"
        value={form.name}
        onChange={(e)=>setForm({...form, name:e.target.value})} />

      <input placeholder="Email"
        value={form.email}
        onChange={(e)=>setForm({...form, email:e.target.value})} />

      <button onClick={addLead}>Add Lead</button>

      <hr />

      {leads.map((lead, i) => (
        <div key={i}>
          <p>{lead.company} - {lead.name} - {lead.email}</p>
        </div>
      ))}
    </main>
  );
}