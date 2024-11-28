// Pruebas de API RESTful con SuperTest y Jest app.js
const express = require('express');
const app = express();

app.use(express.json());

app.post('/products', (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: 'El nombre y precio son requeridos' });
  }
  res.status(201).json({ name, price });
});

module.exports = app;
