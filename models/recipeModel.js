'use strict';

const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

// const recipes = [
//   {
//     recipeID: '1',
//     filename: 'img/image10.jpg',
//     title: 'Joululetut',
//     user: 'BestCook',
//     profilepic: 'https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo',  //
//     rates: '4/5',
//     cooktime: '30',
//     categories: ["Leivonta", "Jälkiruoka", "Jouluinen", "Herkku"],
//     ingredients: [
//       {
//         count: '1',
//         unit: 'dl',
//         name: 'sokeri',
//       },
//       {
//         count: '4',
//         unit: 'dl',
//         name: 'jauhot',
//       },
//       {
//         count: '1',
//         unit: 'rkl',
//         name: 'leivinjauhe',
//       },
//       {
//         count: '3',
//         unit: 'kpl',
//         name: 'kananmuna',
//       },
//       {
//         count: '6',
//         unit: 'dl',
//         name: 'maito',
//       },
//     ],
//     steps: [
//       {
//         desc: 'Vatkaa munien rakenne rikki kulhossa. Lisää taikinaan n. 2 dl maitoa ja muut aineet ja vatkaa tasaiseksi. Lisää loppu maito ja sekoita. Anna turvota 30 min.',
//       },
//       {
//         desc: 'Paista taikinasta ohukaisia Oivariini rasvassa pannulla.',
//       },
//       {
//         desc: 'Tarjoa lisänä esim. kermavaahtoa, marjoja, sokeria, hilloa, sokeroitua marjasurvosta tai jäätelöä.',
//       },
//     ],
//   },
// ];

//Funktio, joka palauttaa yhden reseptin id:n perusteella
// const getRecipe = (recipeID) => {
//   return recipes.find((recipe) => recipe.recipeID === recipeID);
// };


// const getRecipeIds = async (next) => {
//   try {
//     const [rows] = await promisePool.execute(
//         'SELECT RecipeID FROM Recipe'
//     );
//     return rows;
// } catch (e) {
//     console.error('getAllCategories error', e.message);
//     next(httpError('Database error', 500));
// }
// };


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
    const reseptiID = resepti.insertId;
    const [ainesosa] = await promisePool.execute(
      `INSERT INTO Ingredients(IngredientName) VALUES (?)`, [ingredient]);
    const ainesosaID = ainesosaID.insertId;
    const [recipeing] = await promisePool.execute(
      `INSERT INTO RecipeIng(Quantity, UnitName, IngredientID, RecipeID) VALUES (?, ?, ?, ?)`, [quantity, unit, ainesosaID, reseptiID]);
    const [steps] = await promisePool.execute(
      `INSERT INTO Steps(StepDescription, RecipeID) VALUES (?, ?)`, [description, reseptiID]);
    const [kategoria] = await promisePool.execute(
      `INSERT INTO Category(CategoryName) VALUES (?);`, [category]);
    const kategoriaID = kategoriaID.insertId;
    const [recipe_category] = await promisePool.execute(
      `INSERT INTO Recipe_Category(RecipeID, CategoryID) VALUES (?, ?);`, [reseptiID, kategoriaID]);
    return recipe_category;
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