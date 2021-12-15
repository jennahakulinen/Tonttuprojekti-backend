'use strict';
// recipeRoute

const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const passport = require('../utils/pass');
const {
    recipe_list_get,
    recipe_get,
    recipe_post } = require('../controllers/recipeController');
const router = express.Router();

router.get('/', recipe_list_get);

router.get('/:id', recipe_get);

router.post('/', passport.authenticate('jwt', { session: false }), upload.single('picture'), recipe_post); // ennen upload passport

router.put('/', (req, res) => {
    res.send('From this endpoint you can edit recipes.');
});

router.delete('/', (req, res) => {
    res.send('From this endpoint you can delete recipes.');
});

module.exports = router;
