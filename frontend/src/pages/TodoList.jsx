import { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/todos/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8000/api/todos/',
        { title: newTodo },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:8000/api/todos/${id}/`,
        { status: !status },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/todos/${id}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Todo
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between mb-2">
            <span
              className={`cursor-pointer ${todo.status ? 'line-through' : ''}`}
              onClick={() => toggleTodo(todo.id, todo.status)}
            >
              {todo.title}
            </span>
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