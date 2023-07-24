// import React from 'react';
// import moment from 'moment';

// const EmployeeStats = () => {
//   // Eсть массив задач tasks
//   const tasks = [
//     {
//       id: 1,
//       taskNumber: 'T001',
//       creationDate: '2023-07-01',
//       responsibleEmployee: 'Даниил Ключников',
//       plannedCompletionDate: '2023-07-10',
//       actualCompletionDate: '2023-07-09',
//       taskName: 'Задача 1',
//       taskText: 'Описание задачи 1',
//       project: 'Project A',
//       taskStatus: 'завершена',
//     },
//     {
//       id: 2,
//       taskNumber: 'T002',
//       creationDate: '2023-07-02',
//       responsibleEmployee: 'Мария Шарапова',
//       plannedCompletionDate: '2023-07-22',
//       actualCompletionDate: null,
//       taskName: 'Задача 2',
//       taskText: 'Описание задачи 2',
//       project: 'Project B',
//       taskStatus: 'в работе',
//     },
//     {
//       id: 2,
//       taskNumber: 'T0022',
//       creationDate: '2023-07-02',
//       responsibleEmployee: 'Мария Арапова',
//       plannedCompletionDate: '2023-07-22',
//       actualCompletionDate: '2023-07-20',
//       taskName: 'Задача 2',
//       taskText: 'Описание задачи 2',
//       project: 'Project B',
//       taskStatus: 'в работе',
//     },
//   ];

//   // Создание объекта для хранения статистики производительности по сотрудникам
//   const employeeStats = {};

//   // Расчет статистики производительности
//   tasks.forEach((task) => {
//     const start = moment(task.creationDate);
//     const end = task.actualCompletionDate
//       ? moment(task.actualCompletionDate)
//       : moment();

//     const duration = moment.duration(end.diff(start)).asDays();
//     const employee = task.responsibleEmployee;

//     if (!employeeStats[employee]) {
//       employeeStats[employee] = 0;
//     }

//     employeeStats[employee] += duration;
//   });

//   return (
//     <div>
//       <h2>Статистика производительности сотрудников</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Сотрудник</th>
//             <th>Производительность (в днях)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.entries(employeeStats).map(([employee, productivity]) => (
//             <tr key={employee}>
//               <td>{employee}</td>
//               <td>{productivity}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EmployeeStats;
import React from 'react';
import moment from 'moment';

const EmployeeStats = () => {
  // Eсть массив задач tasks
  const tasks = [
    {
            id: 1,
            taskNumber: 'T001',
            creationDate: '2023-07-01',
            responsibleEmployee: 'Даниил Ключников',
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
            responsibleEmployee: 'Мария Шарапова',
            plannedCompletionDate: '2023-07-22',
            actualCompletionDate: null,
            taskName: 'Задача 2',
            taskText: 'Описание задачи 2',
            project: 'Project B',
            taskStatus: 'в работе',
          },
          {
            id: 2,
            taskNumber: 'T0022',
            creationDate: '2023-07-02',
            responsibleEmployee: 'Мария Арапова',
            plannedCompletionDate: '2023-07-22',
            actualCompletionDate: '2023-07-20',
            taskName: 'Задача 2',
            taskText: 'Описание задачи 2',
            project: 'Project B',
            taskStatus: 'в работе',
          },
  ];

  // Расчет статистики производительности
  const employeeStats = tasks.reduce((acc, task) => {
    const start = moment(task.creationDate);
    const end = task.actualCompletionDate
      ? moment(task.actualCompletionDate)
      : moment();

    const duration = moment.duration(end.diff(start)).asDays();
    const employee = task.responsibleEmployee;

    // Проверяем, есть ли уже запись для этого сотрудника
    const existingEmployee = acc.find((entry) => entry.employee === employee);

    if (existingEmployee) {
      // Если запись есть, увеличиваем ее производительность
      existingEmployee.productivity += duration;
    } else {
      // Если записи нет, добавляем новую запись в массив
      acc.push({ employee, productivity: duration });
    }

    return acc;
  }, []);

  // Сортировка по производительности (по убыванию)
  employeeStats.sort((a, b) => b.productivity - a.productivity);

  return (
    <div>
      <h2>Статистика производительности сотрудников</h2>
      <table>
        <thead>
          <tr>
            <th>Сотрудник</th>
            <th>Производительность (в днях)</th>
          </tr>
        </thead>
        <tbody>
          {employeeStats.map(({ employee, productivity }) => (
            <tr key={employee}>
              <td>{employee}</td>
              <td>{productivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeStats;
