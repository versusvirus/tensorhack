module.exports = function (app, db) {
    app.get('/characteristics', async (req, res) => {
        const {category_id} = req.query;

        res.send((await db.query(`
            SELECT
                C_C._id,
                C.NAME,
                C.TYPE 
            FROM
                category_characteristic C_C
                JOIN characteristic C ON C._id = C_C.characteristic_id 
            WHERE
                category_id =${category_id}`)).rows
        );
    });
};