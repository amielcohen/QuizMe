import { API_BASE_URL } from '../config';

async function parseError(res) {
  try {
    const data = await res.json();
    return data?.message || 'Request failed';
  } catch {
    return 'Request failed';
  }
}

export async function register({ username, email, password }) {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    const msg = await parseError(res);
    throw new Error(msg);
  }

  return res.json(); // { token, user }
}

export async function loginRequest({ identifier, password }) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  });

  if (!res.ok) throw new Error(await parseError(res));
  return res.json(); // { token, user }
}
