const express = require('express');
const app = express();
const mainRoute = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', mainRoute);

app.listen(3000, () => console.log('listening port : 3000'));