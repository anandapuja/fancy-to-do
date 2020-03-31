const route = require('express').Router();
const OngkirController = require('../controllers/ongkir');

// RAJA ONGKIR PUBLIC API
route.get('/', OngkirController.getProvince);
route.post('/', OngkirController.postProvince);

module.exports = route;