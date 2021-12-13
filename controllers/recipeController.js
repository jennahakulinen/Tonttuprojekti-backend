"use strict";
// recipeController

const recipeModel = require("../models/recipeModel");
const { getRecipeData } = require("../models/recipeModel");
const { httpError } = require("../utils/errors");
const { validationResult } = require("express-validator");

//const recipes = recipeModel.recipes; , sama lyhyemmin alla
const { recipes, getRecipe } = recipeModel;

const recipe_list_get = (req, res) => {
    res.json(recipes);
};



const recipe_get = async (req, res, next) => {
    try {
        const vastaus = await getRecipeData(req.params.id, next);
        if (vastaus.length > 0) {

            const return_json = {
                "recipeID": vastaus[0].RecipeID,
                "filename": vastaus[0].File,
                "title": vastaus[0].RecipeName,
                "user": vastaus[0].Username,
                "profilepic": vastaus[0].ProfilePic,
                "cooktime": vastaus[0].CookTime,
                "rates": '4/5',
            }
            const categories = flatten_table_to_array(vastaus, "CategoryName");
            return_json["categories"] = categories
            const ingredients = flatten_table_to_json(vastaus, { "Quantity": "count", "UnitName": "unit", "IngredientName": "name" });
            return_json["ingredients"] = ingredients
            const steps = flatten_table_to_json(vastaus, { "StepDescription": "desc" });
            return_json["steps"] = steps

            res.json([return_json]);
        } else {
            next(httpError('No recipe found', 404));
        }
    } catch (e) {
        console.log('recipe_get error', e.message);
        next(httpError('internal server error', 500));
    }
};

const recipe_post = (req, res) => {
    console.log(req.body, req.file);
    res.send("With this endpoint you can add recipes");
};

module.exports = {
    recipe_list_get,
    recipe_get,
    recipe_post,
};


function flatten_table_to_json(table, keys) {
    var some_array = [];
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

function flatten_table_to_array(table, key) {
    var some_array = [];
    for (let i = 0; i < table.length; i++) {
        some_array.push(table[i][key]);
    }
    some_array = remove_duplicates(some_array);
    return some_array
}

function remove_duplicates(arr) {
    var obj = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }
    for (var key in obj) {
        ret_arr.push(key);
    }
    return ret_arr;
}