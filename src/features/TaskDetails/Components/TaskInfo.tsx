import React, { useState, useContext } from 'react';
import { TaskContext } from '../../Dashboard/Components/Context';


const NewTask = () => {
  const [newTask, setNewTask] = useState({
    taskName: '',
    status: 'Pending',
    priority: 'Medium',
  });

  const { tasks, addTask } = useContext(TaskContext);
  const [successMessage, setSuccessMessage] = useState('');
  const maxId = tasks.length > 0 ? Math.max(...tasks.map((task) => task.taskId)) : 0;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = () => {
    const newTaskEntry = {
        taskId: maxId + 1,
      ...newTask,
    };
    addTask(newTaskEntry);  
    setSuccessMessage('Task added successfully!');
    setNewTask({ taskName: '', status: 'Pending', priority: 'Medium' });
    setTimeout(() => {
        setSuccessMessage('');
      }, 1500);
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <form>
        <div>
          <label>Task Name:</label>
          <input
            type="text"
            name="taskName"
            value={newTask.taskName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={newTask.status}
            onChange={handleInputChange}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Priority:</label>
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleInputChange}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <button type="button" onClick={handleAddTask}>
          Add Task
        </button>
      </form>
      {successMessage && <p className='success-message'>{successMessage}</p>}      
    </div>
  );
};

export default NewTask;