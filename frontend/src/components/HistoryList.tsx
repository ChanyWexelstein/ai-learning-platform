import { useEffect, useState } from 'react';
import { fetchUserPrompts } from '../services/api';
import { useUser } from '../hooks/useUser';

interface Prompt {
  id: number;
  prompt: string;
  response: string;
  createdAt: string;
}

// תאריך בפורמט מספרי: 13/06/2025 13:07
function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid Date';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
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
    <div className="flex justify-center">
      <div className="w-full max-w-2xl px-6 py-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Your Learning History
        </h2>

        {prompts.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">No history yet.</p>
        ) : (
          <ul className="space-y-10">
            {prompts.map(p => (
              <li key={p.id} className="flex flex-col gap-4">
                {/* Prompt (user) */}
                <div className="self-end max-w-[80%] bg-blue-100 text-gray-800 p-4 rounded-xl rounded-br-none shadow-sm">
                  <p className="text-sm text-gray-600 mb-1 font-semibold">You:</p>
                  <p className="whitespace-pre-line">{p.prompt}</p>
                </div>

                {/* Response (AI) */}
                <div className="self-start max-w-[80%] bg-gray-100 text-gray-800 p-4 rounded-xl rounded-bl-none shadow-sm">
                  <p className="text-sm text-gray-600 mb-1 font-semibold">AI:</p>
                  <p className="whitespace-pre-line">{p.response}</p>
                  <p className="text-right text-xs text-gray-400 mt-2">
                    {formatDateTime(p.createdAt)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default HistoryList;
