const {ObjectID} = require('mongodb');

module.exports = function(app, db) {
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({error: err.toString()});
            } else {
                res.send(item);
            }
        });
    });
    app.get('/notes', (req, res) => {
        db.collection('notes').find({}).sort({date: -1 }).toArray((err, items) => {
            if (err) {
                res.send({error: err.toString()});
            } else {
                res.send(items);
            }
        });
    });
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        const note = {...req.body};
        db.collection('notes').update(details, note, (err) => {
            if (err) {
                res.send({error: err.toString()});
            } else {
                res.send(note);
            }
        });
    });
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').remove(details, (err) => {
            if (err) {
                res.send({error: err.toString()});
            } else {
                res.send(200);
            }
        });
    });
    app.post('/notes', (req, res) => {
        const note = {...req.body};
        db.collection('notes').insertOne(note, (err, result) => {
            if (err) {
                res.send({error: err.toString()});
            } else {
                res.send(result.ops[0]);
            }
        });
    });
};