const employees = [
    {
      id: 1,
      name: 'Даниил Ключников',
      projects: ['Project A', 'Project B'],
      tasks: [1, 2],
    },
    {
      id: 2,
      name: 'Мария Шарапова',
      projects: ['Project B'],
      tasks: [3],
    },
    {
      id: 3,
      name: 'Мария Арапова',
      projects: ['Project C'],
      tasks: [],
    },
  ];
  
  const projects = [
    {
      name: 'Project A',
      tasks: [1],
    },
    {
      name: 'Project B',
      tasks: [2, 3],
    },
    {
      name: 'Project C',
      tasks: [],
    },
  ];
  
  const tasks = [
    {
      id: 1,
      taskNumber: 'T001',
      creationDate: '2023-07-01',
      responsibleEmployeeId: 1,
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
      responsibleEmployeeId: 1,
      plannedCompletionDate: '2023-07-22',
      actualCompletionDate: null,
      taskName: 'Задача 2',
      taskText: 'Описание задачи 2',
      project: 'Project B',
      taskStatus: 'в работе',
    },
    {
      id: 3,
      taskNumber: 'T003',
      creationDate: '2023-07-05',
      responsibleEmployeeId: 2,
      plannedCompletionDate: '2023-07-15',
      actualCompletionDate: null,
      taskName: 'Задача 3',
      taskText: 'Описание задачи 3',
      project: 'Project B',
      taskStatus: 'в работе',
    },
  ];
  
  export { employees, projects, tasks };
  