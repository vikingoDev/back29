const express = require("express"); // Importa el módulo express para usar sus funcionalidades.

const PORT = process.env.PORT || 3000; // Establece el puerto: usa el definido en el entorno o 3000 por defecto.
const expressApp = express(); // Crea una instancia de la aplicación Express.
console.clear(); // Limpia la consola para mantenerla ordenada.

// Middleware para procesar JSON en el cuerpo de la solicitud
expressApp.use(express.json()); 
// Permite a la aplicación interpretar cuerpos de solicitud en formato JSON.
expressApp.use(express.text()); 
// Permite a la aplicación interpretar cuerpos de solicitud en texto simple.

expressApp.get("/cuenta/:idcuenta", (req, res) => { // Define una ruta GET que captura un parámetro dinámico 'idcuenta'.
    console.log(req.body); // Imprime el cuerpo de la solicitud en la consola (normalmente vacío en GET).
    res.send(); // Envía una respuesta vacía al cliente.
});

expressApp.listen(PORT, () => { // Inicia el servidor en el puerto especificado.
    console.log(`Servidor levantado en el puerto ${PORT}`); // Imprime un mensaje confirmando que el servidor está activo.
});
