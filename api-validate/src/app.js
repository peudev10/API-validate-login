const express = require('express');

const router = require('./router.js')
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // faz a api aceitar dados json
app.use(router);


module.exports = app;