import React from 'react';
import moment from 'moment';

const TaskList = () => {
 
  const tasks = [
    {
      id: 1,
      taskNumber: 'T001',
      creationDate: '2023-07-01',
      responsibleEmployee: 'Даниил',
      plannedCompletionDate: '2023-07-10',
      actualCompletionDate: '2023-07-09',
      taskName: 'Задача 1',
      taskText: 'Описание задачи 1',
      project: 'Project A',
      taskStatus: 'завершена',
    },
    {
      id: 2,
      taskNumber: 'T002',
      creationDate: '2023-07-02',
      responsibleEmployee: 'Шарапова',
      plannedCompletionDate: '2023-07-15',
      actualCompletionDate: null,
      taskName: 'Задача 2',
      taskText: 'Описание задачи 2',
      project: 'Project B',
      taskStatus: 'в работе',
    },
  ];

  return (
    <div>
      <h2>Список задач по сотрудникам</h2>
      <table>
        <thead>
          <tr>
            <th>Номер задачи</th>
            <th>Дата создания</th>
            <th>Ответственный сотрудник</th>
            <th>Планируемая дата завершения</th>
            <th>Фактическая дата завершения</th>
            <th>Название задачи</th>
            <th>Проект</th>
            <th>Статус задачи</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.taskNumber}</td>
              <td>{moment(task.creationDate).format('YYYY-MM-DD')}</td>
              <td>{task.responsibleEmployee}</td>
              <td>{moment(task.plannedCompletionDate).format('YYYY-MM-DD')}</td>
              <td>
                {task.actualCompletionDate
                  ? moment(task.actualCompletionDate).format('YYYY-MM-DD')
                  : '-'}
              </td>
              <td>{task.taskName}</td>
              <td>{task.project}</td>
              <td>{task.taskStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
