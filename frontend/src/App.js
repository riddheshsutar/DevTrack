import React, { useState, useEffect } from 'react';
import { taskAPI } from './services/api';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Filter tasks when filter or tasks change
  useEffect(() => {
    const filterTasks = () => {
      if (filter === 'all') {
        setFilteredTasks(tasks);
      } else {
        setFilteredTasks(tasks.filter(task => task.status === filter));
      }
    };
    filterTasks();
  }, [tasks, filter]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskAPI.getTasks();
      setTasks(response.data);
    } catch (err) {
      setError('Failed to load tasks. Please make sure the backend server is running.');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };



  const handleCreateTask = async (taskData) => {
    try {
      const response = await taskAPI.createTask(taskData);
      setTasks(prev => [response.data, ...prev]);
      setIsFormOpen(false);
      setError(null);
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const response = await taskAPI.updateTask(id, taskData);
      setTasks(prev => prev.map(task => 
        task.id === id ? response.data : task
      ));
      setEditingTask(null);
      setError(null);
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const handleToggleTask = async (id) => {
    try {
      const response = await taskAPI.toggleTask(id);
      setTasks(prev => prev.map(task => 
        task.id === id ? response.data : task
      ));
      setError(null);
    } catch (err) {
      setError('Failed to toggle task');
      console.error('Error toggling task:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(id);
        setTasks(prev => prev.filter(task => task.id !== id));
        setError(null);
      } catch (err) {
        setError('Failed to delete task');
        console.error('Error deleting task:', err);
      }
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'completed').length;
    const pending = tasks.filter(task => task.status === 'pending').length;
    const inProgress = tasks.filter(task => task.status === 'in_progress').length;
    
    return { total, completed, pending, inProgress };
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="app">
      <Header 
        stats={getTaskStats()}
        onNewTask={() => setIsFormOpen(true)}
      />
      
      {error && (
        <div className="error-banner">
          <p>{error}</p>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <main className="main-content">
        <div className="container">
          <FilterBar 
            currentFilter={filter}
            onFilterChange={setFilter}
            taskStats={getTaskStats()}
          />
          
          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggleTask}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
          
          {filteredTasks.length === 0 && !loading && (
            <div className="empty-state">
              <h3>No tasks found</h3>
              <p>
                {filter === 'all' 
                  ? "Get started by creating your first task!" 
                  : `No ${filter.replace('_', ' ')} tasks found.`
                }
              </p>
              {filter === 'all' && (
                <button 
                  className="btn btn-primary"
                  onClick={() => setIsFormOpen(true)}
                >
                  Create Task
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      {isFormOpen && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? 
            (data) => handleUpdateTask(editingTask.id, data) : 
            handleCreateTask
          }
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}

export default App; 