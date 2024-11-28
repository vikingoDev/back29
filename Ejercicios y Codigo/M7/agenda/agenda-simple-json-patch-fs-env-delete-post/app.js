// Importar los módulos necesarios
const express = require('express'); // Importa Express, un framework para crear aplicaciones web en Node.js.
const fs = require('fs'); // Importa el módulo 'fs' para trabajar con el sistema de archivos.
const path = require('path'); // Importa el módulo 'path' para manejar rutas de archivos de forma segura.
const app = express(); // Crea una instancia de una aplicación Express.
//const PORT = 8080; // Definición del puerto, opcional y no se utiliza aquí.
require('dotenv').config(); // Cargar las variables de entorno desde un archivo .env.

// Usar la variable de entorno para el puerto, con un valor por defecto
const PORT = process.env.PORT || 8080; // Establece el puerto usando una variable de entorno o 8080 si no está definida.

// Middleware para parsear el cuerpo de la solicitud en formato JSON
app.use(express.json()); // Permite que la aplicación entienda solicitudes JSON en el cuerpo de las peticiones.

// Cargar los datos de la agenda desde el archivo JSON
const dataPath = path.join(__dirname, 'phones.json'); // Define la ruta del archivo 'phones.json' en el mismo directorio.
let phones = []; // Inicializa un arreglo vacío para almacenar los teléfonos.

// Leer el archivo JSON
fs.readFile(dataPath, 'utf8', (err, data) => { // Lee el archivo JSON de forma asíncrona.
    if (err) { // Si hay un error al leer el archivo...
        console.error('Error al leer el archivo JSON', err); // Muestra el error en la consola.
        return; // Sale de la función si hay un error.
    }
    phones = JSON.parse(data); // Convierte el contenido del archivo JSON en un objeto y lo asigna a 'phones'.
});

// Ruta para obtener todos los registros de la agenda
app.get('/api/phones', (req, res) => { // Define una ruta GET para obtener todos los teléfonos.
    res.json(phones); // Devuelve la lista de teléfonos en formato JSON.
});

// Ruta para obtener un registro específico por ID
app.get('/api/phones/:id', (req, res) => { // Define una ruta GET con un parámetro de ID.
    const phoneId = parseInt(req.params.id, 10); // Convierte el parámetro de ID a un número entero.
    const phone = phones.find(p => p.id === phoneId); // Busca el teléfono por ID en el arreglo.

    if (phone) { // Si se encuentra el teléfono...
        res.json(phone); // Devuelve el teléfono encontrado en formato JSON.
    } else {
        res.status(404).send('Registro no encontrado'); // Devuelve un error 404 si no existe.
    }
});

// Ruta para actualizar un registro específico por ID (actualiza el archivo también)
app.patch('/api/phones/:id', (req, res) => { // Define una ruta PATCH para actualizar un teléfono.
    const phoneId = parseInt(req.params.id, 10); // Convierte el ID a un número.
    const phone = phones.find(p => p.id === phoneId); // Busca el teléfono por ID.

    if (phone) { // Si se encuentra el teléfono...
        // Actualizar el nombre y/o el número si están presentes en el cuerpo de la solicitud
        if (req.body.name) { // Si hay un nuevo nombre en el cuerpo...
            phone.name = req.body.name; // Actualiza el nombre.
        }
        if (req.body.number) { // Si hay un nuevo número en el cuerpo...
            phone.number = req.body.number; // Actualiza el número.
        }

        // Guardar los cambios en el archivo JSON
        fs.writeFile(dataPath, JSON.stringify(phones, null, 2), (err) => { // Escribe el arreglo de teléfonos de nuevo en el archivo.
            if (err) { // Si hay un error al guardar...
                console.error('Error al guardar el archivo JSON', err); // Muestra el error en la consola.
                return res.status(500).send('Error al guardar los cambios'); // Devuelve un error 500.
            }
            // Devolver el registro actualizado
            res.json(phone); // Devuelve el teléfono actualizado en formato JSON.
        });
    } else {
        res.status(404).send('Registro no encontrado'); // Devuelve un error 404 si no existe.
    }
});

// Ruta para crear un nuevo registro
app.post('/api/phones', (req, res) => { // Define una ruta POST para crear un nuevo teléfono.
    const { name, number } = req.body; // Extrae el nombre y el número del cuerpo de la solicitud.

    if (!name || !number) { // Verifica que ambos campos estén presentes.
        return res.status(400).send('Nombre y número son obligatorios'); // Devuelve un error 400 si falta alguno.
    }

    // Genera un nuevo ID para el teléfono
    const newPhone = {
        id: phones.length > 0 ? phones[phones.length - 1].id + 1 : 1, // Asigna un nuevo ID. 
        //id: phones.length > 0 ? phones[phones.length - 1].id + 1 : 1: 
        //Asigna un ID. Si ya hay teléfonos en el arreglo, toma el ID del último teléfono
        //y le suma 1; si no hay teléfonos, asigna 1 como el primer ID.
        name,
        number
    };

    phones.push(newPhone); // Agrega el nuevo teléfono al arreglo.

    // Guarda los cambios en el archivo JSON
    fs.writeFile(dataPath, JSON.stringify(phones, null, 2), (err) => { // Escribe el nuevo arreglo en el archivo.
        if (err) { // Si hay un error al guardar...
            console.error('Error al guardar el archivo JSON', err); // Muestra el error en la consola.
            return res.status(500).send('Error al guardar el nuevo registro'); // Devuelve un error 500.
        }
        res.status(201).json(newPhone); // Devuelve el nuevo teléfono creado en formato JSON y un estado 201.
    });
});

// Ruta para eliminar un registro específico por ID
app.delete('/api/phones/:id', (req, res) => { // Define una ruta DELETE para eliminar un teléfono.
    const phoneId = parseInt(req.params.id, 10); // Convierte el ID a un número.
    const index = phones.findIndex(p => p.id === phoneId); // Busca el índice del teléfono en el arreglo.

    if (index !== -1) { // Si se encuentra el teléfono...
        phones.splice(index, 1); // Elimina el teléfono del arreglo.
        fs.writeFile(dataPath, JSON.stringify(phones, null, 2), (err) => { // Escribe el nuevo arreglo en el archivo.
            if (err) { // Si hay un error al guardar...
                console.error('Error al guardar el archivo JSON', err); // Muestra el error en la consola.
                return res.status(500).send('Error al guardar los cambios'); // Devuelve un error 500.
            }
            res.status(204).send(); // Devuelve un estado 204 sin contenido.
        });
    } else {
        res.status(404).send('Registro no encontrado'); // Devuelve un error 404 si no existe.
    }
});

// Iniciar el servidor
app.listen(PORT, () => { // Inicia el servidor en el puerto especificado.
    console.log(`Servidor corriendo en http://localhost:${PORT}`); // Muestra un mensaje en la consola indicando que el servidor está corriendo.
});
