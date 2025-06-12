import PromptForm from '../components/PromptForm';
import HistoryList from '../components/HistoryList';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [response, setResponse] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Learning Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <PromptForm onResponse={setResponse} />

      {response && (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}

      <HistoryList />
    </div>
  );
}

export default Dashboard;
