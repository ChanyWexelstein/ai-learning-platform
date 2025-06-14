import { useState, useEffect } from 'react';
import { fetchCategories, fetchSubCategories, submitPrompt } from '../services/api';
import { useUserId } from '../hooks/useUser';

interface Category {
  id: string;
  name: string;
}

interface SubCategory {
  id: string;
  name: string;
  categoryId: string;
}

function PromptForm({ onResponse }: { onResponse: (res: string) => void }) {
  const userId = useUserId();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories().then(res => setCategories(res.data)).catch(() => {
      setError('Failed to load categories.');
    });
  }, []);

  useEffect(() => {
    if (categoryId) {
      fetchSubCategories(categoryId)
        .then(res => setSubCategories(res.data))
        .catch(() => setError('Failed to load sub categories.'));
    } else {
      setSubCategories([]);
    }
  }, [categoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    if (!prompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await submitPrompt({
        userId: userId.toString(),
        categoryId,
        subCategoryId,
        prompt: prompt.trim()
      });

      setPrompt('');
      setCategoryId('');
      setSubCategoryId('');
      setSubCategories([]);
      onResponse(res.data.response);
    } catch (err) {
      console.error(err);
      setError('An error occurred while sending the prompt.');
      onResponse('Error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600 text-sm">{error}</div>}

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">select category</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <select
        value={subCategoryId}
        onChange={(e) => setSubCategoryId(e.target.value)}
        className="w-full border p-2 rounded"
        required
        disabled={!categoryId}
      >
        <option value="">Select sub category</option>
        {subCategories.map(sub => (
          <option key={sub.id} value={sub.id}>{sub.name}</option>
        ))}
      </select>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt..."
        rows={4}
        className="w-full border p-2 rounded"
        required
      />

      <button
        disabled={loading}
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {loading ? 'Loading...' : 'Send to AI'}
      </button>
    </form>
  );
}

export default PromptForm;
