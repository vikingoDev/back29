// Importamos las dependencias necesarias
const express = require('express'); // Framework web para Node.js
const mongoose = require('mongoose'); // Biblioteca para trabajar con MongoDB
const session = require('express-session'); // Middleware para manejar sesiones de usuario
const passport = require('passport'); // Middleware para autenticación y autorización
require('dotenv').config(); // Carga las variables de entorno desde un archivo .env
const path = require('path'); // Módulo para trabajar con rutas de archivos y directorios

// Importar controladores y middlewares
const viewsController = require('./controllers/viewsController'); // Controlador de vistas (para renderizar páginas)
const usersRouter = require('./controllers/users'); // Rutas para la gestión de usuarios
const postsRouter = require('./controllers/posts'); // Rutas para la gestión de posts
const loginRouter = require('./controllers/login'); // Rutas para la gestión de login
const { errorHandler, authenticateSession } = require('./middlewares/middleware'); // Middlewares de manejo de errores y autenticación de sesión

// Configuración de la aplicación
const app = express(); // Creamos una instancia de la aplicación Express
app.use(express.static(path.join(__dirname, 'public'))); // Sirve archivos estáticos desde la carpeta 'public'
mongoose.set('strictQuery', false); // Desactiva la advertencia de 'strictQuery' en mongoose (no necesario para versiones actuales de MongoDB)

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/passport', {
  useNewUrlParser: true, // Usar el nuevo analizador de URL de MongoDB
  useUnifiedTopology: true // Usar el nuevo motor de conexión unificado
})
  .then(() => console.log('Conectado a la base de datos')) // Mensaje cuando la conexión es exitosa
  .catch(err => console.error('Error de conexión a la base de datos:', err)); // Mensaje cuando ocurre un error de conexión

// Configurar sesiones
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret', // Definir el secreto para firmar las cookies de sesión
  resave: false, // No volver a guardar la sesión si no ha habido cambios
  saveUninitialized: true // Guardar sesiones incluso si no se han inicializado
}));

// Inicializar Passport
app.use(passport.initialize()); // Inicializa Passport para manejar la autenticación
app.use(passport.session()); // Habilita la gestión de sesión con Passport

// Middlewares
app.use(express.urlencoded({ extended: false })); // Middleware para parsear datos de formularios (application/x-www-form-urlencoded)
app.use(express.json()); // Middleware para parsear datos JSON
app.set('view engine', 'pug'); // Define Pug como el motor de plantillas para las vistas

// Rutas para vistas
app.get('/', viewsController.getHome); // Ruta para la página de inicio
app.get('/login', viewsController.getLogin); // Ruta para la página de login
app.get('/register', viewsController.getRegister); // Ruta para la página de registro
app.get('/posts', viewsController.getPosts); // Ruta para la vista de posts (sin autenticación)

// Rutas para la API (protegidas con sesión)
app.use('/api/users', usersRouter); // Rutas relacionadas con usuarios
app.use('/api/posts', authenticateSession, postsRouter); // Rutas relacionadas con posts, protegidas por el middleware 'authenticateSession'
app.use('/api/login', loginRouter); // Ruta para login (gestión de autenticación)
app.use(errorHandler); // Middleware para manejo de errores globales

// Iniciar el servidor
const PORT = process.env.PORT || 8000; // Define el puerto de escucha (por defecto es 8000 si no se especifica en el entorno)
app.listen(PORT, () => { // Inicia el servidor en el puerto definido
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`); // Mensaje de confirmación cuando el servidor está corriendo
});
