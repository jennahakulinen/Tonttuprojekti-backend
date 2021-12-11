'use strict';

const ingredients = [
    {
        IngredientID: '4',
        IngredientName: 'Jauho',
    },
    {
        IngredientID: '2',
        IngredientName: 'Levinjauhe',
    },
];

const getIngreient = (IngredientID) => {
    return ingredients.find((ingredient) => ingredient.IngredientID === IngredientID);
};

module.exports = {
    ingredients,
    getIngreient,
};