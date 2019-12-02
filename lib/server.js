const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const app = require('express')();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const routes = require('./api/routes');
const {Client} = require('pg');

const client = new Client({
    connectionString: 'postgres://bqxteefqvvlcpe:baea83ed1a88bff65f4e17bce5cf3c37ef653dcdf6f9438ef71a38d9cc6f4e78@ec2-54-247-92-167.eu-west-1.compute.amazonaws.com:5432/dg3eebencmfq4',
    ssl: true,
});

client.connect();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static('api'));

routes(app, client);

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});