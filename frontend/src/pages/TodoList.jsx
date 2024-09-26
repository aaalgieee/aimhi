import { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const getToken = () => localStorage.getItem('token');

  const fetchTodos = async () => {
    try {
      const token = getToken();
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await axios.get('http://localhost:8000/api/todos/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error.response ? error.response.data : error.message);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      if (!token) {
        console.error('No token found');
        return;
      }
      await axios.post(
        'http://localhost:8000/api/todos/',
        { title: newTodo, description: newDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTodo('');
      setNewDescription('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error.response ? error.response.data : error.message);
    }
  };

  const toggleTodo = async (id, currentStatus) => {
    try {
      const token = getToken();
      if (!token) {
        console.error('No token found');
        return;
      }
      console.log('Toggling todo:', id, 'Current status:', currentStatus);
      const response = await axios.put(
        `http://localhost:8000/api/todos/${id}/`,
        { status: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Toggle response:', response.data);
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error.response ? error.response.data : error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      const token = getToken();
      if (!token) {
        console.error('No token found');
        return;
      }
      await axios.delete(`http://localhost:8000/api/todos/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <form onSubmit={addTodo} className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="p-2 border rounded mr-2"
        />
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Add a description"
          className="p-2 border rounded mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Todo
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.status}
                onChange={() => toggleTodo(todo.id, todo.status)}
                className="mr-2"
              />
              <span className={todo.status ? 'line-through' : ''}>
                {todo.title}
              </span>
              <span className="ml-4 text-gray-500">
                {todo.description}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;