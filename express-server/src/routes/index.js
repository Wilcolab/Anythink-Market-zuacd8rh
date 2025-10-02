const express = require('express');
const router = express.Router();
const { listTasks, addTask, deleteTaskByIndex } = require('../tasks/store');

// Root endpoint
router.get('/', (req, res) => {
    try {
        res.json("Hello World");
    } catch (error) {
        console.error('Error in GET /:', error);
        throw error;
    }
});

// Get all tasks
router.get('/tasks', (req, res) => {
    try {
        const tasks = listTasks();
        console.log(`Fetching ${tasks.length} tasks`);
        res.json({ tasks });
    } catch (error) {
        console.error('Error in GET /tasks:', error);
        throw error;
    }
});

// Add a new task
router.post('/tasks', (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            console.warn('POST /tasks: Missing text field');
            return res.status(400).json({ error: 'Missing required field: text' });
        }
        addTask(text);
        const tasks = listTasks();
        console.log(`Task added: "${text}". Total tasks: ${tasks.length}`);
        res.status(201).json({ message: 'Task added successfully' });
    } catch (error) {
        console.error('Error in POST /tasks:', error);
        throw error;
    }
});

// DELETE /tasks/:index - remove a task by array index
router.delete('/tasks/:index', (req, res) => {
    try {
        const raw = req.params.index;
        if (!/^\d+$/.test(raw)) {
            console.warn(`DELETE /tasks/${raw}: Non-numeric index`);
            return res.status(400).json({ error: 'Index must be a non-negative integer' });
        }
        const idx = parseInt(raw, 10);
        const removed = deleteTaskByIndex(idx);
        if (removed === null) {
            console.warn(`DELETE /tasks/${idx}: Not found`);
            return res.status(404).json({ error: 'Task not found' });
        }
        const tasks = listTasks();
        console.log(`Deleted task at index ${idx}: "${removed}". Remaining: ${tasks.length}`);
        return res.status(204).send();
    } catch (error) {
        console.error('Error in DELETE /tasks/:index:', error);
        throw error;
    }
});

module.exports = router;

