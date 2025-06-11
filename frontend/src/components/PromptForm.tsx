import { useEffect, useState } from 'react';
import { getCategories, getSubCategories, sendPrompt } from '../services/api';

interface Category {
  id: string;
  name: string;
}

interface SubCategory {
  id: string;
  name: string;
  category_id: string;
}

function PromptForm({ userId }: { userId: string }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories().then(res => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (categoryId) {
      getSubCategories(categoryId).then(res => setSubCategories(res.data));
    } else {
      setSubCategories([]);
    }
  }, [categoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt || !categoryId || !subCategoryId) return;
    setLoading(true);
    try {
      const res = await sendPrompt({ userId, categoryId, subCategoryId, prompt });
      setResponse(res.data.response);
    } catch (err) {
      setResponse('Error submitting the request');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-md rounded max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-semibold">Ask the AI a Question</h2>

      <select className="w-full border px-3 py-2 rounded" onChange={(e) => setCategoryId(e.target.value)} value={categoryId} required>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <select className="w-full border px-3 py-2 rounded" onChange={(e) => setSubCategoryId(e.target.value)} value={subCategoryId} required>
        <option value="">Select Subcategory</option>
        {subCategories.map((sub) => (
          <option key={sub.id} value={sub.id}>{sub.name}</option>
        ))}
      </select>

      <textarea
        className="w-full border px-3 py-2 rounded"
        placeholder="What do you want to learn?"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send to AI'}
      </button>

      {response && (
        <div className="mt-4 bg-gray-100 p-4 rounded border">
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </form>
  );
}

export default PromptForm;
