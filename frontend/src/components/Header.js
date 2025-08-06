import React from 'react';
import { Plus, CheckCircle, Clock, AlertCircle, List } from 'lucide-react';
import './Header.css';

const Header = ({ stats, onNewTask }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            <h1 className="app-title">
              <List className="app-icon" />
              DevTrack
            </h1>
            <p className="app-subtitle">Task tracker for developers</p>
          </div>
          
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-icon">
                <List size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-number">{stats.total}</span>
                <span className="stat-label">Total</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon completed">
                <CheckCircle size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-number">{stats.completed}</span>
                <span className="stat-label">Completed</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon in-progress">
                <Clock size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-number">{stats.inProgress}</span>
                <span className="stat-label">In Progress</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon pending">
                <AlertCircle size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-number">{stats.pending}</span>
                <span className="stat-label">Pending</span>
              </div>
            </div>
          </div>
          
          <div className="header-right">
            <button className="btn btn-primary" onClick={onNewTask}>
              <Plus size={18} />
              New Task
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 