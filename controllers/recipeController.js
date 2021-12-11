"use strict";
// recipeController

const recipeModel = require("../models/recipeModel");

//const recipes = recipeModel.recipes; , sama lyhyemmin alla
const { recipes, getRecipe } = recipeModel;

const recipe_list_get = (req, res) => {
    res.json(recipes);
};

const recipe_get = (req, res) => {
    const vastaus = getRecipe(req.params.id);
    res.json(vastaus);
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