export async function adminFetch(
  url: string,
  options: RequestInit = {}
) {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    window.location.href = "/admin/login";
    return;
  }

  return res;
}