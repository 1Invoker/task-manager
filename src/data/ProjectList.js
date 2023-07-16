// ProjectList.js
import React from 'react';
import { ProjectItem } from './ProjectItem';

const ProjectList = ({ projects }) => {
  return (
    <div>
      <h2>Список проектов</h2>
      <ul>
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;

// ProjectItem.js
import React from 'react';

export const ProjectItem = ({ project }) => {
  return (
    <li>
      <h3>{project.name}</h3>
      <p>Сотрудники: {project.employees.join(', ')}</p>
    </li>
  );
};
