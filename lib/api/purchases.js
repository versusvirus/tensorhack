const {ObjectID} = require('mongodb');

module.exports = function(app, db) {
    app.get('/purchases', (req, res) => {
        const {note} = req.query;

        db.collection('purchases').find({note}).toArray((err, items) => {
            if (err) {
                res.send({error: err.toString()});
            } else {
                res.send(items);
            }
        });
    });
    app.post('/purchases', (req, res) => {
        const purchase = {...req.body};

        db.collection('purchases').insertOne(purchase, (err, result) => {
            if (err) {
                res.send({error: err.toString()});
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.delete('/purchases/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};

        db.collection('purchases').remove(details, (err) => {
            if (err) {
                res.send({error: err.toString()});
            } else {
                res.send(200);
            }
        });
    });
};