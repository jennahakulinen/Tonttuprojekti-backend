'use strict';

const recipes = [
  {
    recipeID: '1',
    filename: 'img/image10.jpg',
    title: 'Joululetut',
    user: 'BestCook',
    profilepic: 'https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo',
    rates: '4/5',
    cooktime: '30',
    categories: ["Leivonta", "Jälkiruoka", "Jouluinen", "Herkku"],
    ingredients: [
      {
        count: '1',
        unit: 'dl',
        name: 'sokeri',
      },
      {
        count: '4',
        unit: 'dl',
        name: 'jauhot',
      },
      {
        count: '1',
        unit: 'rkl',
        name: 'leivinjauhe',
      },
      {
        count: '3',
        unit: 'kpl',
        name: 'kananmuna',
      },
      {
        count: '6',
        unit: 'dl',
        name: 'maito',
      },
    ],
    steps: [
      {
        desc: 'Vatkaa munien rakenne rikki kulhossa. Lisää taikinaan n. 2 dl maitoa ja muut aineet ja vatkaa tasaiseksi. Lisää loppu maito ja sekoita. Anna turvota 30 min.',
      },
      {
        desc: 'Paista taikinasta ohukaisia Oivariini rasvassa pannulla.',
      },
      {
        desc: 'Tarjoa lisänä esim. kermavaahtoa, marjoja, sokeria, hilloa, sokeroitua marjasurvosta tai jäätelöä.',
      },
    ],
  },
];

//Funktio, joka palauttaa yhden kissan id:n perusteella
const getRecipe = (recipeID) => {
  return recipes.find((recipe) => recipe.recipeID === recipeID);
};

module.exports = {
  recipes,
  getRecipe,
};