// Importar los módulos necesarios
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
//const PORT = 8080;
require('dotenv').config(); // Cargar las variables de entorno
// Usar la variable de entorno para el puerto, con un valor por defecto
const PORT = process.env.PORT || 8080;
// Middleware para parsear el cuerpo de la solicitud en formato JSON
app.use(express.json());

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

// Ruta para actualizar un registro específico por ID (actualiza el archivo también)
app.patch('/api/phones/:id', (req, res) => {
    const phoneId = parseInt(req.params.id, 10);
    const phone = phones.find(p => p.id === phoneId);

    if (phone) {
        // Actualizar el nombre y/o el número si están presentes en el cuerpo de la solicitud
        if (req.body.name) {
            phone.name = req.body.name;
        }
        if (req.body.number) {
            phone.number = req.body.number;
        }

        // Guardar los cambios en el archivo JSON
        fs.writeFile(dataPath, JSON.stringify(phones, null, 2), (err) => {
            if (err) {
                console.error('Error al guardar el archivo JSON', err);
                return res.status(500).send('Error al guardar los cambios');
            }
            // Devolver el registro actualizado
            res.json(phone);
        });
    } else {
        res.status(404).send('Registro no encontrado'); // Devuelve un error 404 si no existe
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
