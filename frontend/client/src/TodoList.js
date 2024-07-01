import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Todo from './Todo';
import TodoForm from './TodoForm';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get('http://localhost:5000/todos');
      setTodos(response.data);
    };
    fetchTodos();
  }, []);

  const addTodo = (todo) => {
    setTodos([todo, ...todos]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
  };

  return (
    <center>
    <div>
        <h1>MERN Stack Todo App</h1>
      <TodoForm onAdd={addTodo} />
      <ul>
        {todos.map((todo) => (
          <Todo key={todo._id} todo={todo} onDelete={deleteTodo} onUpdate={updateTodo} />
        ))}
      </ul>
    </div></center>
  );
};

export default TodoList;
