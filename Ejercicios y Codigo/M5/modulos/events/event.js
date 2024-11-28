const events = require('events');      // Para implementar emisores de eventos
// Usar 'events' para crear un emisor de eventos
const EventEmitter = new events.EventEmitter();
EventEmitter.on('saludo', (nombre) => {
    console.log(`¡Hola, ${nombre}!`);
});
EventEmitter.emit('saludo', 'Mundo');