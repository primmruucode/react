import React, { useState } from 'react';
import axios from 'axios';

const Todo = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(todo.task);

  const handleEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/todos/${todo._id}`, {
        task: updatedTask,
      });
      onUpdate(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/todos/${todo._id}`);
      onDelete(todo._id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedTask}
            onChange={(e) => setUpdatedTask(e.target.value)}
          />
          <button onClick={handleEdit}>Update</button>
        </div>
      ) : (
        <div>
          <li>{todo.task}</li>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Todo;
