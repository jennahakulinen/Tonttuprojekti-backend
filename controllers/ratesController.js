'use strict';

const ratesModel = require('../models/ratesModel');
const {rates, getRate} = ratesModel;

const rates_list_get = (req, res) => {
    res.json(rates);
};

const rates_get = (req, res) => {
    const vastaus = getRate(req.params.id);
    res.json(vastaus);
};

const rates_post = (req, res) => {
    console.log(req.body, req.file);
    res.send('From this endpoint you can add rates');
};

module.exports = {
    rates_list_get,
    rates_get,
    rates_post,
};