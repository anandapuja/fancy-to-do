const route = require('express').Router();
const TodoController = require('../controllers/todo');

// Main Route / View All Data
route.get('/', TodoController.getTodosData);

// View & Post Spesific Data 
route.get('/:id', TodoController.getTodoData);
route.post('/', TodoController.postTodoData);

// Update Spesific Data
route.put('/:id', TodoController.putData);

// Delete Spesific Data
route.delete('/:id', TodoController.deleteData);

module.exports = route;