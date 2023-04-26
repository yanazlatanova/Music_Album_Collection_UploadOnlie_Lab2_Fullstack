const express = require('express');
const router = express.Router();
const { getAll, getByTitle, add, update, remove, getById }  = require('../controller/albumController')


// Show all albums
router.get('/', getAll); // sends the req and res aoutomatically

// Retrieve a specific album by title
router.get('/:title', getByTitle);

// Retrieve a specific album by id
router.get('/id/:id', getById);


// Create a new album
router.post('/', add);

// Update an album
router.put('/:id', update);

// Delete an album
router.delete('/:id', remove);


module.exports = router;