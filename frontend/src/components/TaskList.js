import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onToggle, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggle(task.id)}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </div>
  );
};

export default TaskList; 