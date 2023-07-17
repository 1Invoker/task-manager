import React from 'react';
import Chart from 'chart.js/auto';

const GanttChart = ({ tasks }) => {
const chartRef = React.useRef(null);

React.useEffect(() => {
if (tasks && tasks.length > 0) {
const ctx = chartRef.current.getContext('2d');


  // Подготовка данных для диаграммы
  const chartData = {
    labels: tasks.map((task) => task.name),
    datasets: [
      {
        label: 'Дата начала',
        backgroundColor: 'green',
        data: tasks.map((task) => ({
          x: task.startDate,
          y: task.name,
        })),
      },
      {
        label: 'Дата окончания',
        backgroundColor: 'red',
        data: tasks.map((task) => ({
          x: task.endDate,
          y: task.name,
        })),
      },
    ],
  };

  // Настройка параметров диаграммы
  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'D MMM',
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
          text: 'Задачи',
        },
      },
    },
  };

  // Создание диаграммы
  new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: chartOptions,
  });
}
}, [tasks]);

return <canvas ref={chartRef} />;
};

export default GanttChart;




