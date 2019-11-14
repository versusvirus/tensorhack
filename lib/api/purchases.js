module.exports = function(app, db) {
    app.get('/purchases', (req, res) => {
        const {note} = req.query;

        db.collection('purchases').findOne({note}, (err, item) => {
            if (err) {
                res.send({error: err.toString()});
            } else {
                res.send(item);
            }
        });
    });
    app.post('/purchases', (req, res) => {
        const {note, text} = req.params;

        db.collection('purchases').insertOne({note, text}, (err, result) => {
            if (err) {
                res.send({error: err.toString()});
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.delete('/purchases', (req, res) => {
        const {note} = req.query;

        db.collection('purchases').remove({note}, (err) => {
            if (err) {
                res.send({error: err.toString()});
            } else {
                res.send(`purchase from ${note} was removed`);
            }
        });
    });
};