export function useUserId(): string | undefined {
  const stored = localStorage.getItem('user');
  if (!stored) return undefined;
  try {
    const user = JSON.parse(stored);
    return user?.id;
  } catch {
    return undefined;
  }
}
