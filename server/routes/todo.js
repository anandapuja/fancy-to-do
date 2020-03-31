const route = require('express').Router();
const TodoController = require('../controllers/todo');
const authorization = require('../middlewares/authorization');
const checkexist = require('../middlewares/checkexist');

// Main Route / View All Data
route.get('/', checkexist, TodoController.getTodosData);

// View & Post Spesific Data 
route.post('/', TodoController.postTodoData);
route.get('/:id', authorization, TodoController.getTodoData);

// Update Spesific Data
route.put('/:id', authorization, TodoController.putData);

// Delete Spesific Data
route.delete('/:id', authorization, TodoController.deleteData);

module.exports = route;