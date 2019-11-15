const {ObjectID} = require('mongodb');

module.exports = function(app, db) {
    app.get('/products/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('products').findOne(details, (err, item) => {
            if (err) {
                res.send({error: err.toString()});
            } else {
                res.send(item);
            }
        });
    });
};