const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');

const app = express();

// Middleware para processar cookies e JSON
app.use(bodyParser.json());
app.use(cookieParser());

// Middleware para CSRF
const csrfProtection = csurf({ cookie: true });

app.get('/api/csrf-token', csrfProtection, (req, res) => {
  // Envia o token CSRF ao cliente
  res.json({ csrfToken: req.csrfToken() });
});

// Rota de login
app.post('/api/login', csrfProtection, (req, res) => {
  const { username, password } = req.body;

  // Simulação de validação de login
  if (username === 'admin' && password === 'password') {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Porta do servidor
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});

console.log(`Login attempt: ${username}, ${password}`);
