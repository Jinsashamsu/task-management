import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    debugger;
    setTasks((prevTasks) => {  
        debugger;    
      return [...prevTasks, newTask];
    });
  };  
  
  const setTaskList = (taskList) => {
    setTasks(taskList); 
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, setTaskList, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};