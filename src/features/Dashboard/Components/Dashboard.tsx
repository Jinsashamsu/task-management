import { useState, useEffect, useContext } from "react";
import { TaskContext } from "./Context";

const Dashboard = () => {    
    const { tasks, setTaskList, deleteTask } = useContext(TaskContext);
    const[loadingstate, setloadingstate] = useState(true)
    const [filterKeyword, setFilterKeyword] = useState('')
    const [filterStatus, setFilterStatus] = useState('')
  
    useEffect(() => {
        // Only fetch the data if tasks are empty (first time loading)
        if (tasks.length === 0) {
          fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.json())
            .then((data) => {
              const formattedTasks = data.slice(0, 10).map((task) => ({
                taskId: task.id,
                taskName: task.title,
                status: task.completed ? 'Completed' : 'Pending',
                priority: 'Medium',
              }));
              setTaskList(formattedTasks);
              setloadingstate(false);
            })
            .catch((error) => console.error('Error fetching tasks:', error));
        } else {
          setloadingstate(false);
        }
      }, [tasks, setTaskList]);

      const handleMarkCompleted = (taskId) => {
        const updatedTasks = tasks.map(task =>
          task.taskId === taskId ? { ...task, status: 'Completed' } : task
        );
        setTaskList(updatedTasks); 
      };

    //   const filteredTasks = tasks.filter((task) =>
    //     task.taskName.toLowerCase().includes(filterKeyword.toLowerCase())
    //   );

    const filteredTasks = tasks.filter((task) => {
        const matchesTitle = task.taskName.toLowerCase().includes(filterKeyword.toLowerCase());
        const matchesStatus = filterStatus ? task.status === filterStatus : true; // Only filter by status if selected
        return matchesTitle && matchesStatus;
      });
  
    return (
        <>
      <div>
        <h1>Task List</h1>
        <input
          type="text"
          placeholder="Filter by title"
          value={filterKeyword}
          onChange={(e) => setFilterKeyword(e.target.value)}
          className="filter-input"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-input"
        >
            <option value="">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        {loadingstate? <p>loading.. </p>:
        <table className="task-table">
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Task Name</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Mark Completed</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.taskId}>
                <td>{task.taskId}</td>
                <td>{task.taskName}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
                <td>
                    {task.status !== 'Completed' && (
                      <button onClick={() => handleMarkCompleted(task.taskId)}>
                        Mark Completed
                      </button>
                    )}
                  </td>
                <td>
                  <button onClick={() => deleteTask(task.taskId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
}
      </div>
      </>
    )
  }
    

 

export default Dashboard