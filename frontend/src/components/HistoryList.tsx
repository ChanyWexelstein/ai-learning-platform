import { useEffect, useState } from 'react';
import { fetchUserPrompts } from '../services/api';
import { useUser } from '../hooks/useUser';

interface Prompt {
  id: number;
  prompt: string;
  response: string;
  createdAt: string;
}

function HistoryList() {
  const user = useUser();
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    if (!user?.id) return;
    fetchUserPrompts(user.id.toString())
      .then(res => setPrompts(res.data))
      .catch(err => console.error('Failed to fetch prompts', err));
  }, [user]);

  if (!user?.id) return null;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Your History</h2>
      {prompts.length === 0 ? (
        <p className="text-sm text-gray-500">No history yet.</p>
      ) : (
        <ul className="space-y-2">
          {prompts.map(p => (
            <li key={p.id} className="border p-3 rounded bg-gray-50">
              <p><strong>Prompt:</strong> {p.prompt}</p>
              <p><strong>Response:</strong> {p.response}</p>
              <p className="text-sm text-gray-500">
                {new Date(p.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HistoryList;
