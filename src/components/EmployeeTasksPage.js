import React, { useState } from 'react';
import TaskForm from './TaskForm';

const EmployeeTasksPage = ({ employees, tasks, projects }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [sortByDate, setSortByDate] = useState(false);

  const handleEmployeeChange = (e) => {
    const selectedEmployeeId = parseInt(e.target.value);
    const employee = employees.find((emp) => emp.id === selectedEmployeeId);
    setSelectedEmployee(employee);
  };

  const handleSortByDate = () => {
    setSortByDate((prevState) => !prevState);
  };

  const getEmployeeTasks = () => {
    if (selectedEmployee) {
      return sortByDate
        ? tasks
            .filter((task) => task.responsibleEmployeeId === selectedEmployee.id)
            .sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate))
        : tasks.filter((task) => task.responsibleEmployeeId === selectedEmployee.id);
    }
    return [];
  };

  const employeeTaskList = getEmployeeTasks();

  return (
    <div>
      <h2>Страница задач для каждого сотрудника</h2>
      <div>
        <label>Выберите сотрудника:</label>
        <select value={selectedEmployee ? selectedEmployee.id : ''} onChange={handleEmployeeChange}>
          <option value="">Выберите сотрудника</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
      </div>
      {selectedEmployee && (
        <div>
          <h3>Задачи для сотрудника: {selectedEmployee.name}</h3>
          <div>
            <button onClick={handleSortByDate}>
              {sortByDate ? 'Отключить сортировку' : 'Сортировать по дате создания'}
            </button>
          </div>
          <ul>
            {employeeTaskList.map((task) => (
              <li key={task.id}>
                <p>Номер задачи: {task.taskNumber}</p>
                <p>Дата создания: {task.creationDate}</p>
                <p>Ответственный сотрудник: {selectedEmployee.name}</p>
                <p>Планируемая дата завершения: {task.plannedCompletionDate}</p>
                <p>Фактическая дата завершения: {task.actualCompletionDate || 'еще не завершено'}</p>
                <p>Название задачи: {task.taskName}</p>
                <p>Текст задачи: {task.taskText}</p>
                <p>Проект: {task.project}</p>
                <p>Статус задачи: {task.taskStatus}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmployeeTasksPage;
