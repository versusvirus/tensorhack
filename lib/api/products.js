module.exports = function(app, db) {
    app.get('/products/:id', (req, res) => {
        const id = req.params.id;
        db.query(`SELECT name, logo FROM public.products WHERE _id=${id}`, (err, selectResult) => {
            if (err) {
                res.send({error: err.toString()});
            } else {
                res.send(selectResult.rows[0]);
            }
        });
    });
    app.get('/products', async (req, res) => {
        const {name} = req.query;

        if (name) {
            res.send((await db.query(`SELECT _id, name, logo FROM public.products WHERE name LIKE '${name}%'`)).rows);
        } else {
            res.send((await db.query(`SELECT _id, name, logo FROM public.products`)).rows);
        }
    });
};