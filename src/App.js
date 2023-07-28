import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProjectForm from './components/ProjectForm';
import TaskForm from './components/TaskForm';
import GanttChart from './components/GanttChart';
import EmployeeStats from './components/EmployeeStats';
import TaskList from './components/TaskList';
import { employees, projects, tasks } from './components/data'; 
import EmployeeTasksPage from './components/EmployeeTasksPage';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <nav className="navbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/projects" className="nav-link">Проекты</Link>
            </li>
            <li className="nav-item">
              <Link to="/tasks" className="nav-link">Задачи</Link>
            </li>
            <li className="nav-item">
              <Link to="/gantt-chart" className="nav-link">Диаграмма Ганта</Link>
            </li>
            <li className="nav-item">
              <Link to="/employee-stats" className="nav-link">Статистика сотрудников</Link>
            </li>
            <li className="nav-item">
              <Link to="/employee-tasks" className="nav-link">Задания сотрудников</Link> 
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/projects" element={<ProjectForm employees={employees} />} />
          <Route path="/tasks" element={<TaskForm employees={employees} projects={projects} />} />
          <Route path="/gantt-chart" element={<GanttChart tasks={tasks} />} />
          <Route path="/employee-stats" element={<EmployeeStats tasks={tasks} employees={employees} />} />
          <Route path="/employee-tasks" element={<EmployeeTasksPage employees={employees} tasks={tasks} />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

