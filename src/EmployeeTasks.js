import React, { useState } from 'react';

const EmployeeTasks = ({ employees, tasks }) => {
  const [sortOrder, setSortOrder] = useState('asc');

  // Функция для сортировки задач по дате создания
  const sortTasksByCreationDate = (tasks, sortOrder) => {
    const sortedTasks = [...tasks];

    sortedTasks.sort((a, b) => {
      const dateA = new Date(a.creationDate);
      const dateB = new Date(b.creationDate);

      if (sortOrder === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    return sortedTasks;
  };

  // Отображение задач для каждого сотрудника
  return (
    <div>
      <h2>Задачи по сотрудникам</h2>
      {employees.map((employee) => (
        <div key={employee}>
          <h3>Сотрудник: {employee}</h3>
          <ul>
            {sortTasksByCreationDate(tasks.filter((task) => task.responsibleEmployee === employee), sortOrder).map((task, index) => (
              <li key={index}>
                <p>Номер задачи: {task.taskNumber}</p>
                <p>Дата создания: {task.creationDate}</p>
                {/* Другие поля задачи */}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button type="button" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        Изменить порядок сортировки
      </button>
    </div>
  );
};

export default EmployeeTasks;
