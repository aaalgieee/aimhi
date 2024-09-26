import { Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthForm from './pages/AuthForm';
import TodoList from './pages/TodoList';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/auth" element={<AuthForm setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/todos"
          element={isAuthenticated ? <TodoList /> : <Navigate to="/auth" />}
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/todos" : "/auth"} />} />
      </Routes>
    </div>
  );
}

export default App;