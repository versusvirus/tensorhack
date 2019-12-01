module.exports = function(app, db) {
    app.get('/categories/:id', (req, res) => {
        const id = req.params.id;
        db.query(`SELECT name, logo FROM public.products WHERE _id=${id}`, (err, selectResult) => {
            if (err) {
                res.send({error: err.toString()});
            } else {
                res.send(selectResult.rows[0]);
            }
        });
    });
    app.get('/categories', async (req, res) => {
        const {name} = req.query;

        if (name) {
            res.send((await db.query(`SELECT _id, name FROM public.category WHERE name ILIKE '${name}%'`)).rows);
        } else {
            res.send((await db.query(`SELECT _id, name FROM public.category`)).rows);
        }
    });
};