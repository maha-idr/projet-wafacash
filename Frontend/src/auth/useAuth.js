const KEY = "wafa_auth"; // stockage simple

export function getAuth() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}
export function setAuth(payload) {
  localStorage.setItem(KEY, JSON.stringify(payload)); // { accessToken, role, expiresAt? }
}
export function clearAuth() {
  localStorage.removeItem(KEY);
}
export function hasToken() {
  return !!getAuth()?.accessToken;
}
export function hasRole(role) {
  return getAuth()?.role === role;
}
export function authHeader() {
  const t = getAuth()?.accessToken;
  return t ? { Authorization: `Bearer ${t}` } : {};
}
