const express = require('express');
const cors = require('cors');
const server = express();
const db = require('./data/db-config.js');

server.use(express.json());
server.use(cors());

// Routes:
server.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the server!' });
});

/* ---------- CREATE ---------- */

// Adds task to the DB:
server.post('/tasks', async (req, res) => {
    try {
        console.log(req.body);
        const updatedTasks = await db.addTask(req.body);
        console.log(updatedTasks);
        res.status(201).json(updatedTasks);
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

/* ---------- READ ---------- */

// Fetches tasks from the DB:
server.get('/tasks', async (req, res) => {
    try {
        const tasks = await db.findTasks();
        return res.status(200).json(tasks);
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
});

// Fetches task specified by id from the DB:
server.get('/tasks/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const task = await db.findTasksById(id);
        if (task.length === 0) {
            return res.status(500).json('Error:  Task does not exist!');
        }
        return res.status(200).json(task);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

/* ---------- UPDATE ---------- */

// Toggles completed for task, styling with status will be done on front end:
server.put('/tasks/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const task = req.body;
        const taskName = task.task;
        const updatedTask = await db.updateTask(id, task);
        if (updatedTask === 1) {
            return res.status(200).json(`Your task #${id}, '${taskName}' has been updated!`);
        }
        return res.status(500).json('Error:  Task does not exist!');
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
});

/* ---------- DELETE ---------- */
// Updates tasklist by deleting completed tasks from the DB:
server.delete('/tasks', async (req, res) => {
    try {
        const updatedTasks = await db.clearCompletedTasks();
        return res.status(200).json(updatedTasks);
    }
    catch (err) {
        return res.status(500).json(err);
    }
});

server.delete('/tasks/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const updatedTasks = await db.deleteTask(id);
        return res.status(200).json({message: 'Task deleted!'});
    }
    catch (err) {
        return res.status(500).json(err);
    }
});


module.exports = server;