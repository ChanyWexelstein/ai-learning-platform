import { useEffect, useState } from 'react';
import { fetchUserPrompts } from '../services/api'; // ✅ השם החדש

interface PromptEntry {
  id: string;
  prompt: string;
  response: string;
  created_at: string;
}

function HistoryList({ userId }: { userId: string }) {
  const [history, setHistory] = useState<PromptEntry[]>([]);

  useEffect(() => {
    fetchUserPrompts(userId).then((res) => setHistory(res.data));
  }, [userId]);

  if (!history.length) return null;

  return (
    <div className="mt-10 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Learning History</h2>
      <ul className="space-y-4">
        {history.map((item) => (
          <li key={item.id} className="p-4 border rounded bg-white shadow-sm">
            <p className="font-medium text-gray-700">Prompt: {item.prompt}</p>
            <p className="mt-2 text-gray-900">Response: {item.response}</p>
            <p className="mt-2 text-sm text-gray-500">
              {new Date(item.created_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoryList;
