import React from 'react';
import moment from 'moment';
import { Chart } from 'chart.js';


const GanttChart = () => {
  //  массив задач tasks
  const tasks = [
    {
      id: 1,
      taskNumber: 'T001',
      creationDate: '2023-07-01',
      responsibleEmployee: 'John Doe',
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
      responsibleEmployee: 'Jane Smith',
      plannedCompletionDate: '2023-07-15',
      actualCompletionDate: null,
      taskName: 'Задача 2',
      taskText: 'Описание задачи 2',
      project: 'Project B',
      taskStatus: 'в работе',
    },
  ];

  // интервал дат и статус для диаграммы Ганта
  const selectedStartDate = '2023-07-01';
  const selectedEndDate = '2023-07-15';
  const selectedStatus = 'в работе';

  // Фильтрация задач по выбранному интервалу дат и статусу
  const filteredTasks = tasks.filter(
    (task) =>
      moment(task.creationDate).isBetween(selectedStartDate, selectedEndDate) &&
      task.taskStatus === selectedStatus
  );

  // Создание массива для данных диаграммы Ганта
  const chartData = filteredTasks.map((task) => {
    const start = moment(task.creationDate).format('YYYY-MM-DD');
    const end = task.actualCompletionDate
      ? moment(task.actualCompletionDate).format('YYYY-MM-DD')
      : moment(task.plannedCompletionDate).format('YYYY-MM-DD');

    return {
      x: start,
      y: task.responsibleEmployee,
      z: end,
      v: task.taskName,
    };
  });

  const chartRef = React.useRef(null);

  React.useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        datasets: [
          {
            label: 'Задачи',
            data: chartData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                day: 'YYYY-MM-DD',
              },
            },
            title: {
              display: true,
              text: 'Дата',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Сотрудник',
            },
          },
        },
      },
    });
  }, [chartData]);

  return (
    <div>
      <h2>Диаграмма Ганта</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

export default GanttChart;
