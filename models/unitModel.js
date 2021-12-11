'use strict';

const units = [
    {
        UnitName: 'dl'
    },
    {
        UnitName: 'rkl'
    },
];

const getUnit = (UnitName) => {
    return units.find((unit) => unit.UnitName === UnitName);
};

module.exports = {
    units,
    getUnit,
};