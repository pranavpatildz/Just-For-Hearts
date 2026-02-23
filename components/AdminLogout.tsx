"use client";

import { useRouter } from "next/navigation";

export default function AdminLogout() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="mt-6 bg-red-600 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
}