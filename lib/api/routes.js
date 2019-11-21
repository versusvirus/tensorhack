const notes = require('./notes');
const purchases = require('./purchases');
const calculate = require('./calculate');
const products = require('./products');

module.exports = function (app, db) {
    notes(app, db);
};