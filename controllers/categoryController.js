'use strict';

const categoryModel = require('../models/categoryModel');
const { getCategory, getAllCategories, addCategory } = categoryModel;

const category_list_get = async (req, res, next) => {
    try {
        const categories = await getAllCategories(next);
        if (categories.length > 0) {
            res.json(categories);
        } else {
            next('No categories found', 404);
        }
    } catch (e) {
        console.log('category_list_get error', e.message);
        next(httpError('internal server error', 500));
    }
};

const category_get = async (req, res, next) => {
    try {
        const vastaus = await getCategory(req.params.id, next);
        if (vastaus.length > 0) {
            res.json(vastaus.pop());
        } else {
            next(httpError('No category found', 404));
        }
    } catch (e) {
        console.log('category_get error', e.message);
        next(httpError('internal server error', 500));
    }
};

const category_post = async (req, res, next) => {
    try {
        console.log('lomakkeesta', req.body);
        const { categoryName } = req.body;
        const tulos = await addCategory(categoryName, next);
        if (tulos.affectedRows > 0) {
            res.json({
                message: 'category added',
                categoryName: tulos.insertId,
            });
        } else {
            next(httpError('No category inserted', 400));
        }
    } catch (e) {
        console.log('category_post error', e.message);
        next(httpError('internal server error', 500));
    }
};

module.exports = {
    category_list_get,
    category_get,
    category_post,
};