export function readStorage(key, fallback = null) {
  try { const value = localStorage.getItem(key); return value === null ? fallback : JSON.parse(value); }
  catch { return fallback; }
}
export function writeStorage(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
export function removeStorage(key) { localStorage.removeItem(key); }
