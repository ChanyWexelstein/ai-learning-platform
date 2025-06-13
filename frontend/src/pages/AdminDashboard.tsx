import { useEffect, useState } from 'react';
import { fetchAllUsersWithPrompts } from '../services/api';

interface Prompt {
  id: string;
  prompt: string;
  response: string;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  phone: string;
  prompts: Prompt[];
}

function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchAllUsersWithPrompts()
      .then(res => setUsers(res.data))
      .catch(() => alert('You are not authorized'));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>
      {users.map(user => (
        <div key={user.id} className="mb-8 border rounded p-4 bg-white shadow">
          <h2 className="text-lg font-semibold mb-2">
            {user.name} ({user.phone})
          </h2>
          <ul className="space-y-2">
            {user.prompts.length > 0 ? (
              user.prompts.map(p => (
                <li key={p.id} className="border p-3 rounded bg-gray-50">
                  <p><strong>Prompt:</strong> {p.prompt}</p>
                  <p><strong>Response:</strong> {p.response}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(p.createdAt).toLocaleString()}
                  </p>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No prompts found.</p>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
