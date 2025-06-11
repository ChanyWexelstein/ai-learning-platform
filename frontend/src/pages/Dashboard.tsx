import PromptForm from '../components/PromptForm';
import HistoryList from '../components/HistoryList';
import { useState } from 'react';

function Dashboard() {
  const [response, setResponse] = useState('');

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-center">Learning Dashboard</h1>

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
