const route = require('express').Router();
const TodoRoute = require('./todo');
const UserController = require('../controllers/user');
const authentication = require('../middlewares/athentication');

route.use('/todos', authentication, TodoRoute);
route.post('/register', UserController.register);
route.get('/login', UserController.login);

module.exports = route;