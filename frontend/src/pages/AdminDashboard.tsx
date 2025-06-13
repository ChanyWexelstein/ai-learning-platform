import { useEffect, useState } from 'react';
import { fetchAllUsers, fetchUserPrompts } from '../services/api';
import { useNavigate } from 'react-router-dom';

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

// תאריך בפורמט מספרי קבוע
function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid Date';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hour}:${minute}`;
}

function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

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
                        <p className="text-sm text-gray-500 mt-1">
                          {formatDateTime(p.createdAt)}
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
