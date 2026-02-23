"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-black text-white p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <a href="/admin/dashboard">Dashboard</a>
          <a href="/admin/dashboard/doctors">Doctors</a>
          <a href="/admin/dashboard/programs">Programs</a>
          <a href="/admin/dashboard/appointments">Appointments</a>
          <a href="/admin/dashboard/messages">Messages</a>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-gray-50">
        {children}
      </main>
    </div>
  );
}