import { API_BASE_URL } from '../config';

export async function updateUserTheme(palette, token) {
  const res = await fetch(`${API_BASE_URL}/api/users/update-theme`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ palette }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || 'Failed to update user theme');
  }

  const data = await res.json();
  return data.palette;
}
