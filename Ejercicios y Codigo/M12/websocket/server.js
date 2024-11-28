// Requiere la librería Express, que es un framework de Node.js para 
//crear servidores HTTP.
const express = require('express');
// Requiere el módulo HTTP nativo de Node.js para crear el servidor.
const http = require('http');
// Requiere el módulo Socket.io para la comunicación en tiempo real 
//entre el servidor y los clientes.
const socketIo = require('socket.io');

// Configuración del servidor Express
const app = express(); // Crea una instancia de la aplicación Express.
const server = http.createServer(app); // Crea un servidor HTTP usando la aplicación Express.
const io = socketIo(server); // Crea una instancia de Socket.io para habilitar la comunicación en tiempo real.


// Middleware para servir archivos estáticos, 
//como HTML, CSS, JS, etc., desde la carpeta "public"
app.use(express.static('public'));

// Un array que almacena los mensajes del chat (historial de mensajes).
const messages = [
  { id: 1, text: 'Bienvenido al chat!', author: 'Admin' } 
  // Mensaje inicial de bienvenida del administrador.
];

// Evento cuando un cliente se conecta a través de WebSockets (Socket.io)
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado'); // Muestra un mensaje en la consola cuando un nuevo cliente se conecta.

  // Enviar todos los mensajes históricos al cliente recién conectado
  socket.emit('messages', messages); // Envía el historial de mensajes al cliente que se acaba de conectar.

  // Escuchar el evento "new-message" desde el cliente (cuando un cliente envía un nuevo mensaje)
  socket.on('new-message', (data) => {
    messages.push(data); // Agrega el nuevo mensaje recibido a la lista de mensajes.
    io.sockets.emit('messages', messages); // Emite el evento 'messages' a todos los clientes conectados, enviando el historial actualizado de mensajes.
  });

  // Evento cuando un cliente se desconecta
  socket.on('disconnect', () => {
    console.log('Cliente desconectado'); // Muestra un mensaje en la consola cuando un cliente se desconecta.
  });
});

// Inicia el servidor en el puerto 8080
server.listen(8080, () => {
  console.log('Servidor escuchando en http://localhost:8080'); // Muestra un mensaje en la consola indicando que el servidor está en ejecución.
});
