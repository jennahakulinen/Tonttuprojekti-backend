'use strict';

const steps = [
    {
      StepID: '1',
      StepDescription: 'Lämmitä uuni 200 astetta',
      RecipeID: '1',  
    },
    {
      StepID: '2',
      StepDescription: 'Sekoita kuivat aineet keskenään.',
      RecipeID: '1',  
    },
];

const getSteps = (StepID) => {
    return steps.find((step) => step.StepID === StepID);
};

module.exports = {
    steps,
    getSteps,
};