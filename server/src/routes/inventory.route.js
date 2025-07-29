const express = require('express');
const inventoryRoute = express.Router();
const {getProducts, stockUpdating, getAlerts,
} = require('../controllers/inventory.controller');

inventoryRoute.get('/products', getProducts);
inventoryRoute.post('/stock-movement', stockUpdating);
inventoryRoute.get('/inventory-alerts', getAlerts);

module.exports = inventoryRoute;
