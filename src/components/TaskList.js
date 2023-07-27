import React from 'react';

const TaskList = ({ tasks, employees, projects }) => {
  const sortedTasks = sortTasksByCreationDate(tasks, 'asc');

  // Функция для сортировки задач по дате создания
  const sortTasksByCreationDate = (tasks, sortOrder) => {
    const sortedTasks = [...tasks];

    sortedTasks.sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);

      if (sortOrder === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    return sortedTasks;
  };

  return (
    <div>
      <h2>Список задач</h2>
      <ul>
        {sortedTasks.map((task) => (
          <li key={task.id}>
            <p>Номер задачи: {task.name}</p>
            <p>Дата создания: {task.startDate}</p>
            <p>Ответственный сотрудник: {employees.find((emp) => emp.id === task.employeeId)?.name}</p>
            <p>Планируемая дата завершения: {task.endDate}</p>
            <p>Проект: {projects.find((proj) => proj.id === task.projectId)?.name}</p>
            <p>Статус задачи: {task.taskStatus}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
