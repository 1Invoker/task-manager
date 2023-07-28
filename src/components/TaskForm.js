import React, { useState } from 'react';
import { employees, projects, tasks, updateTasksData } from './data';

const TaskForm = () => {
  const [tasksData, setTasksData] = useState(tasks);
  const [taskNumber, setTaskNumber] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [plannedCompletionDate, setPlannedCompletionDate] = useState('');
  const [actualCompletionDate, setActualCompletionDate] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskText, setTaskText] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [taskStatus, setTaskStatus] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'taskNumber') {
      setTaskNumber(value);
    } else if (name === 'creationDate') {
      setCreationDate(value);
    } else if (name === 'plannedCompletionDate') {
      setPlannedCompletionDate(value);
    } else if (name === 'actualCompletionDate') {
      setActualCompletionDate(value);
    } else if (name === 'taskName') {
      setTaskName(value);
    } else if (name === 'taskText') {
      setTaskText(value);
    } else if (name === 'taskStatus') {
      setTaskStatus(value);
    }
  };

  const handleAddTask = (newTask) => {
    setTasksData([...tasksData, newTask]);
    updateTasksData([...tasksData, newTask]);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (
      taskNumber &&
      creationDate &&
      selectedEmployee &&
      plannedCompletionDate &&
      taskName &&
      selectedProject &&
      taskStatus
    ) {
      if (editIndex !== -1) {
        const editedTask = {
          id: tasksData[editIndex].id,
          taskNumber: taskNumber,
          creationDate: creationDate,
          responsibleEmployeeId: selectedEmployee.id,
          plannedCompletionDate: plannedCompletionDate,
          actualCompletionDate: actualCompletionDate || null,
          taskName: taskName,
          taskText: taskText,
          project: selectedProject.name,
          taskStatus: taskStatus,
        };
        const updatedTasks = [...tasksData];
        updatedTasks[editIndex] = editedTask;
        setTasksData(updatedTasks);
        updateTasksData(updatedTasks);
        setEditIndex(-1);
      } else {
        const newTask = {
          id: tasksData.length + 1,
          taskNumber: taskNumber,
          creationDate: creationDate,
          responsibleEmployeeId: selectedEmployee.id,
          plannedCompletionDate: plannedCompletionDate,
          actualCompletionDate: actualCompletionDate || null,
          taskName: taskName,
          taskText: taskText,
          project: selectedProject.name,
          taskStatus: taskStatus,
        };
        handleAddTask(newTask);
      }
      setTaskNumber('');
      setCreationDate('');
      setSelectedEmployee(null);
      setPlannedCompletionDate('');
      setActualCompletionDate('');
      setTaskName('');
      setTaskText('');
      setSelectedProject(null);
      setTaskStatus('');
    }
  };

  const handleEditTask = (index) => {
    const task = tasksData[index];
    setTaskNumber(task.taskNumber);
    setCreationDate(task.creationDate);
    setSelectedEmployee(employees.find((employee) => employee.id === task.responsibleEmployeeId));
    setPlannedCompletionDate(task.plannedCompletionDate);
    setActualCompletionDate(task.actualCompletionDate || '');
    setTaskName(task.taskName);
    setTaskText(task.taskText);
    setSelectedProject(projects.find((project) => project.name === task.project));
    setTaskStatus(task.taskStatus);
    setEditIndex(index);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasksData.filter((task) => task.id !== id);
    setTasksData(updatedTasks);
    updateTasksData(updatedTasks);
    setEditIndex(-1);
  };

  return (
    <div>
      <h2>Добавить задачу</h2>
      <form onSubmit={handleTaskSubmit}>
        <div>
          <label>Номер задачи:</label>
          <input type="text" name="taskNumber" value={taskNumber} onChange={handleInputChange} />
        </div>
        <div>
          <label>Дата создания:</label>
          <input type="date" name="creationDate" value={creationDate} onChange={handleInputChange} />
        </div>
        <div>
          <label>Ответственный сотрудник:</label>
          <select
            name="selectedEmployee"
            value={selectedEmployee ? selectedEmployee.id : ''}
            onChange={(e) =>
              setSelectedEmployee(employees.find((employee) => employee.id === parseInt(e.target.value)))
            }
          >
            <option value="">Выберите сотрудника</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
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
          <input type="text" name="taskName" value={taskName} onChange={handleInputChange} />
        </div>
        <div>
          <label>Текст задачи:</label>
          <textarea name="taskText" value={taskText} onChange={handleInputChange}></textarea>
        </div>
        <div>
          <label>Проект:</label>
          <select
            name="selectedProject"
            value={selectedProject ? selectedProject.name : ''}
            onChange={(e) =>
              setSelectedProject(projects.find((project) => project.name === e.target.value))
            }
          >
            <option value="">Выберите проект</option>
            {projects.map((project) => (
              <option key={project.name} value={project.name}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Статус задачи:</label>
          <select name="taskStatus" value={taskStatus} onChange={handleInputChange}>
            <option value="">Выберите статус</option>
            <option value="новая">Новая</option>
            <option value="в работе">В работе</option>
            <option value="завершена">Завершена</option>
          </select>
        </div>
        <button type="submit">Добавить задачу</button>
      </form>
      <div>
        <h3>Список задач</h3>
        <ul>
          {tasksData.map((task, index) => (
            <li key={task.id}>
              <p>Номер задачи: {task.taskNumber}</p>
              <p>Дата создания: {task.creationDate}</p>
              <p>
                Ответственный сотрудник:{' '}
                {employees.find((employee) => employee.id === task.responsibleEmployeeId)?.name}
              </p>
              <p>Планируемая дата завершения: {task.plannedCompletionDate}</p>
              <p>
                Фактическая дата завершения:{' '}
                {task.actualCompletionDate || 'еще не завершено'}
              </p>
              <p>Название задачи: {task.taskName}</p>
              <p>Текст задачи: {task.taskText}</p>
              <p>Проект: {task.project}</p>
              <p>Статус задачи: {task.taskStatus}</p>
              <button onClick={() => handleEditTask(index)}>Редактировать</button>
              <button onClick={() => handleDeleteTask(task.id)}>Удалить</button>
              {editIndex === index && (
                <div>
                  <button onClick={() => setEditIndex(-1)}>Отмена</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskForm;
