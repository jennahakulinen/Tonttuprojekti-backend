'use strict';

const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();


const getAllRecipes = async (next) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT RecipeID FROM Recipe'
    );
    return rows;
  } catch (e) {
    console.error('getAllRecipes error', e.message);
    next(httpError('Database error', 500));
  }
};


const getRecipeData = async (id, next) => {
  try {
    const [rows] = await promisePool.execute(`
    SELECT E.RecipeID, File, RecipeName, CookTime, Username, ProfilePic, CategoryName, Quantity, UnitName, IngredientName, StepDescription 
    FROM (SELECT D.RecipeID, File, RecipeName, CookTime, Username, ProfilePic, CategoryName, Quantity, UnitName, IngredientName 
      FROM (SELECT A.RecipeID, File, RecipeName, CookTime, Username, ProfilePic, CategoryName 
        FROM (
      (SELECT RecipeID, File, RecipeName, CookTime, Recipe.Username, ProfilePic FROM Recipe 
       INNER JOIN Cookmas_User ON Recipe.Username = Cookmas_User.Username WHERE Recipe.RecipeID = ?) 
       AS A
      INNER JOIN 
      (SELECT CategoryName, Recipe.RecipeID FROM Category
      INNER JOIN Recipe_Category ON Recipe_Category.CategoryID = Category.CategoryID
      INNER JOIN Recipe ON Recipe.RecipeID = Recipe_Category.RecipeID
      WHERE Recipe.RecipeID = ?) 
      AS B
      ON A.RecipeID = B.RecipeID)) AS C
      INNER JOIN 
      (SELECT Recipe.RecipeID, Quantity, UnitName, Ingredients.IngredientName FROM RecipeIng
      INNER JOIN Recipe ON Recipe.RecipeID = RecipeIng.RecipeID
      INNER JOIN Ingredients ON Ingredients.IngredientID = RecipeIng.IngredientID
      WHERE Recipe.RecipeID = ?) AS D
      ON C.RecipeID=D.RecipeID) AS E
      INNER JOIN
      (SELECT Recipe.RecipeID, StepDescription FROM Steps 
      INNER JOIN Recipe ON Recipe.RecipeID = Steps.RecipeID
      WHERE Recipe.RecipeID = ?) AS F
      ON E.RecipeID=F.RecipeID
      `, [id, id, id, id]);


    return rows;
  } catch (e) {
    console.error('getCat error', e.message);
    next(httpError('Database error', 500));
  }
};


const addRecipe = async (header, quantity, unit, ingredient, description, time, category, picture, username, next) => {
  try {
    const [recipe] = await promisePool.execute(
      `INSERT INTO Recipe (File, RecipeName, CookTime, Username) VALUES (?, ?, ?, ?)`, [picture, header, time, username]);
    const reseptiID = recipe.insertId;
    for (let i = 0; ingredient.length > i; i++) {
      const [ainesosa] = await promisePool.execute(
        `INSERT INTO Ingredients(IngredientName) VALUES (?)`, [ingredient[i]]);
      const ainesosaID = ainesosa.insertId;
      const [recipeing] = await promisePool.execute(
        `INSERT INTO RecipeIng(Quantity, UnitName, IngredientID, RecipeID) VALUES (?, ?, ?, ?)`, [quantity[i], unit[i], ainesosaID, reseptiID]);

    }
    for (let i = 0; description.length > i; i++) {
      const [steps] = await promisePool.execute(
        `INSERT INTO Steps(StepDescription, RecipeID) VALUES (?, ?)`, [description[i], reseptiID]);
    }
    for (let i = 0; category.length > i; i++) {
      const [kategoria] = await promisePool.execute(
        `INSERT INTO Category(CategoryName) VALUES (?);`, [category[i]]);
      const kategoriaID = kategoria.insertId;
      const [recipe_category] = await promisePool.execute(
        `INSERT INTO Recipe_Category(RecipeID, CategoryID) VALUES (?, ?);`, [reseptiID, kategoriaID]);
    }
    return "ok";
  } catch (e) {
    console.error('addRecipe error', e.message);
    next(httpError('Database error', 500));
  }
};

module.exports = {
  getRecipeData,
  getAllRecipes,
  addRecipe,
};