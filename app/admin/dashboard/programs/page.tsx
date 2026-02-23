"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/src/lib/admin-fetch";

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function loadPrograms() {
    const res = await adminFetch("/api/admin/programs");
    const data = await res?.json();
    setPrograms(data || []);
  }

  useEffect(() => {
    loadPrograms();
  }, []);

  async function createProgram(e: React.FormEvent) {
    e.preventDefault();

    await adminFetch("/api/admin/programs", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        isPublished: false,
      }),
    });

    setTitle("");
    setDescription("");
    loadPrograms();
  }

  async function deleteProgram(id: string) {
    await adminFetch(`/api/admin/programs/${id}`, {
      method: "DELETE",
    });
    loadPrograms();
  }

  async function togglePublish(id: string, current: boolean) {
    await adminFetch(`/api/admin/programs/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        isPublished: !current,
      }),
    });
    loadPrograms();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Programs</h1>

      <form
        onSubmit={createProgram}
        className="mb-8 bg-white p-6 rounded shadow"
      >
        <h2 className="font-semibold mb-4">Create Program</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full border p-3 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-3 rounded mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Create
        </button>
      </form>

      <div className="space-y-4">
        {programs.map((prog: any) => (
          <div
            key={prog.id}
            className="bg-white p-4 rounded shadow"
          >
            <h3 className="font-bold">{prog.title}</h3>
            <p className="text-sm text-gray-600">
              {prog.description}
            </p>

            <div className="mt-4 flex gap-4">
              <button
                onClick={() =>
                  togglePublish(prog.id, prog.isPublished)
                }
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                {prog.isPublished
                  ? "Unpublish"
                  : "Publish"}
              </button>

              <button
                onClick={() => deleteProgram(prog.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}