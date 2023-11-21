//accounts.js
const express = require('express');
const accountController = require('./accountsController');
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json());

app.use('/accounts', accountController);

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});
