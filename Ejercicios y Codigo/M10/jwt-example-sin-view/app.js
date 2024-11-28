// app.js

// Importar el módulo express
const express = require('express');

// Importar el módulo mongoose para la conexión a MongoDB
const mongoose = require('mongoose');

// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Inicializar la aplicación Express
const app = express();

// Configurar Mongoose para no generar advertencias en consultas estrictas
mongoose.set('strictQuery', false);

// Conectar a la base de datos MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/passport', { 
    useNewUrlParser: true, // Usar el nuevo analizador de URL de MongoDB, no son necesarias actualmente
    useUnifiedTopology: true // Usar el nuevo motor de conexión de Mongoose, no son necesarias actualmente
})
.then(() => console.log('Conectado a la base de datos')) // Mensaje en consola al conectarse
.catch(err => console.error('Error de conexión a la base de datos:', err)); // Manejo de errores de conexión

// Middlewares
app.use(express.urlencoded({ extended: false })); // Middleware para parsear datos de formularios
app.use(express.json()); // Middleware para parsear JSON en el cuerpo de las solicitudes

// Importar las rutas de usuarios
const usersRouter = require('./controllers/users.js');
const postsRouter = require('./controllers/posts'); 
const loginRouter = require('./controllers/login');
const middleware = require('./middlewares/middleware');
//...

// Configurar las rutas de la API
app.use('/api/users', usersRouter); // Ruta para manejar las solicitudes de usuarios
app.use('/api/posts', postsRouter); // Descomentar cuando sea necesario para manejar publicaciones
app.use('/api/login',loginRouter);
app.use(middleware.errorHandler);


// Iniciar el servidor en el puerto especificado
const PORT = process.env.PORT || 8000; // Usar el puerto de la variable de entorno o 8000 por defecto
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`); // Mensaje en consola con la dirección del servidor
});
