const notes = require('./notes');
const purchases = require('./purchases');
const calculate = require('./calculate');
const products = require('./products');

module.exports = function (app, db) {
    notes(app, db);
    purchases(app, db);
    calculate(app, db);
    products(app, db);
    app.get('/DATABASE', (req, res) => {
        res.send(process.env.DATABASE_URL);
    });
};