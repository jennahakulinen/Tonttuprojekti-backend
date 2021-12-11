'use strict';

const express = require('express');
const {
    rates_list_get,
    rates_get,
    rates_post,
} = require('../controllers/ratesController');
const router = express.Router();

router.get('/', rates_list_get);

router.get('/:id', rates_get);

router.post('/', rates_post);

router.put('/', (req, res) => {
    res.send('From this endpoint you can edit recipe ingredients.');
});

router.delete('/', (req, res) => {
    res.send('From this endpoint you can delete recipe ingredients.');
});

module.exports = router;