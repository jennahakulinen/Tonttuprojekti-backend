'use strict';

const ingredientsModel = require('../models/ingredientsModel');
const {ingredients, getIngreient} = ingredientsModel;

const ingredients_list_get = (req, res) => {
    res.json(ingredients);
};

const ingredients_get = (req, res) => {
    const vastaus = getIngreient(req.params.id);
    res.json(vastaus);
};

const ingredients_post = (req, res) => {
    console.log(req.body, req.file);
    res.send('From this endpoint you can add ingredients');
};

module.exports = {
    ingredients_list_get,
    ingredients_get,
    ingredients_post,
};