require('dotenv').config(); // Cargar variables de entorno desde un archivo .env

const http = require('http'); // Importar el módulo http para crear un servidor

console.clear(); // Limpiar la consola al iniciar el servidor

const server = http.createServer((req, res) => { // Crear el servidor HTTP

    /*
    req (Request): Representa la solicitud que envía el cliente al servidor. 
    Contiene información sobre la solicitud, como el método HTTP (GET, POST, etc.), 
    la URL solicitada, los encabezados y el cuerpo de la solicitud.
    res (Response): Representa la respuesta que el servidor enviará de vuelta
    al cliente. Permite definir el código de estado de la respuesta, los encabezados 
    el cuerpo de la respuesta que se enviará al cliente.*/

    // Obtener el método HTTP de la solicitud (GET, POST, etc.)
    const method = req.method;

    // Obtener la URL de la solicitud
    const url = req.url;

    // Obtener las cabeceras de la solicitud
    const headers = req.headers;

    // Imprimir el verbo HTTP en la consola
    console.log('Verbo HTTP:', method);
    
    // Imprimir la URL de la solicitud en la consola
    console.log('URL:', url);
    
    // Imprimir las cabeceras de la solicitud en la consola
    console.log('Cabeceras:', headers);

    // Inicializar una variable para almacenar el cuerpo de la solicitud
    let body = '';

    // Escuchar los datos que llegan en fragmentos (chunks)
    req.on('data', chunk => {
        // Convertir el fragmento a string y agregarlo al cuerpo
        body += chunk.toString(); // Acumular los datos en la variable body
    });

    // Cuando se termina de recibir todos los datos
    req.on('end', () => {
        // Imprimir el cuerpo de la solicitud en la consola
        console.log('Cuerpo de la solicitud:', body);
        
        // Enviar una respuesta al cliente indicando que los datos fueron recibidos
        res.end('Datos recibidos. Ver consola para más información.\n');
    });

    // Manejar errores en la solicitud
});

// Obtener el puerto de las variables de entorno o usar 3000 por defecto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor y escuchar en el puerto especificado
server.listen(PORT, () => {
    // Imprimir en la consola que el servidor está escuchando en el puerto
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
