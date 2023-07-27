import React from 'react';
import moment from 'moment';

const EmployeeStats = ({ tasks, employees }) => {
  // Функция для расчета производительности сотрудника
  const calculateProductivity = (employeeId) => {
    const tasksForEmployee = tasks.filter((task) => task.responsibleEmployeeId === employeeId);

    let totalProductivity = 0;
    tasksForEmployee.forEach((task) => {
      const start = moment(task.creationDate);
      const end = moment(task.actualCompletionDate || task.plannedCompletionDate);
      const duration = moment.duration(end.diff(start)).asDays();
      totalProductivity += duration;
    });

    return totalProductivity;
  };

  const employeeStats = employees.map((employee) => ({
    employee: employee.name,
    productivity: calculateProductivity(employee.id),
  }));

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
