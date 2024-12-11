import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Bank() {
  const [csrfToken, setCsrfToken] = useState('');
  const [amount, setAmount] = useState('');
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');

  // Busca o token CSRF ao carregar o componente
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('http://localhost:3001/csrf-token', {
          withCredentials: true, // Garante envio de cookies
        });
        setCsrfToken(response.data.csrfToken);
        console.log('CSRF Token fetched:', response.data.csrfToken);
      } catch (err) {
        console.error('Erro ao buscar token CSRF:', err);
      }
    };

    fetchCsrfToken();
  }, []);

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/api/transfer',
        { amount, to },
        {
          headers: { 'X-CSRF-Token': csrfToken }, // Envia o token CSRF
          withCredentials: true, // Garante envio de cookies
        }
      );
      setMessage(response.data);
    } catch (err) {
      console.error(err);
      setMessage('Transferência falhou.');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1>Banco Real e SEGURO</h1>
      <form onSubmit={handleTransfer}>
        <div>
          <label>Valor:</label>
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
