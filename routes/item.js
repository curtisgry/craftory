const express = require('express');
const catchAsync = require('../utils/catchAsync');
const { newItem, updateItem, deleteItem } = require('../controllers/items');

const router = express.Router();

router.post('/', catchAsync(newItem));

router.put('/:id', updateItem);

router.delete('/:id', deleteItem);

module.exports = router;
