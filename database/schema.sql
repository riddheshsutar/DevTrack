-- DevTrack Database Schema
CREATE DATABASE IF NOT EXISTS devtrack;
USE devtrack;

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    due_date DATE NULL
);

-- Insert sample data
INSERT INTO tasks (title, description, status, priority, due_date) VALUES
('Setup project structure', 'Initialize the DevTrack project with proper folder structure', 'completed', 'high', '2024-01-15'),
('Create database schema', 'Design and implement the MySQL database schema for tasks', 'completed', 'high', '2024-01-16'),
('Build REST API', 'Develop the Express.js backend API for task management', 'in_progress', 'high', '2024-01-20'),
('Design frontend UI', 'Create a modern and responsive React frontend', 'pending', 'medium', '2024-01-25'),
('Add authentication', 'Implement user authentication and authorization', 'pending', 'low', '2024-02-01'),
('Deploy application', 'Deploy the application to production environment', 'pending', 'medium', '2024-02-10'); 