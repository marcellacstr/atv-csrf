const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const cors = require('cors');

const app = express();

// Middleware para processar JSON, cookies e formulários
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Configuração de CORS para permitir apenas o frontend legítimo
app.use(cors({
  origin: 'http://localhost:3000', // Permite apenas a origem do frontend legítimo
  credentials: true, // Garante envio de cookies
}));

// Middleware CSRF para proteção contra ataques
const csrfProtection = csrf({ cookie: true });

// Middleware para simular autenticação com um cookie seguro
app.use((req, res, next) => {
  if (!req.cookies.session) {
    res.cookie('session', 'valid-session-token', {
      httpOnly: true,
      sameSite: 'Strict', // Previne envio de cookies para requisições cross-origin. Impede que os cookies sejam enviados 
      // automaticamente por outro site. Os cookies só vão ser mandados se o domínio for o mesmo
    });
  }
  next();
});

// Página inicial (simulação de login)
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Bank.com</h1><p>You are logged in!</p>');
});

// Rota para fornecer o token CSRF ao frontend
app.get('/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Middleware para verificar origem/referer manualmente
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000']; // Lista de origens permitidas
  const origin = req.headers.origin || req.headers.referer;

  if (origin && !allowedOrigins.includes(origin)) {
    console.log(`Requisição bloqueada de origem não permitida: ${origin}`);
    return res.status(403).send('Forbidden');
  }

  next();
});

// Rota de transferência (protegida por CSRF)
app.post('/api/transfer', csrfProtection, (req, res) => {
  const { amount, to } = req.body;

  if (!req.cookies.session) {
    return res.status(401).send('Unauthorized');
  }

  if (amount && to) {
    console.log(`Pedido de transferência de: $${amount} para ${to}`);
    res.send(`Transferido $${amount} para ${to}`);
    console.log(`Transferência feita de: $${amount} para ${to}`);
  } else {
    res.status(400).send('Invalid transfer request');
    console.log(`Pedido de transferência de: $${amount} para ${to} NEGADA`);
  }
});

// Inicia o servidor legítimo
app.listen(3001, () => {
  console.log('Bank.com running on http://localhost:3001');
});
