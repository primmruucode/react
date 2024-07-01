import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm.js';
import './styles/App.css'; // Import the custom styles

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch data from the Express server
    axios.get('http://localhost:5000/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, []);


  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div>
      <h1>MERN Stack Todo App</h1>
      <TodoForm addTodo={addTodo} />  {/* Pass addTodo as a prop */}
      <ul>
        {todos.map(todo => (
          <li key={todo._id} className={todo.completed ? "completed" : ""}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
