import React, { useState } from 'react';
import { projects, updateProjectsData } from './data'; // Импортируем массив projects и функцию updateProjectsData из файла data.js

const ProjectForm = ({ employees }) => {
  // Состояние для хранения данных о проектах
  const [projectsData, setProjectsData] = useState([]);
  // Состояния для управления формой
  const [projectName, setProjectName] = useState('');
  const [selectedEmployeesIds, setSelectedEmployeesIds] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  // Обработчик изменения значения в поле ввода формы
  const handleInputChange = (e) => {
    setProjectName(e.target.value);
  };

  // Обработчик добавления или редактирования проекта
  const handleAddProject = (e) => {
    e.preventDefault();
    if (projectName && selectedEmployeesIds.length > 0) {
      if (editIndex !== -1) {
        // Редактирование существующего проекта
        const editedProject = {
          projectName: projectName,
          employees: selectedEmployeesIds.map((empId) => employees.find((emp) => emp.id === empId)),
        };
        const updatedProjects = [...projectsData];
        updatedProjects[editIndex] = editedProject;
        setProjectsData(updatedProjects);
        setEditIndex(-1); // Завершаем режим редактирования
      } else {
        // Добавление нового проекта
        const newProject = {
          projectName: projectName,
          employees: selectedEmployeesIds.map((empId) => employees.find((emp) => emp.id === empId)),
        };
        setProjectsData([...projectsData, newProject]);
      }
      // Очистка полей формы после сохранения проекта
      setProjectName('');
      setSelectedEmployeesIds([]);
    }
  };

  // Обработчик редактирования проекта по индексу
  const handleEditProject = (index) => {
    const project = projectsData[index];
    setProjectName(project.projectName);
    setSelectedEmployeesIds(project.employees.map((emp) => emp.id));
    setEditIndex(index);
  };

  // Обработчик удаления проекта из массива
  const handleDeleteProject = (index) => {
    const updatedProjects = [...projectsData];
    updatedProjects.splice(index, 1);
    setProjectsData(updatedProjects);
    setEditIndex(-1); // Завершаем режим редактирования (если был активен)
  };

  // Обработчик изменения выбранных сотрудников
  const handleEmployeeSelectionChange = (e) => {
    const selectedEmpIds = Array.from(e.target.selectedOptions, (option) => parseInt(option.value));
    setSelectedEmployeesIds(selectedEmpIds);
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
            {selectedEmployeesIds.map((empId) => (
              <li key={empId}>{employees.find((emp) => emp.id === empId)?.name}</li>
            ))}
          </ul>
          <select
            multiple
            value={selectedEmployeesIds}
            onChange={handleEmployeeSelectionChange}
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
          {projectsData.map((project, index) => (
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
