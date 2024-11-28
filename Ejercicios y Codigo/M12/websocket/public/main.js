// Conectar al servidor de WebSocket
const socket = io.connect();  // Establece la conexión al servidor WebSocket (Socket.io) en el mismo dominio del cliente.

// Función para renderizar los mensajes en el DOM
function render(data) {
  // Se recorre el array de mensajes (data) y se genera una cadena HTML para cada mensaje.
  const html = data
    .map((elem) => 
      // Para cada mensaje, se crea un div que contiene el autor y el texto del mensaje.
      `<div><strong>${elem.author}</strong>: <em>${elem.text}</em></div>`
    )
    .join(" ");  // Une todos los elementos generados en un solo bloque de HTML.
  
  // Inserta el HTML generado en el contenedor con id 'messages' en la página.
  document.getElementById('messages').innerHTML = html;
}

// Recibir mensajes desde el servidor
socket.on('messages', function(data) {
  // Cuando se recibe el evento 'messages' del servidor, se pasa el historial de mensajes a la función render.
  render(data);
});

// Función para enviar un nuevo mensaje
function addMessage(e) {
  // Crea un objeto 'message' con el autor y el texto del mensaje, que provienen de los campos de entrada en el formulario.
  const message = {
    author: document.getElementById('username').value,  // Obtiene el nombre del autor desde el campo con id 'username'.
    text: document.getElementById('texto').value  // Obtiene el texto del mensaje desde el campo con id 'texto'.
  };

  // Envía el nuevo mensaje al servidor mediante el evento 'new-message'.
  socket.emit('new-message', message);

  // Limpia el campo de texto para preparar el formulario para el siguiente mensaje.
  document.getElementById('texto').value = '';

  // Retorna 'false' para evitar que el formulario se envíe y recargue la página (función típica de formularios).
  return false;
}
