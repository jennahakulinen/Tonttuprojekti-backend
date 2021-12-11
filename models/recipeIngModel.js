'use strict';

const recing = [
    {
        RecipeIngID: '1',
        Quantity: '5',
        UnitName: 'dl',
        IngredientID: '4',
        RecipeID: '1',
    },
    {
        RecipeIngID: '2',
        Quantity: '2',
        UnitName: 'rkl',
        IngredientID: '2',
        RecipeID: '2',
    },
];

const getRecipeIng = (RecipeIngID) => {
    return recing.find((recipeing) => recipeing.RecipeIngID === RecipeIngID);
};

module.exports = {
    recing,
    getRecipeIng,
};