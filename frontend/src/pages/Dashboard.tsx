import { useEffect, useState } from 'react';
import {
  fetchCategories,
  fetchSubCategories,
  submitPrompt
} from '../services/api';
import HistoryList from '../components/HistoryList';
import { useUserId } from '../hooks/useUserId';

function Dashboard() {
  const userId = useUserId(); 

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

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
    if (!userId) return;
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
        {/* form fields as before... */}
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
