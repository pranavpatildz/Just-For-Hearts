"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/src/lib/admin-fetch";

export default function AppointmentPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    adminFetch("/api/admin/appointments")
      ?.then((res) => res?.json())
      .then((data) => setAppointments(data));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Appointments</h1>

      <div className="space-y-4">
        {appointments.map((appt: any) => (
          <div
            key={appt.id}
            className="bg-white p-4 rounded shadow"
          >
            <p><strong>Name:</strong> {appt.name}</p>
            <p><strong>Status:</strong> {appt.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}