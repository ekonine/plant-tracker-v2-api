const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = 3001;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json('Wow it works');
})

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
