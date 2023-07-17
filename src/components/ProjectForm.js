import React, { useState } from 'react';

const ProjectForm = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [employees, setEmployees] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'projectName') {
      setProjectName(value);
    } else if (name === 'employeeName') {
      setEmployeeName(value);
    }
  };

  const handleAddEmployee = () => {
    if (employeeName) {
      setEmployees([...employees, employeeName]);
      setEmployeeName('');
    }
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (projectName && employees.length > 0) {
      if (editMode) {
        const updatedProjects = [...projects];
        updatedProjects[editIndex] = {
          projectName: projectName,
          employees: employees,
        };
        setProjects(updatedProjects);
        setEditMode(false);
        setEditIndex(null);
      } else {
        const newProject = {
          projectName: projectName,
          employees: employees,
        };
        setProjects([...projects, newProject]);
      }
      setProjectName('');
      setEmployees([]);
      setEmployeeName('');
    }
  };

  const handleEditProject = (index) => {
    const projectToEdit = projects[index];
    setProjectName(projectToEdit.projectName);
    setEmployees(projectToEdit.employees);
    setEditMode(true);
    setEditIndex(index);
  };

  const handleDeleteProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  return (
    <div>
      <h2>Добавить проект</h2>
      <form onSubmit={handleAddProject}>
        <div>
          <label>Название проекта:</label>
          <input
            type="text"
            name="projectName"
            value={projectName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Сотрудники:</label>
          <ul>
            {employees.map((employee, index) => (
              <li key={index}>{employee}</li>
            ))}
          </ul>
          <input
            type="text"
            name="employeeName"
            value={employeeName}
            onChange={handleInputChange}
          />
          <button type="button" onClick={handleAddEmployee}>
            Добавить сотрудника
          </button>
        </div>
        <button type="submit">
          {editMode ? 'Редактировать проект' : 'Добавить проект'}
        </button>
      </form>
      <div>
        <h3>Список проектов</h3>
        <ul>
          {projects.map((project, index) => (
            <li key={index}>
              <p>Название проекта: {project.projectName}</p>
              <p>Сотрудники:</p>
              <ul>
                {project.employees.map((employee, employeeIndex) => (
                  <li key={employeeIndex}>{employee}</li>
                ))}
              </ul>
              <button onClick={() => handleEditProject(index)}>
                Редактировать проект
              </button>
              <button onClick={() => handleDeleteProject(index)}>
                Удалить проект
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectForm;
