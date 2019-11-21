const {ObjectID} = require('mongodb');

module.exports = function(app, db) {
    app.get('/notes', (req, res) => {
        db.query('SELECT _id, name FROM public.notes ORDER BY date desc', (err, result) => {
            if (err) {
                res.send({error: err.toString()});
            } else {
                res.send(result.rows);
            }
        });
    });
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const {name} = req.body;
        db.query(`UPDATE public.notes SET name='${name}' WHERE _id=${id}`, (err) => {
            if (err) {
                res.send({error: err.toString()});
            } else {
                res.send(200);
            }
        });
    });
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        db.query(`DELETE FROM public.notes WHERE _id=${id}`,(err) => {
            if (err) {
                res.send({error: err.toString()});
            } else {
                res.send(200);
            }
        });
    });
    app.post('/notes', (req, res) => {
        const {date, name, user} = req.body;
        db.query(`INSERT INTO public.notes ("date", "name", "user") VALUES ('${date}','${name}',${user});
                  SELECT _id FROM public.notes WHERE _id=currval('notes_id_sequence');`, (err, [_, selectRes]) => {
            if (err) {
                res.send({error: err.toString()});
            } else {
                res.send(selectRes.rows[0]);
            }
        });
    });
};