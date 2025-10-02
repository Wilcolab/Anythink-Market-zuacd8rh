const express = require('express');
const router = express.Router();

// In-memory task storage (matching Python server)
const tasks = [
    "Write a diary entry from the future",
    "Create a time machine from a cardboard box",
    "Plan a trip to the dinosaurs",
    "Draw a futuristic city",
    "List items to bring on a time-travel adventure"
];

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
        
        tasks.push(text);
        console.log(`Task added: "${text}". Total tasks: ${tasks.length}`);
        res.status(201).json({ message: 'Task added successfully' });
    } catch (error) {
        console.error('Error in POST /tasks:', error);
        throw error;
    }
});

module.exports = router;

