import React, { useState } from 'react';
import axios from 'axios';

function Bank() {
  const [amount, setAmount] = useState('');
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3001/api/transfer', {
        params: { amount, to }, // Parâmetros da transferência
        withCredentials: true, // Garante envio de cookies
      });
      setMessage(response.data);
    } catch (err) {
      console.error(err);
      setMessage('Transferência falhou.');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1>Banco real.com</h1>
      <form onSubmit={handleTransfer}>
        <div>
          <label>Valor da Transferência R$:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Para:</label>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Transferir</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Bank;
