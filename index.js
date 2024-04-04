var express = require('express');
var cors = require('cors');
const mysql = require('mysql2');

require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

var app = express();

app.use(cors());

app.get('/', function (req, res) {
  res.json('Hello World!')
})

app.get('/attractions', function (req, res) {
  pool.query('SELECT * FROM attraction', function (error, rows, fields) {
    if (error) return res.json(error)
    return res.json(rows)
  })
})

app.listen(5000, function () {
  console.log('Example app listening on port 5000!')
})
