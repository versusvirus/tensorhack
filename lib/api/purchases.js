const {ObjectID} = require('mongodb');
const {create} = require('guid');

module.exports = function (app, db) {
    app.get('/purchases', async (req, res) => {
        const {note_id, mode = 'multi'} = req.query;
        const result = [];
        const shops = {};

        if (mode === 'multi') {
                const {rows} = await db.query(
                        `with prices as (
                        select min(products_shops.price) as price, purchases.category_id from purchases
                        join category on purchases.category_id = category._id
                        join products on products.category_id = category._id
                        left join products_shops on products._id = products_shops.product_id
                        
                        join purchase_characteristic on purchase_characteristic.purchase_id = purchases._id
                        join product_characteristic on product_characteristic.product_id = products._id
                        
                        where purchase_characteristic.category_characteristic_id = product_characteristic.category_characteristic_id
                        and (purchase_characteristic.value = product_characteristic.value or purchase_characteristic.value = '') and purchases.note_id = ${note_id}
                        
                        group by purchases.category_id
                        )
                        
                        select products_shops.price as price, products.name as product_name, products.logo as product_logo, coalesce(shops.name, 'Нет в продаже') as shop_name, products_shops.stock_price as stock_price from prices
                        join products on products.category_id = prices.category_id
                        left join products_shops on products._id = products_shops.product_id
                        left join shops on shops._id = products_shops.shop_id
                        where products_shops.price = prices.price or prices.price is null
                        order by shops._id NULLS LAST`
                );
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
                    stockprice: item.stock_price,
                    logo: item.product_logo
                });
            });
        }

        res.send(Object.keys(shops).map(item => ({
            ...shops[item], id: create()
        })));
    });
    app.post('/purchases', async (req, res) => {
        const {note_id, category_id, count} = {...req.body};
        const characteristics = JSON.parse(req.body.characteristics);

        const [{_id: purchase_id}] = (await db.query(`insert into public.purchases ("note_id", "category_id", "count") VALUES (${note_id}, ${category_id}, ${count}) RETURNING *`)).rows;
        await db.query(`insert into public.purchase_characteristic ("purchase_id", "category_characteristic_id", "value") VALUES ${characteristics.map(({id, value}) => `(${purchase_id}, ${id}, '${value}')`).join('\n')}`);

        res.send(200);
    });
    app.delete('/purchases/:id', async (req, res) => {
        const id = req.params.id;

        await db.query(`DELETE from public.purchases WHERE _id=${id}`);

        res.send(200);
    });
};