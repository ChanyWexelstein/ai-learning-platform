import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

function Register() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; password?: string }>({});
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError('');

    const newErrors: { name?: string; phone?: string; password?: string } = {};

    if (!name || name.trim().length < 2 || name.length > 30) {
      newErrors.name = 'Name must be between 2 and 30 characters';
    }

    const phoneRegex = /^05\d{8}$/;
    if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Phone must be a valid Israeli number (e.g., 0501234567)';
    }

    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await registerUser({ name, phone, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (error: any) {
      const message = error?.response?.data?.error || 'Registration failed. Please try again.';
      setServerError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      {serverError && (
        <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded text-sm text-center">
          {serverError}
        </div>
      )}

      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Register
      </button>

      <p className="text-center text-sm">
        Already registered?{' '}
        <a href="/" className="text-blue-600 underline">
          Log in
        </a>
      </p>
    </form>
  );
}

export default Register;
