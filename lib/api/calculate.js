const {ObjectID} = require('mongodb');

function getProduct(db, name) {
    return new Promise((resolve, reject) => {
        db.collection('products').find({name}).toArray((err, items) => {
            if (err) {
                reject(err);
            } else {
                resolve(items);
            }
        });
    });
}

module.exports = function (app, db) {
    app.get('/calculate', (req, res) => {
        const note = req.query.note;
        db.collection('purchases').find({note}).toArray(async (err, items) => {
            const arrays = await Promise.all(items.map(item => item.text).map((item) => getProduct(db, item)))
            const shops = {};

            arrays.forEach(array => {
                array.forEach(product => {
                    if (!shops[product.shop]) {
                        shops[product.shop] = [];
                    }

                    shops[product.shop].push(product);
                });
            });

            const shopsPrice = Object.keys(shops).map(name => ({
                price: shops[name].reduce((sum, item) => (sum + item.price), 0),
                name
            }));

            const price = Math.min.apply(null, shopsPrice.map(item => item.price));
            const shop = shopsPrice.find((item) => item.price === price).name;

            res.send({
                price,
                shop,
                products: shops[shop]
            });
        });
    });
};