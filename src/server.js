
const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

const estimator = require('./estimator');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.txt'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// api for posting in Json and xml
app.post('/api/v1/on-covid-19/:type?', (req, res) => {
  const { type } = req.params;
  const result = estimator.covid19ImpactEstimator(req.body);

  if (type !== 'xml') {
    return res.json(result);
  }
  res.type('application/xml');
  const builder = new xml2js.Builder();
  const xml = builder.buildObject(result);
  return res.send(xml);
});

// api for getting logs
app.get('/api/v1/on-covid-19/logs', (req, res) => {
  const readlog = fs.readFileSync('src/access.txt', 'utf8');
  return res.send(readlog);
});

app.listen(port, () => {
  console.log('estimator Restful API server started on: ', port);
});
