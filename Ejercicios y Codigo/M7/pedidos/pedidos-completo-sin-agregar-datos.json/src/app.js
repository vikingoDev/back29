const express = require('express');
const app = express();
const pedidoRoutes = require('./routes/pedidoRoutes.js');
const path = require('path');

// Configurar Pug como motor de plantillas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/', pedidoRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
