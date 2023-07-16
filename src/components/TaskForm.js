import React, { useState } from 'react';

const TaskForm = () => {
  const [tasks, setTasks] = useState([]);
  const [taskNumber, setTaskNumber] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [responsibleEmployee, setResponsibleEmployee] = useState('');
  const [plannedCompletionDate, setPlannedCompletionDate] = useState('');
  const [actualCompletionDate, setActualCompletionDate] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskText, setTaskText] = useState('');
  const [project, setProject] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'taskNumber') {
      setTaskNumber(value);
    } else if (name === 'creationDate') {
      setCreationDate(value);
    } else if (name === 'responsibleEmployee') {
      setResponsibleEmployee(value);
    } else if (name === 'plannedCompletionDate') {
      setPlannedCompletionDate(value);
    } else if (name === 'actualCompletionDate') {
      setActualCompletionDate(value);
    } else if (name === 'taskName') {
      setTaskName(value);
    } else if (name === 'taskText') {
      setTaskText(value);
    } else if (name === 'project') {
      setProject(value);
    } else if (name === 'taskStatus') {
      setTaskStatus(value);
    }
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== -1) {
      // Редактирование задачи
      const editedTask = {
        taskNumber: taskNumber,
        creationDate: creationDate,
        responsibleEmployee: responsibleEmployee,
        plannedCompletionDate: plannedCompletionDate,
        actualCompletionDate: actualCompletionDate,
        taskName: taskName,
        taskText: taskText,
        project: project,
        taskStatus: taskStatus,
      };
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = editedTask;
      setTasks(updatedTasks);
      setEditIndex(-1);
    } else {
      // Логика сохранения данных задачи
      const newTask = {
        taskNumber: taskNumber,
        creationDate: creationDate,
        responsibleEmployee: responsibleEmployee,
        plannedCompletionDate: plannedCompletionDate,
        actualCompletionDate: actualCompletionDate,
        taskName: taskName,
        taskText: taskText,
        project: project,
        taskStatus: taskStatus,
      };
      setTasks([...tasks, newTask]);
    }

    // Очистка полей формы после сохранения задачи
    setTaskNumber('');
    setCreationDate('');
    setResponsibleEmployee('');
    setPlannedCompletionDate('');
    setActualCompletionDate('');
    setTaskName('');
    setTaskText('');
    setProject('');
    setTaskStatus('');
  };

  const handleEditTask = (index) => {
    const task = tasks[index];
    setTaskNumber(task.taskNumber);
    setCreationDate(task.creationDate);
    setResponsibleEmployee(task.responsibleEmployee);
    setPlannedCompletionDate(task.plannedCompletionDate);
    setActualCompletionDate(task.actualCompletionDate);
    setTaskName(task.taskName);
    setTaskText(task.taskText);
    setProject(task.project);
    setTaskStatus(task.taskStatus);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleCancelEdit = () => {
    setTaskNumber('');
    setCreationDate('');
    setResponsibleEmployee('');
    setPlannedCompletionDate('');
    setActualCompletionDate('');
    setTaskName('');
    setTaskText('');
    setProject('');
    setTaskStatus('');
    setEditIndex(-1);
  };

  const handleSortOrderChange = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
  };

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

  const sortedTasks = sortTasksByCreationDate(tasks, sortOrder);

  return (
    <div>
      <h2>Добавить задачу</h2>
      <form onSubmit={handleTaskSubmit}>
        {/* Форма задачи */}
        <div>
          <label>Номер задачи:</label>
          <input
            type="text"
            name="taskNumber"
            value={taskNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Дата создания:</label>
          <input
            type="date"
            name="creationDate"
            value={creationDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Ответственный сотрудник:</label>
          <input
            type="text"
            name="responsibleEmployee"
            value={responsibleEmployee}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Планируемая дата завершения:</label>
          <input
            type="date"
            name="plannedCompletionDate"
            value={plannedCompletionDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Фактическая дата завершения:</label>
          <input
            type="date"
            name="actualCompletionDate"
            value={actualCompletionDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Название задачи:</label>
          <input
            type="text"
            name="taskName"
            value={taskName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Текст задачи:</label>
          <textarea
            name="taskText"
            value={taskText}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label>Проект:</label>
          <input
            type="text"
            name="project"
            value={project}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Статус задачи:</label>
          <select
            name="taskStatus"
            value={taskStatus}
            onChange={handleInputChange}
          >
            <option value="новая">Новая</option>
            <option value="в работе">В работе</option>
            <option value="завершена">Завершена</option>
          </select>
        </div>

        {/* Кнопки */}
        {editIndex !== -1 ? (
          <div>
            <button type="button" onClick={handleCancelEdit}>
              Отменить редактирование
            </button>
            <button type="submit">Сохранить изменения</button>
          </div>
        ) : (
          <button type="submit">Добавить задачу</button>
        )}
      </form>

      {/* Список задач */}
      <div>
        <h3>Список задач</h3>
        <button type="button" onClick={handleSortOrderChange}>
          Изменить порядок сортировки
        </button>
        <ul>
          {sortedTasks.map((task, index) => (
            <li key={index}>
              <p>Номер задачи: {task.taskNumber}</p>
              <p>Дата создания: {task.creationDate}</p>
              <p>Ответственный сотрудник: {task.responsibleEmployee}</p>
              <p>Планируемая дата завершения: {task.plannedCompletionDate}</p>
              <p>Фактическая дата завершения: {task.actualCompletionDate}</p>
              <p>Название задачи: {task.taskName}</p>
              <p>Текст задачи: {task.taskText}</p>
              <p>Проект: {task.project}</p>
              <p>Статус задачи: {task.taskStatus}</p>
              <button type="button" onClick={() => handleEditTask(index)}>
                Редактировать
              </button>
              <button type="button" onClick={() => handleDeleteTask(index)}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskForm;
