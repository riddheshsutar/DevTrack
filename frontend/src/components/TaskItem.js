import React from 'react';
import { CheckCircle, Circle, Clock, Edit2, Trash2, Calendar } from 'lucide-react';
import './TaskItem.css';

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <CheckCircle className="status-icon completed" size={20} />;
      case 'in_progress':
        return <Clock className="status-icon in-progress" size={20} />;
      default:
        return <Circle className="status-icon pending" size={20} />;
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high':
        return '#dc3545';
      case 'medium':
        return '#ffc107';
      case 'low':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = () => {
    if (!task.due_date || task.status === 'completed') return false;
    const today = new Date();
    const dueDate = new Date(task.due_date);
    return dueDate < today;
  };

  return (
    <div className={`task-item ${task.status} ${isOverdue() ? 'overdue' : ''}`}>
      <div className="task-header">
        <button 
          className="status-button" 
          onClick={onToggle}
          title={`Mark as ${task.status === 'completed' ? 'pending' : 'completed'}`}
        >
          {getStatusIcon()}
        </button>
        
        <div className="task-priority">
          <div 
            className="priority-indicator"
            style={{ backgroundColor: getPriorityColor() }}
            title={`${task.priority} priority`}
          />
        </div>
      </div>

      <div className="task-content">
        <h3 className={`task-title ${task.status === 'completed' ? 'completed' : ''}`}>
          {task.title}
        </h3>
        
        {task.description && (
          <p className="task-description">
            {task.description}
          </p>
        )}

        <div className="task-meta">
          <span className={`task-status-badge ${task.status}`}>
            {task.status === 'in_progress' ? 'In Progress' : 
             task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </span>
          
          <span className={`task-priority-badge ${task.priority}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          
          {task.due_date && (
            <span className={`task-due-date ${isOverdue() ? 'overdue' : ''}`}>
              <Calendar size={14} />
              {formatDate(task.due_date)}
            </span>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button 
          className="action-btn edit-btn" 
          onClick={onEdit}
          title="Edit task"
        >
          <Edit2 size={16} />
        </button>
        <button 
          className="action-btn delete-btn" 
          onClick={onDelete}
          title="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="task-timestamps">
        <small>Created: {formatDate(task.created_at)}</small>
        {task.updated_at !== task.created_at && (
          <small>Updated: {formatDate(task.updated_at)}</small>
        )}
      </div>
    </div>
  );
};

export default TaskItem; 