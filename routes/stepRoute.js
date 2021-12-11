'use strict';

const express = require('express');
const {
    step_list_get,
    step_get,
    step_post,
} = require('../controllers/stepController');
const router = express.Router();

router.get('/', step_list_get);

router.get('/:id', step_get);

router.post('/', step_post);

router.put('/', (req, res) => {
    res.send('From this endpoint you can edit steps.');
});

router.delete('/', (req, res) => {
    res.send('From this endpoint you can delete steps.');
});

module.exports = router;