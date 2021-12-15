"use strict";
// recipeController

const recipeModel = require("../models/recipeModel");
const { getRecipeData, getAllRecipes, addRecipe } = recipeModel;
const { httpError } = require("../utils/errors");
const { validationResult } = require("express-validator");

const { recipes, getRecipe } = recipeModel;

const recipe_list_get = async (req, res, next) => {
    try {
        const recipe_ids = await getAllRecipes(next);
        if (recipe_ids.length > 0) {
            const recipes = []
            for (let i = 0; i < recipe_ids.length; i++) {
                const recipe_data = await getRecipeData(recipe_ids[i].RecipeID, next);
                if (recipe_data.length > 0) {
                    recipes.push(process_recipe_data(recipe_data));
                }
            }
            res.json(recipes);
        } else {
            next('No recipe IDs found', 404);
        }
    } catch (e) {
        console.log('recipe_list_get error', e.message);
        next(httpError('internal server error', 500));
    }
};



const recipe_get = async (req, res, next) => {
    try {
        const vastaus = await getRecipeData(req.params.id, next);
        if (vastaus.length > 0) {

            const return_json = process_recipe_data(vastaus);

            res.json([return_json]);
        } else {
            next(httpError('No recipe found', 404));
        }
    } catch (e) {
        console.log('recipe_get error', e.message);
        next(httpError('internal server error', 500));
    }
};

const recipe_post = async (req, res, next) => {
    console.log('recipe_post', req.body, req.file);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('recipe_post validation', errors.array());
        next(httpError('Invalid data', 400));
        return;
    }
    if (!req.file) {
        const err = httpError('File not valid', 400);
        next(err);
        return;
    }

    try {

        const { header, quantity, unit, ingredient, description, time, category } = req.body;
        const tulos = await addRecipe(header, quantity, unit, ingredient, description, time, category, req.file.filename, req.user.Username, next);
        if (tulos === "ok") {
            res.json({
                message: "recipe added"
            });
        } else {
            next(httpError('No user inserted', 400));
        }
    } catch (e) {
        console.log('recipe_post error', e.message);
        next(httpError('internal server error', 500));
    }
};

module.exports = {
    recipe_list_get,
    recipe_get,
    recipe_post,
};


const process_recipe_data = (vastaus) => {
    const return_json = {
        "recipeID": vastaus[0].RecipeID,
        "filename": vastaus[0].File,
        "title": vastaus[0].RecipeName,
        "user": vastaus[0].Username,
        "profilepic": vastaus[0].ProfilePic,
        "cooktime": vastaus[0].CookTime,
        "rates": '4/5',
    };
    const categories = flatten_table_to_array(vastaus, "CategoryName");
    return_json["categories"] = categories;
    const ingredients = flatten_table_to_json(vastaus, { "Quantity": "count", "UnitName": "unit", "IngredientName": "name" });
    return_json["ingredients"] = ingredients;
    const steps = flatten_table_to_json(vastaus, { "StepDescription": "desc" });
    return_json["steps"] = steps;
    return return_json;
}

const flatten_table_to_json = (table, keys) => {
    let some_array = [];
    for (let i = 0; i < table.length; i++) {
        const collection = {}
        for (const key in keys) {
            collection[keys[key]] = table[i][key]
        }
        some_array.push(JSON.stringify(collection))
    }

    some_array = remove_duplicates(some_array);
    const new_array = []
    for (let i = 0; i < some_array.length; i++) {
        new_array.push(JSON.parse(some_array[i]))
    }
    return new_array
}

const flatten_table_to_array = (table, key) => {
    let some_array = [];
    for (let i = 0; i < table.length; i++) {
        some_array.push(table[i][key]);
    }
    some_array = remove_duplicates(some_array);
    return some_array
}

const remove_duplicates = (arr) => {
    let obj = {};
    let ret_arr = [];
    for (let i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }
    for (let key in obj) {
        ret_arr.push(key);
    }
    return ret_arr;
}