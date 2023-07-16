import React, { useState } from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks }) => {
  const [sortByDate, setSortByDate] = useState(false);

  // Функция для сортировки задач по дате создания
  const sortTasksByDate = (taskA, taskB) => {
    return new Date(taskA.creationDate) - new Date(taskB.creationDate);
  };

  // Отсортированный список задач
  const sortedTasks = sortByDate ? tasks.sort(sortTasksByDate) : tasks;

  // Получение уникальных сотрудников
  const employees = [...new Set(tasks.map((task) => task.responsibleEmployee))];

  // Фильтрация задач по сотруднику
  const filterTasksByEmployee = (employee) => {
    return tasks.filter((task) => task.responsibleEmployee === employee);
  };

  return (
    <div>
      <h2>Задачи по сотрудникам</h2>
      <div>
        <label>Сортировать по дате создания:</label>
        <input
          type="checkbox"
          checked={sortByDate}
          onChange={() => setSortByDate(!sortByDate)}
        />
      </div>
      {employees.map((employee) => (
        <div key={employee}>
          <h3>{employee}</h3>
          <ul>
            {filterTasksByEmployee(employee).map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
