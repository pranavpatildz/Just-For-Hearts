export function getUser() {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("jfh_user");
  return user ? JSON.parse(user) : null;
}

export function setUser(user: unknown) {
  localStorage.setItem("jfh_user", JSON.stringify(user));
}

export function logout(redirectTo = "/login") {
  localStorage.removeItem("jfh_user");
  window.location.href = redirectTo;
}
