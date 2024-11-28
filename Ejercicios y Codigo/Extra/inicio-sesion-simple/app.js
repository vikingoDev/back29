const express = require('express'); // Cargamos el módulo express para crear la aplicación web
const path = require('path'); // Cargamos el módulo path para manejar rutas de archivos

const app = express(); // Creamos una instancia de la aplicación Express
const PORT = 3000; // Definimos el puerto en el que la aplicación escuchará

// Configurar Pug como motor de plantillas
app.set('view engine', 'pug'); // Indicamos que usaremos Pug para renderizar vistas
app.set('views', path.join(__dirname, 'views')); // Definimos la carpeta donde se encuentran las vistas

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true })); // Para manejar datos URL-encoded de formularios
app.use(express.json()); // Para manejar datos en formato JSON

// Ruta para mostrar el formulario de inicio de sesión
app.get('/', (req, res) => {
  res.render('login'); // Renderizamos la vista 'login.pug' cuando se accede a la raíz
});

// Ruta para manejar el inicio de sesión
app.post('/login', (req, res) => {
  const { username, password } = req.body; // Extraemos username y password del cuerpo de la solicitud

  // Simular autenticación
  if (username === 'admin' && password === 'adminpass') { // Verificamos si son las credenciales del admin
    res.redirect('/admin'); // Redirigimos al panel de administración
  } else if (username === 'user' && password === 'userpass') { // Verificamos si son las credenciales del usuario
    res.redirect('/user'); // Redirigimos al panel de usuario
  } else {
    res.send('Credenciales incorrectas'); // Si las credenciales son incorrectas, enviamos un mensaje
  }
});

// Ruta para el panel de administración
app.get('/admin', (req, res) => {
  res.render('admin'); // Renderizamos la vista 'admin.pug' para el panel de administración
});

// Ruta para el panel de usuario
app.get('/user', (req, res) => {
  res.render('user'); // Renderizamos la vista 'user.pug' para el panel de usuario
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`); // Mostramos un mensaje en consola indicando que el servidor está corriendo
});
