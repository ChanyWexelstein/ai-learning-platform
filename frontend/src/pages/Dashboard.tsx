import { useEffect, useState } from 'react';
import {
  fetchCategories,
  fetchSubCategories,
  submitPrompt
} from '../services/api';
import HistoryList from '../components/HistoryList';

interface Category {
  id: string;
  name: string;
}

interface SubCategory {
  id: string;
  name: string;
  category_id: string;
}

function Dashboard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user?.id;

  useEffect(() => {
    fetchCategories().then(res => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (categoryId) {
      fetchSubCategories(categoryId).then(res => setSubCategories(res.data));
    } else {
      setSubCategories([]);
    }
  }, [categoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');
    try {
      const res = await submitPrompt({
        userId,
        categoryId,
        subCategoryId,
        prompt
      });
      setResponse(res.data.response);
    } catch (error) {
      setResponse('Error occurred while sending prompt.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-center">Learning Dashboard</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <select
          value={subCategoryId}
          onChange={(e) => setSubCategoryId(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Sub-Category</option>
          {subCategories.map((sub) => (
            <option key={sub.id} value={sub.id}>{sub.name}</option>
          ))}
        </select>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your question..."
          className="w-full border px-3 py-2 rounded"
          rows={4}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Loading...' : 'Send to AI'}
        </button>
      </form>

      {response && (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}

      <HistoryList userId={userId} />
    </div>
  );
}

export default Dashboard;
