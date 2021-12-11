'use strict';

const recipeIngModel = require('../models/recipeIngModel');
const {recing, getRecipeIng} = recipeIngModel;

const recing_list_get = (req, res) => {
    res.json(resing);
};

const recing_get = (req, res) => {
    const vastaus = getRecipeIng(req.params.id);
    res.json(vastaus);
};

const recing_post = (req, res) => {
    console.log(req.body, req.file);
    res.send('From this endpoint you can add recipe ingredients');
};

module.exports = {
    recing_list_get,
    recing_get,
    recing_post,
};