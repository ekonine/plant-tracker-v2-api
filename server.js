const express = require('express')
const cors = require('cors')

require('dotenv').config();
const db = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
  }
})

const app = express();
const port = 3001;
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const getPlants = require('./controllers/get-plants.js');
const addPlant = require('./controllers/add-plant.js');
const deletePlant = require('./controllers/delete-plant.js');

app.get('/', (req, res) => {
  res.status(200).json('Wow it works');
})

app.get('/plants/:user', (req, res) => {
  getPlants.handlePlantRequest(req, res, db);
})

app.get('/plants/:user/:plantid', (req, res) => {
  getPlants.handleIndPlantRequest(req, res, db);
})

app.post('/plants/:user/add', (req, res) => {
  addPlant.handlePlantAddRequest(req, res, db);
})

app.delete('/plants/:user/:plantid/del', (req, res) => {
  deletePlant.handlePlantDelete(req, res, db);
})

app.listen(port, () => {
  console.log(`app is listening on port ${port}`)
})
