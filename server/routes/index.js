const route = require('express').Router();
const TodoRoute = require('./todo');
const OngkirRoute = require('./ongkir');
const UserController = require('../controllers/user');
const GoogleController = require('../controllers/google');
const authentication = require('../middlewares/athentication');

route.use('/todos', authentication, TodoRoute);
route.use('/ongkir', authentication, OngkirRoute);
route.post('/register', UserController.register);
route.post('/login', UserController.login);
route.post('/googleSignIn', GoogleController.googleSignIn);


module.exports = route;