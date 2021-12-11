'use strict';

const rates = [
    {
        RateID: '1',
        Rated: '4/5',
        Username: 'Joulupukki',
        RecipeID: '1',
    },
    {
        RateID: '2',
        Rated: '5/5',
        Username: 'PetteriP',
        RecipeID: '1',
    },
];

const getRate = (RateID) => {
    return rates.find((rate) => rate.RateID === RateID);
};

module.exports = {
    rates,
    getRate,
};  