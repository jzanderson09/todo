const express = require('express');
const cors = require('cors');
const server = express();
const db = require('./data/db-config.js');

server.use(express.json());
server.use(cors());

// Routes:
server.get('/', (req, res) => {
    res.status(200).json({ message: 'Welome to the server!' });
});

/* ---------- CREATE ---------- */

// Adds task to the DB:
server.post('/tasks', async (req, res) => {
    try {
        const updatedTasks= await db.addTask(req.body);
        return res.status(201).json({ message: 'Task added!' });
    }
    catch (err) {
        return res.status(500).json({ message: err });
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
        const task = await db.findTasksById(req.params);
        return res.status(200).json(task);
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
});

/* ---------- UPDATE ---------- */

// Updates task data (completed and status) from front-end to the DB:
server.put('/tasks/:id', async (req, res) => {
    try {
        const updatedTasks = await db.updateTask(req.params, req.body);
        return res.status(200).json({ message: 'task updated!' });
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
});

/* ---------- DELETE ---------- */
// Updates tasklist by deleting completed tasks from the DB:
server.delete('/tasks', async (req, res) => {
    try {
        const updatedTasks = await db.clearCompletedTasks();
        return res.status(200).json({ message: 'Completed tasks removed!' });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});

server.delete('/tasks/:id', async (req, res) => {
    try {
        const updatedTasks = await db.deleteTask(req.params);
        return res.status(204);
    }
    catch (err) {
        return res.status(500).json(err);
    }
});


module.exports = server;