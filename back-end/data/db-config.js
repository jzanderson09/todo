const knex = require('knex');
const config = require('../knexfile.js');

const db = knex(config.development);

module.exports = {
    addTask,
    findTasks,
    findTasksById,
    updateTask,
    deleteTask
};

// CRUD Operations:

/* -------------- Create -------------- */

function addTask(task) {
    return db('tasks').insert(post);
}


/* -------------- Read -------------- */

// Returns tasks from the DB:
function findTasks() {
    return db('tasks');
}

// Returns tasks from the DB, specified by ID:
function findTasksById(id) {
    return db('tasks').where(id);
}

/* -------------- Update -------------- */

// Updates task, specified by ID:
function updateTask(id, newPost) {
    return db('tasks').where(id).update(newPost);
}

/* -------------- Delete -------------- */

// Deletes task:
function deleteTask(id) {
    return db('tasks').where(id).del();
}

// Updates tasks list, deleting completed from the DB:
function clearCompletedTasks() {
    return db('tasks').where({ completed: 1 }).del();
}