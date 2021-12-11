'use strict';

const categories = [
    {
        CategoryID: '1',
        CategoryName: 'Leivonta',
    },
    {
        CategoryID: '2',
        CategoryName: 'Jouluinen',
    },
    {
        CategoryID: '3',
        CategoryName: 'Vegaaninen',
    },
];

const getCategory = (CategoryID) => {
    return categories.find((category) => category.CategoryID === CategoryID);
};

module.exports = {
    categories,
    getCategory,
};