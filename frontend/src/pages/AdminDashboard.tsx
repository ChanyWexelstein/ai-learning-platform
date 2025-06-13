import { useEffect, useState } from 'react';
import { fetchAllUsers, fetchUserPrompts } from '../services/api';

interface Prompt {
  id: string;
  prompt: string;
  response: string;
  createdAt: string;
  category?: { name: string };
  subCategory?: { name: string };
}

interface User {
  id: string;
  name: string;
  phone: string;
}

function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllUsers()
      .then(res => setUsers(res.data))
      .catch(() => alert('You are not authorized'));
  }, []);

  const handleUserClick = async (userId: string) => {
    if (selectedUserId === userId) {
      setSelectedUserId(null);
      setPrompts([]);
    } else {
      setSelectedUserId(userId);
      setLoading(true);
      try {
        const res = await fetchUserPrompts(userId);
        setPrompts(res.data);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <h2 className="text-lg font-semibold mb-3">Users:</h2>
      <ul className="space-y-4">
        {users.map(user => (
          <li key={user.id} className="border rounded p-4 bg-white shadow">
            <div
              onClick={() => handleUserClick(user.id)}
              className="cursor-pointer text-blue-700 hover:underline"
            >
              {user.name} ({user.phone})
            </div>

            {selectedUserId === user.id && (
              <div className="mt-4 border-t pt-3">
                <h3 className="text-md font-semibold mb-2">Learning History</h3>
                {loading ? (
                  <p>Loading...</p>
                ) : prompts.length === 0 ? (
                  <p className="text-gray-500">No prompts found for this user.</p>
                ) : (
                  <ul className="space-y-3">
                    {prompts.map(p => (
                      <li key={p.id} className="border p-3 rounded bg-gray-50">
                        <p><strong>Category:</strong> {p.category?.name || '-'}</p>
                        <p><strong>Sub-Category:</strong> {p.subCategory?.name || '-'}</p>
                        <p><strong>Prompt:</strong> {p.prompt}</p>
                        <p><strong>Response:</strong> {p.response}</p>
                        <p className="text-sm text-gray-500">
                          {p.createdAt && !isNaN(new Date(p.createdAt).getTime())
                            ? new Date(p.createdAt).toLocaleString('he-IL', {
                                dateStyle: 'medium',
                                timeStyle: 'short'
                              })
                            : 'Invalid Date'}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
