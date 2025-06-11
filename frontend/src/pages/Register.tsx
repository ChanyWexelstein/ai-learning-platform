import { useState } from 'react';
import { registerUser } from '../services/api';

function Register() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerUser({ name, phone });
    // מעבר ל-dashboard בהמשך
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border w-full px-3 py-2 rounded"
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border w-full px-3 py-2 rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white py-2 w-full rounded">Register</button>
    </form>
  );
}

export default Register;
