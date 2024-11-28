const express = require("express");
const cuentaRouter = require("./routers/cuenta.js");
const PORT = process.env.PORT || 3000;
const expressApp = express();
console.clear();
// Middleware para procesar JSON en el cuerpo de la solicitud
expressApp.use(express.json());
expressApp.use(express.text());
expressApp.use(cuentaRouter);


// Escucha en P=3000
expressApp.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${PORT}`);
});

