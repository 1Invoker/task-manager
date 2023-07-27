import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';

const GanttChart = ({ tasks }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const ctx = chartRef.current.getContext('2d');

      // Предварительно удаляем предыдущий экземпляр диаграммы (если есть)
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Подготовка данных для статистики
      const statusCounts = {
        новая: 0,
        в_работе: 0,
        завершена: 0,
      };

      tasks.forEach((task) => {
        if (task.taskStatus === 'новая') {
          statusCounts.новая++;
        } else if (task.taskStatus === 'в работе') {
          statusCounts.в_работе++;
        } else if (task.taskStatus === 'завершена') {
          statusCounts.завершена++;
        }
      });

      // Подготовка данных для диаграммы
      const chartData = {
        labels: ['Новая', 'В работе', 'Завершена'],
        datasets: [
          {
            label: 'Статус задачи',
            backgroundColor: ['yellow', 'blue', 'green'],
            data: [statusCounts.новая, statusCounts.в_работе, statusCounts.завершена],
          },
        ],
      };

      // Настройка параметров диаграммы
      const chartOptions = {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Количество задач',
            },
          },
        },
      };

      // Создание нового экземпляра диаграммы
      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions,
      });
    }
  }, [tasks]);

  return <canvas ref={chartRef} />;
};

export default GanttChart;



