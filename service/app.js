const userApi = require('./api/userApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded())

app.use('/api/user', userApi);

app.use(express.static(path.resolve(__dirname, '../dist')));
app.get('/', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
  res.send(html);
});
let PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('success listen at port: ', PORT);
