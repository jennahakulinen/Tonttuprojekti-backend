'use strict';

const express = require('express');
const {
    unit_list_get,
    unit_get,
    unit_post,
} = require('../controllers/unitController');
const router = express.Router();

router.get('/', unit_list_get);

router.get('/:id', unit_get);

router.post('/', unit_post);

router.put('/', (req, res) => {
    res.send('From this endpoint you can edit units.');
});

router.delete('/', (req, res) => {
    res.send('From this endpoint you can delete units.');
});

module.exports = router;