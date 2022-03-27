require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');

const api = express();

const db = require('./db');

api.use(bodyParser.json());

api.get('/', async (req, res) => {
  res.status(200).send("IClothes API");
  return;
});

api.use('/users', userRoutes);

api.use('/*', (req, res) => {
  return res.status(404).json({
    error: "Recurso não encontrado!"
  });
});


db.connect().then(() => {
    console.log('===============================');
    console.log('!!!!!!Connected to DataBase!!!!');
    console.log('===============================');
  
    api.listen(process.env.PORT, () => {
      console.log('===============================');
      console.log('!!!!!!!Servidor Bootado!!!!!!!!');
      console.log('===============================');
    });
});