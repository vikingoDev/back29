const net = require('net');            // Para trabajar con redes

// Usar 'net' para crear un servidor TCP
const tcpServer = net.createServer(socket => {
    socket.write('Bienvenido al servidor TCP');
    socket.on('data', data => {
        console.log('Datos recibidos en el servidor TCP:', data.toString());
    });
});
tcpServer.listen(4000, () => {
    console.log('Servidor TCP corriendo en puerto 4000');
});
