"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/src/lib/admin-fetch";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);

  async function loadMessages() {
    const res = await adminFetch("/api/admin/contact");
    const data = await res?.json();
    setMessages(data || []);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Contact Messages
      </h1>

      <div className="space-y-4">
        {messages.map((msg: any) => (
          <div
            key={msg.id}
            className="bg-white p-4 rounded shadow"
          >
            <p><strong>Name:</strong> {msg.name}</p>
            <p><strong>Email:</strong> {msg.email}</p>
            <p><strong>Message:</strong> {msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}