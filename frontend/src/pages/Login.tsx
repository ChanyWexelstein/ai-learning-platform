import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await loginUser({ name, password });
      const token = res.data.token;
      localStorage.setItem('token', token);

      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role;

      if (role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      const msg = error.response?.data?.error || 'Login failed. Please try again.';
      setErrorMsg(msg);
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-10 space-y-4">
      {errorMsg && (
        <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded text-sm text-center">
          {errorMsg}
        </div>
      )}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Log in
      </button>
      <p className="text-center text-sm">
        Don't have an account?{' '}
        <a href="/register" className="text-blue-600 underline">
          Register
        </a>
      </p>
    </form>
  );
}

export default Login;


