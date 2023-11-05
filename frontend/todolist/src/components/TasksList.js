import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TasksList = () => {
 const input = document.querySelector('input');

  const [todos, setTodos] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    axios.get('http://localhost:3000/tasks/recent')
      .then(res => {
        setTodos(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleAddTodo = () => {
    const newTodo = {
      title: input.value,
      status: "pending",
      createdAt: new Date(),
    };
    axios.post('http://localhost:3000/tasks', newTodo)
      .then(res => {
        setTodos([...todos, res.data])
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleEditTodo = (todo) => {
    setEditingTask(todo);
  };

  const handleSubmitEditedTask = (editedTask) => {
    setEditingTask(null);
    axios.put(`http://localhost:3000/tasks/${editedTask.id}`, editedTask)
      .then(res => {
        setTodos(todos.map(t => t.id === editedTask.id ? res.data : t));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleDeleteTodo = (id) => {
    axios.delete(`http://localhost:3000/tasks/${id}`)
      .then(() => {
        setTodos(todos.filter(t => t.id !== id));
      })
      .catch(err => {
        console.log(err);
      });
  };

 

  const handleFilterTodos = (status) => {
    setSelectedStatus(status);
    const filteredTodos = todos.filter(todo => todo.status === status);
    setTodos(filteredTodos);
   
  };


  return (
    <div>
      <input type="text" placeholder="Add a new todo..." />
      <button onClick={() => handleAddTodo({ text: input.value, status: "pending" })}>Add</button>
    
      <button onClick={() => handleFilterTodos("Pending")}>Pending</button>
      <button onClick={() => handleFilterTodos("in progress")}>In Progress</button>
      <button onClick={() => handleFilterTodos("Completed")}>Completed</button>
      {editingTask && (
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmitEditedTask(editingTask);
        }}>
          <input value={editingTask.title} 
                             onChange={(e) => setEditingTask({ ...editingTask, 
                             title: e.target.value })} />

          <select value={editingTask.status}
                             onChange={(e) => setEditingTask({ ...editingTask,
                              status: e.target.value })}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="in progress">in progress</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      )}

      <table>
        <tr>
          <td>Task</td>
          <td>Status</td>
          <td>Actions</td>
        </tr>
        {todos.map(task => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.status}</td>
            <td>
              <button onClick={() => handleEditTodo(task)}>Edit</button>
              <button onClick={() => handleDeleteTodo(task.id)}>Delete</button>
            </td>
           
          </tr>
        ))}
      </table>
      
    </div>
  );
};

export default TasksList;
