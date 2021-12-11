'use strict';

const express = require('express');
const {
    recing_list_get,
    recing_get,
    recing_post,
} = require('../controllers/recipeIngController');
const router = express.Router();

router.get('/', recing_list_get);

router.get('/:id', recing_get);

router.post('/', recing_post);

router.put('/', (req, res) => {
    res.send('From this endpoint you can edit recipe ingredients.');
});

router.delete('/', (req, res) => {
    res.send('From this endpoint you can delete recipe ingredients.');
});

module.exports = router;