'use strict';

const categoryModel = require('../models/categoryModel');
const {categories, getCategory} = categoryModel;

const category_list_get = (req, res) => {
    res.json(categories);
};

const category_get = (req, res) => {
    const vastaus = getCategory(req.params.id);
    res.json(vastaus);
};

const category_post = (req, res) => {
    console.log(req.body, req.file);
    res.send('From this endpoint you can add categories');
};

module.exports = {
    category_list_get,
    category_get,
    category_post,
};