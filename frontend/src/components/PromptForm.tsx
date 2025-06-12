import { useState, useEffect } from 'react';
import { fetchCategories, fetchSubCategories, submitPrompt } from '../services/api';
import { useUserId } from '../hooks/useUserId';

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

  useEffect(() => {
    fetchCategories().then(res => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (categoryId) {
      fetchSubCategories(categoryId).then(res => {
        console.log('Fetched subCategories:', res.data); // ✅ לבדיקה
        setSubCategories(res.data);
      });
    } else {
      setSubCategories([]);
    }
  }, [categoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setLoading(true);
    try {
      const res = await submitPrompt({
        userId,
        categoryId,
        subCategoryId,
        prompt
      });
      onResponse(res.data.response);
      setPrompt('');
    } catch {
      onResponse('Error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <select
        value={subCategoryId}
        onChange={(e) => setSubCategoryId(e.target.value)}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Select Sub-Category</option>
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
