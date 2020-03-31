const route = require('express').Router();
const TodoRoute = require('./todo');
const UserController = require('../controllers/user');

route.use('/todos', TodoRoute);
route.post('/register', UserController.register);
route.get('/login', UserController.login);

module.exports = route;