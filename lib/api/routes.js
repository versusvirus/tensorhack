const notes = require('./notes');
const purchases = require('./purchases');
const calculate = require('./calculate');
const products = require('./products');
const categories = require('./categories');
const characteristics = require('./characteristic');

module.exports = function (app, db) {
    notes(app, db);
    products(app, db);
    purchases(app, db);
    categories(app, db);
    characteristics(app, db);
};