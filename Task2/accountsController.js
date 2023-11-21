//accountsController.js
const express = require('express');
const app = express();
const accountService = require('./accountsService');

app.post('/open', (req, res) => {
  const { holder, type, balance } = req.body;
  const result = accountService.openAccount(holder, type, balance);

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  res.status(201).json(result);
});

app.get('/', (req, res) => {
  const accounts = accountService.getAllAccounts();
  res.status(200).json(accounts);
});

app.put('/:accountnumber/activate', (req, res) => {
  const accountNumber = req.params.accountnumber;
  const result = accountService.activateAccount(accountNumber);

  if (result.error) {
    return res.status(404).json({ error: result.error });
  }

  res.status(200).json({ message: result.message });
});

module.exports = app;
