import { useEffect, useState } from 'react';
import { fetchAllUsers, fetchAllPrompts } from '../services/api'; 

interface User {
  id: string;
  name: string;
  phone: string;
}

interface Prompt {
  id: string;
  userId: string;
  prompt: string;
  response: string;
  createdAt: string;
}

function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    fetchAllUsers().then(res => setUsers(res.data));
    fetchAllPrompts().then(res => setPrompts(res.data));
  }, []);

  const getUserPrompts = (userId: string) =>
    prompts.filter(p => p.userId === userId);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {users.map(user => (
        <div key={user.id} className="mb-8 border rounded p-4 bg-white shadow">
          <h2 className="text-lg font-semibold mb-2">
            {user.name} ({user.phone})
          </h2>
          <ul className="space-y-2">
            {getUserPrompts(user.id).map(p => (
              <li key={p.id} className="border p-3 rounded bg-gray-50">
                <p><strong>Prompt:</strong> {p.prompt}</p>
                <p><strong>Response:</strong> {p.response}</p>
                <p className="text-sm text-gray-500">
                  {new Date(p.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
            {getUserPrompts(user.id).length === 0 && (
              <p className="text-sm text-gray-500">No prompts found.</p>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
