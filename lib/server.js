const MongoClient = require('mongodb').MongoClient;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = require('express')();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const routes = require('./api/routes');
const mongourl = 'mongodb+srv://user:user123@cluster0-s7lwm.mongodb.net/test?retryWrites=true&w=majority';

MongoClient.connect(mongourl, (err, database) => {
    if (err) return console.log(err);

    const db = database.db('edadil');

    app.use(cors());
    app.use(bodyParser.json());
    app.use(cookieParser());

    routes(app, db);

    app.listen(PORT, () => {
       console.log(`App listening on ${PORT}`);
    });
});