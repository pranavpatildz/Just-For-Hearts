export async function adminFetch(
  url: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem("admin_token");

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("admin_token");
    window.location.href = "/admin/login";
    return;
  }

  return res;
}