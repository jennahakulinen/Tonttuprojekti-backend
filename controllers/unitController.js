'use strict';

const unitModel = require('../models/unitModel');
const {units, getUnit} = unitModel;

const unit_list_get = (req, res) => {
    res.json(units);
};

const unit_get = (req, res) => {
    const vastaus = getUnit(req.params.id);
    res.json(vastaus);
};

const unit_post = (req, res) => {
    console.log(req.body, req.file);
    res.send('From this endpoint you can add units');
};

module.exports = {
    unit_list_get,
    unit_get,
    unit_post,
};