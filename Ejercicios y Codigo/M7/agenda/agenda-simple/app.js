// Importar el módulo de Express
const express = require('express');
const app = express();
const PORT = 8080;

// Datos de la agenda telefónica
const phones = [
    { id: 1, name: 'Diego Perez', number: '011 45623-1194' },
    { id: 2, name: 'Elsa Rodriguez', number: '0351 426-3099' },
    { id: 3, name: 'Emiliano Martinez', number: '011 15-6754-0126' },
    { id: 4, name: 'Olivia Alvarez', number: '0291 484-6998' }
];

// Ruta para obtener todos los registros de la agenda
app.get('/api/phones', (req, res) => {
    res.json(phones);
});

// Ruta para obtener un registro específico por ID
app.get('/api/phones/:id', (req, res) => {
    const phoneId = parseInt(req.params.id, 10);
    const phone = phones.find(p => p.id === phoneId);

    if (phone) {
        res.json(phone);
    } else {
        res.status(404).send('Registro no encontrado'); // Devuelve un error 404 si no existe
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
