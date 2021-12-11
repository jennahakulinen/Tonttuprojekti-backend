'use strict';

const stepModel = require('../models/stepModel');
const {steps, getSteps} = stepModel;

const step_list_get = (req, res) => {
    res.json(steps);
};

const step_get = (req, res) => {
    const vastaus = getSteps(req.params.id);
    res.json(vastaus);
};

const step_post = (req, res) => {
    console.log(req.body, req.file);
    res.send('From this endpoint you can add steps');
};

module.exports = {
    step_list_get,
    step_get,
    step_post,
};