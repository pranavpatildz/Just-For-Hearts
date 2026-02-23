"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/src/lib/admin-fetch";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    adminFetch("/api/admin/doctors")
      ?.then((res) => res?.json())
      .then((data) => setDoctors(data));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Doctors</h1>

      <ul className="space-y-2">
        {doctors.map((doc: any) => (
          <li
            key={doc.id}
            className="bg-white p-4 rounded shadow"
          >
            {doc.name}
          </li>
        ))}
      </ul>
    </div>
  );
}