// Importar los módulos necesarios
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 8080;

// Cargar los datos de la agenda desde el archivo JSON
const dataPath = path.join(__dirname, 'phones.json');
let phones = [];

// Leer el archivo JSON
fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo JSON', err);
        return;
    }
    phones = JSON.parse(data); // Convertir el JSON en un objeto
});

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
