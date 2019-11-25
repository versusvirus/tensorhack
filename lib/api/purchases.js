const {ObjectID} = require('mongodb');

module.exports = function (app, db) {
    app.get('/purchases', async (req, res) => {
        const {note_id, mode = 'multi'} = req.query;
        const result = [];
        const shops = {};

        if (mode === 'multi') {
            const {rows} = await db.query(`WITH Prices AS (
                                  SELECT
                                    MIN (P_S.price) AS price, P_S.product_id
                                  FROM
                                    products_shops P_S
                                  WHERE 
                                    P_S.product_id = ANY (SELECT product_id FROM purchases WHERE note_id=${note_id})
                                  GROUP BY
                                    P_S.product_id
                                ) 
                                
                                SELECT
                                  P.name as product_name, P.logo as product_logo, S.name as shop_name, S.logo as shop_logo, Prices.price, P_S._id
                                FROM
                                  Prices
                                LEFT JOIN 
                                  products_shops P_S ON P_S.price = Prices.price
                                LEFT JOIN
                                  shops S ON S._id = P_S.shop_id
                                LEFT JOIN
                                  products P ON P._id = P_S.product_id`);
            rows.forEach(item => {
                if (!shops[item.shop_name]) {
                    shops[item.shop_name] = {
                        products: []
                    };
                }

                shops[item.shop_name].logo = item.shop_logo;
                shops[item.shop_name].name = item.shop_name;
                shops[item.shop_name].products.push({
                    name: item.product_name,
                    price: item.price,
                    logo: item.product_logo
                });
            });
        }

        res.send(Object.keys(shops).map(item => ({
            ...shops[item]
        })));
    });
    app.post('/purchases', async (req, res) => {
        const {note_id, product_id} = {...req.body};

        await db.query(`INSERT INTO public.purchases ("note_id", "product_id") VALUES (${note_id},${product_id})`);

        res.send(200);
    });
    app.delete('/purchases/:id', async (req, res) => {
        const id = req.params.id;

        await db.query(`DELETE from public.purchases WHERE _id=${id}`);

        res.send(200);
    });
};