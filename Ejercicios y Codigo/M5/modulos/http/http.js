// Importar el módulo 'http' que proporciona funcionalidades para crear servidores y clientes HTTP
const http = require('http');          // Proporciona funcionalidades para crear un servidor HTTP

// Definir el puerto en el que el servidor escuchará las solicitudes
const PORT = 3000;                     // Puerto en el que el servidor HTTP escuchará las conexiones

// Crear el servidor HTTP
const server = http.createServer((req, res) => {
    // Función de callback que maneja cada solicitud HTTP entrante
    // 'req' es el objeto de solicitud que contiene información sobre la solicitud del cliente
    // 'res' es el objeto de respuesta que se utiliza para enviar la respuesta al cliente
    
    if (req.url === '/') {             // Comprobar si la URL solicitada es la raíz del servidor
        // Enviar una respuesta con un código de estado 200 (OK) y el tipo de contenido 'text/plain'
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        // Enviar el mensaje '¡Hola Mundo desde el servidor HTTP!' al cliente
        res.end('¡Hola Mundo desde el servidor HTTP!');
    } else {                          // Si la URL solicitada no es la raíz
        // Enviar una respuesta con un código de estado 404 (Not Found) y el tipo de contenido 'text/plain'
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        // Enviar el mensaje 'Página no encontrada' al cliente
        res.end('Página no encontrada');
    }
});

// Iniciar el servidor para que escuche en el puerto especificado
server.listen(PORT, () => {
    // Mostrar un mensaje en la consola indicando que el servidor está en funcionamiento
    console.log(`Servidor HTTP corriendo en http://localhost:${PORT}`);
});
