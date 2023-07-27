import React, { useState } from 'react';

const TaskForm = ({ employees, projects }) => {
  const [tasks, setTasks] = useState([]);
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

  // Обработчик изменения значений в полях ввода формы
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Обновляем соответствующее состояние в зависимости от имени поля ввода
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

  // Обработчик отправки формы задачи (добавление или редактирование)
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
        // Редактирование существующей задачи
        const editedTask = {
          taskNumber: taskNumber,
          creationDate: creationDate,
          responsibleEmployee: selectedEmployee,
          plannedCompletionDate: plannedCompletionDate,
          actualCompletionDate: actualCompletionDate,
          taskName: taskName,
          taskText: taskText,
          project: selectedProject.name,
          taskStatus: taskStatus,
        };
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = editedTask;
        setTasks(updatedTasks);
        setEditIndex(-1); // Завершаем режим редактирования
      } else {
        // Добавление новой задачи
        const newTask = {
          taskNumber: taskNumber,
          creationDate: creationDate,
          responsibleEmployee: selectedEmployee,
          plannedCompletionDate: plannedCompletionDate,
          actualCompletionDate: actualCompletionDate,
          taskName: taskName,
          taskText: taskText,
          project: selectedProject.name,
          taskStatus: taskStatus,
        };
        setTasks([...tasks, newTask]);
      }
      // Очистка полей формы после сохранения задачи
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

  // Обработчик редактирования задачи по индексу
  const handleEditTask = (index) => {
    const task = tasks[index];
    setTaskNumber(task.taskNumber);
    setCreationDate(task.creationDate);
    setSelectedEmployee(employees.find((employee) => employee.id === task.responsibleEmployee.id));
    setPlannedCompletionDate(task.plannedCompletionDate);
    setActualCompletionDate(task.actualCompletionDate);
    setTaskName(task.taskName);
    setTaskText(task.taskText);
    setSelectedProject(projects.find((project) => project.name === task.project));
    setTaskStatus(task.taskStatus);
    setEditIndex(index);
  };

  // Обработчик удаления задачи из массива
  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setEditIndex(-1); // Завершаем режим редактирования (если был активен)
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
          {tasks.map((task, index) => (
            <li key={task.id}>
              <p>Номер задачи: {task.taskNumber}</p>
              <p>Дата создания: {task.creationDate}</p>
              <p>Ответственный сотрудник: {task.responsibleEmployee.name}</p>
              <p>Планируемая дата завершения: {task.plannedCompletionDate}</p>
              <p>Фактическая дата завершения: {task.actualCompletionDate}</p>
              <p>Название задачи: {task.taskName}</p>
              <p>Текст задачи: {task.taskText}</p>
              <p>Проект: {task.project}</p>
              <p>Статус задачи: {task.taskStatus}</p>
              <button onClick={() => handleEditTask(index)}>Редактировать</button>
              <button onClick={() => handleDeleteTask(task.id)}>Удалить</button>
              {editIndex === index && (
                <div>
                  {/* Форма для редактирования задачи */}
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
