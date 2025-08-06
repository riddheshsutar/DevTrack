import React from 'react';
import { Filter, CheckCircle, Clock, AlertCircle, List } from 'lucide-react';
import './FilterBar.css';

const FilterBar = ({ currentFilter, onFilterChange, taskStats }) => {
  const filters = [
    { key: 'all', label: 'All Tasks', icon: List, count: taskStats.total },
    { key: 'pending', label: 'Pending', icon: AlertCircle, count: taskStats.pending },
    { key: 'in_progress', label: 'In Progress', icon: Clock, count: taskStats.inProgress },
    { key: 'completed', label: 'Completed', icon: CheckCircle, count: taskStats.completed },
  ];

  return (
    <div className="filter-bar">
      <div className="filter-header">
        <Filter size={20} />
        <span>Filter Tasks</span>
      </div>
      
      <div className="filter-buttons">
        {filters.map(({ key, label, icon: Icon, count }) => (
          <button
            key={key}
            className={`filter-btn ${currentFilter === key ? 'active' : ''}`}
            onClick={() => onFilterChange(key)}
          >
            <Icon size={16} />
            <span className="filter-label">{label}</span>
            <span className="filter-count">{count}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar; 