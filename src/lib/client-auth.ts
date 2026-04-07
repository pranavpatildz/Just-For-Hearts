export function getUser() {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("jfh_user");
  return user ? JSON.parse(user) : null;
}

export function setUser(user: unknown) {
  localStorage.setItem("jfh_user", JSON.stringify(user));
  if (
    typeof user === "object" &&
    user !== null &&
    "mobile" in user &&
    typeof (user as { mobile?: unknown }).mobile === "string"
  ) {
    localStorage.setItem("user_phone", (user as { mobile: string }).mobile);
    localStorage.setItem("mobile", (user as { mobile: string }).mobile);
  }
}

export function logout(redirectTo = "/login") {
  localStorage.removeItem("jfh_user");
  localStorage.removeItem("user_phone");
  localStorage.removeItem("mobile");
  window.location.href = redirectTo;
}
