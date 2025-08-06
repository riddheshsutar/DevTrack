const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all tasks with optional status filter
router.get('/', async (req, res) => {
    try {
        const { status } = req.query;
        let query = 'SELECT * FROM tasks ORDER BY created_at DESC';
        let params = [];

        if (status && status !== 'all') {
            query = 'SELECT * FROM tasks WHERE status = ? ORDER BY created_at DESC';
            params = [status];
        }

        const [rows] = await db.execute(query, params);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Get task by ID
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ error: 'Failed to fetch task' });
    }
});

// Create new task
router.post('/', async (req, res) => {
    try {
        const { title, description, status = 'pending', priority = 'medium', due_date } = req.body;
        
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const [result] = await db.execute(
            'INSERT INTO tasks (title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?)',
            [title, description, status, priority, due_date || null]
        );

        const [newTask] = await db.execute('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
        res.status(201).json(newTask[0]);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// Update task
router.put('/:id', async (req, res) => {
    try {
        const { title, description, status, priority, due_date } = req.body;
        const taskId = req.params.id;

        // Check if task exists
        const [existingTask] = await db.execute('SELECT * FROM tasks WHERE id = ?', [taskId]);
        if (existingTask.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const [result] = await db.execute(
            'UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, due_date = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [title, description, status, priority, due_date || null, taskId]
        );

        const [updatedTask] = await db.execute('SELECT * FROM tasks WHERE id = ?', [taskId]);
        res.json(updatedTask[0]);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Failed to update task' });
    }
});

// Toggle task completion status
router.patch('/:id/toggle', async (req, res) => {
    try {
        const taskId = req.params.id;
        
        // Get current status
        const [currentTask] = await db.execute('SELECT status FROM tasks WHERE id = ?', [taskId]);
        if (currentTask.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const newStatus = currentTask[0].status === 'completed' ? 'pending' : 'completed';
        
        await db.execute(
            'UPDATE tasks SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [newStatus, taskId]
        );

        const [updatedTask] = await db.execute('SELECT * FROM tasks WHERE id = ?', [taskId]);
        res.json(updatedTask[0]);
    } catch (error) {
        console.error('Error toggling task:', error);
        res.status(500).json({ error: 'Failed to toggle task' });
    }
});

// Delete task
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await db.execute('DELETE FROM tasks WHERE id = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

module.exports = router; 