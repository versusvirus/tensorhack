const notes = require('./notes');
const purchases = require('./purchases');

module.exports = function (app, db) {
    notes(app, db);
    purchases(app, db);
};