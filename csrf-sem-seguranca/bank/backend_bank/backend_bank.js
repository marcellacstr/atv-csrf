const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


// Middleware para simular autenticação
app.use((req, res, next) => {
  if (!req.cookies.session) {
    res.cookie('session', 'valid-session-token'); // Simula um cookie de sessão
  }
  next();
});

// Página inicial (para simular o login)
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Bank.com</h1><p>You are logged in!</p>');
});

// Rota de transferência
app.get('/api/transfer', (req, res) => {
  const { amount, to } = req.query;

  if (!req.cookies.session) {
    return res.status(401).send('Unauthorized');
  }

  if (amount && to) {
    console.log(`Pedido de transferência de: $${amount} para ${to}`);
    res.send(`Transferido valor de R$${amount} para ${to}`);
    console.log(`transferência realizada`);
  } else {
    console.log(`Tentou transferir: $${amount} para ${to}`);
    res.status(400).send('Invalid transfer request');
  }
});

// Inicia o servidor legítimo
app.listen(3001, () => {
  console.log('Bank.com running on http://localhost:3001');
});

// Mesmo com o CORS configurado corretamente,
 //o navegador enviará cookies automaticamente para o backend (bank.com)
 // quando um site malicioso (evil.com) fizer uma requisição simples 
//(como GET, sem cabeçalhos personalizados ou payload no corpo da requisição). 
//Isso acontece porque: cookies são enviados automaticamente pelo navegador para o domínio ao qual eles
//pertencem, independentemente da origem da requisição 
//CORS protege só do usuário ver a resposta, mas não precisa ver a resposta para causar danos 
//requisições simples não passam por verificação prévia de CORS





