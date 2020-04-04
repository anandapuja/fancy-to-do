const route = require('express').Router();
const TodoRoute = require('./todo');
const UserController = require('../controllers/user');
const GoogleController = require('../controllers/google');
const authentication = require('../middlewares/athentication');

route.use('/todos', authentication, TodoRoute);
route.post('/register', UserController.register);
route.post('/login', UserController.login);
route.post('/googleSignIn', GoogleController.googleSignIn);


module.exports = route;