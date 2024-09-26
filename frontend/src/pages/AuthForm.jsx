import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AuthForm({ setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:8000/api/login/', { username, password });
        localStorage.setItem('token', response.data.access);
        setIsAuthenticated(true);
        navigate('/todos');
      } else {
        await axios.post('http://localhost:8000/api/register/', { username, email, password });
        const loginResponse = await axios.post('http://localhost:8000/api/login/', { username, password });
        localStorage.setItem('token', loginResponse.data.access);
        setIsAuthenticated(true);
        navigate('/todos');
      }
    } catch (error) {
      console.error(`${isLogin ? 'Login' : 'Registration'} failed:`, error);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          {!isLogin && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <button type="submit" className={`w-full ${isLogin ? 'bg-blue-500' : 'bg-green-500'} text-white p-2 rounded mb-4`}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button onClick={toggleAuthMode} className="w-full bg-gray-300 text-gray-700 p-2 rounded">
          {isLogin ? 'Sign Up' : 'Have an account?'}
        </button>
      </div>
    </div>
  );
}

export default AuthForm;