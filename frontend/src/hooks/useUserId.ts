export function useUserId(): string | undefined {
  const token = localStorage.getItem('token');
  if (!token) return undefined;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return String(payload.id); 
  } catch {
    return undefined;
  }
}
