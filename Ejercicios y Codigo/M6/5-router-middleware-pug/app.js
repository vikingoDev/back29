const express = require("express");
const cuentaRouter = require("./routers/cuenta.js");
const path = require("path");  // Módulo para manejar rutas de archivos
const PORT = process.env.PORT || 3000;
const expressApp = express();
console.clear();
// Middleware para procesar JSON en el cuerpo de la solicitud
expressApp.set('view engine', 'pug');
expressApp.set('views', path.join(__dirname, 'views'));  // Ruta donde estarán tus vistas
expressApp.use(express.json());
expressApp.use(express.text());
expressApp.use(cuentaRouter);


// Escucha en P=3000
expressApp.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${PORT}`);
});

