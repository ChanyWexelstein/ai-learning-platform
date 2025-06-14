import { useMemo } from 'react';

interface UserPayload {
  id: string;
  role: string;
  exp?: number;
}

function decodeToken(): UserPayload | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null; 
    }

    return {
      id: String(payload.id),
      role: payload.role,
    };
  } catch {
    return null;
  }
}

export function useUser(): UserPayload | null {
  return useMemo(() => decodeToken(), []);
}

export function useUserId(): string | undefined {
  const user = useUser();
  return user?.id;
}
