const notes = require('./notes');
const purchases = require('./purchases');
const calculate = require('./calculate');

module.exports = function (app, db) {
    notes(app, db);
    purchases(app, db);
    calculate(app, db);
};