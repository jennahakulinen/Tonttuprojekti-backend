'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCategories = async (next) => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT CategoryName FROM Category'
        );
        return rows;
    } catch (e) {
        console.error('getAllCategories error', e.message);
        next(httpError('Database error', 500));
    }
};

const getCategory = async (CategoryName, next) => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT CategoryName FROM Category WHERE CategoryName = ?', [CategoryName]);
        return rows;
    } catch (e) {
        console.error('getCategory error', e.message);
        next(httpError('Database error', 500));
    }
};

const addCategory = async (CategoryName, next) => {
    try {
        const [rows] = await promisePool.execute(
            'INSERT INTO Category (CategoryName) VALUES (?)',
            [CategoryName]
        );
        return rows;
    } catch (e) {
        console.error('addCategory error', e.message);
        next(httpError('Database error', 500));
    }
};


module.exports = {
    getAllCategories,
    getCategory,
    addCategory,
};