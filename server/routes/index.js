const route = require('express').Router();
const TodoRoute = require('./todo');

route.use('/todos', TodoRoute);

module.exports = route;