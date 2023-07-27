import React, { useState } from 'react';

const ProjectForm = ({ employees }) => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  // Обработчик изменения значения в поле ввода формы
  const handleInputChange = (e) => {
    setProjectName(e.target.value);
  };

  // Обработчик добавления или редактирования проекта
  const handleAddProject = (e) => {
    e.preventDefault();
    if (projectName && selectedEmployees.length > 0) {
      if (editIndex !== -1) {
        // Редактирование существующего проекта
        const editedProject = {
          projectName: projectName,
          employees: selectedEmployees,
        };
        const updatedProjects = [...projects];
        updatedProjects[editIndex] = editedProject;
        setProjects(updatedProjects);
        setEditIndex(-1); // Завершаем режим редактирования
      } else {
        // Добавление нового проекта
        const newProject = {
          projectName: projectName,
          employees: selectedEmployees,
        };
        setProjects([...projects, newProject]);
      }
      // Очистка полей формы после сохранения проекта
      setProjectName('');
      setSelectedEmployees([]);
    }
  };

  // Обработчик редактирования проекта по индексу
  const handleEditProject = (index) => {
    const project = projects[index];
    setProjectName(project.projectName);
    setSelectedEmployees(project.employees);
    setEditIndex(index);
  };

  // Обработчик удаления проекта из массива
  const handleDeleteProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
    setEditIndex(-1); // Завершаем режим редактирования (если был активен)
  };

  return (
    <div>
      <h2>Добавить проект</h2>
      <form onSubmit={handleAddProject}>
        <div>
          <label>Название проекта:</label>
          <input type="text" value={projectName} onChange={handleInputChange} />
        </div>
        <div>
          <label>Сотрудники:</label>
          <ul>
            {selectedEmployees.map((employee) => (
              <li key={employee.id}>{employee.name}</li>
            ))}
          </ul>
          <select
            multiple
            value={selectedEmployees.map((employee) => employee.id)}
            onChange={(e) =>
              setSelectedEmployees(
                Array.from(e.target.selectedOptions, (option) =>
                  employees.find((employee) => employee.id === parseInt(option.value))
                )
              )
            }
          >
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Добавить проект</button>
      </form>
      <div>
        <h3>Список проектов</h3>
        <ul>
          {projects.map((project, index) => (
            <li key={index}>
              <p>Название проекта: {project.projectName}</p>
              <p>Сотрудники:</p>
              <ul>
                {project.employees.map((employee) => (
                  <li key={employee.id}>{employee.name}</li>
                ))}
              </ul>
              <button onClick={() => handleEditProject(index)}>Редактировать</button>
              <button onClick={() => handleDeleteProject(index)}>Удалить</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectForm;
