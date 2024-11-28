// Función asincrónica para manejar el proceso de login
async function login() {
  // Obtiene el valor del campo de texto con id 'username' (nombre de usuario)
  const username = document.getElementById('username').value;

  // Obtiene el valor del campo de texto con id 'password' (contraseña)
  const password = document.getElementById('password').value;
  
  // Realiza una solicitud HTTP POST a la API de login
  const response = await fetch('/api/login', {
    method: 'POST', // El método HTTP utilizado será POST
    headers: {
      'Content-Type': 'application/json', // Indica que el cuerpo de la solicitud contiene datos JSON
    },
    body: JSON.stringify({ username, password }), // Convierte el objeto con username y password a una cadena JSON y lo envía en el cuerpo de la solicitud
  });

  // Si la respuesta es exitosa (código de estado HTTP 200)
  if (response.ok) {
    // Redirige al usuario a la página de posts
    window.location.href = '/posts'; 
  } else {
    // Si la respuesta es un error, se obtiene el mensaje de error en formato JSON
    const error = await response.json();

    // Muestra una alerta con el mensaje de error obtenido
    alert('Error de login: ' + error.error);
  }
}
