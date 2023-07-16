import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProjectForm from './components/ProjectForm';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import GanttChart from './components/GanttChart';
import EmployeeStats from './components/EmployeeStats';
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
          </ul>
        </nav>

        <Routes>
          <Route path="/projects" element={<ProjectForm />} />
          <Route path="/tasks" element={<TaskForm />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/gantt-chart" element={<GanttChart />} />
          <Route path="/employee-stats" element={<EmployeeStats />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
