import React from 'react';
import GanttChart from './GanttChart';

const TaskList = () => {
  const tasks = [
    {
      id: 1,
      name: 'Задача 1',
      startDate: '2023-07-01',
      endDate: '2023-07-10',
    },
    {
      id: 2,
      name: 'Задача 2',
      startDate: '2023-07-05',
      endDate: '2023-07-15',
    },
    {
        id: 2,
        name: 'Задача 3',
        startDate: '2021-07-05',
        endDate: '2023-07-15',
      },
    
  ];

  return (
    <div>
      {/* Рендер компонента GanttChart и передача массива задач tasks */}
      <GanttChart tasks={tasks} />
    </div>
  );
};

export default TaskList;
