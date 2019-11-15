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
        Promise.all(JSON.parse(req.query.products).map((item) => getProduct(db, item)))
            .then((arrays) => {
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