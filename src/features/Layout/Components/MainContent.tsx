import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "../../Dashboard/Components/Dashboard";
import TaskInfo from "../../TaskDetails/Components/TaskInfo";
function MainContent()
{
return(
    <>
    <BrowserRouter>
      <nav>
        <Link to="/">Dashbaord</Link> | <Link to="/details">Task Details</Link> 
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/details" element={<TaskInfo />} />
      </Routes>
    </BrowserRouter>
    </>
)
}

export default MainContent