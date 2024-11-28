// Función asincrónica para manejar la creación de un nuevo post
async function createPost(event) {
  // Evita que la página se recargue cuando se envíe el formulario
  event.preventDefault();

  // Verificar si la cookie de sesión 'connect.sid' está presente
  if (!document.cookie.includes('connect.sid')) {
    // Si no existe la cookie de sesión, muestra un mensaje alertando que se debe iniciar sesión
    alert("Por favor, inicia sesión para crear un post.");
    // Redirige al usuario a la página de login si no está autenticado
    window.location.href = '/login'; // Redirigir a login si no hay cookie de sesión
    return; // Termina la ejecución de la función si no hay sesión activa
  }

  // Si la cookie de sesión está presente, proceder con la creación del post
  const title = document.getElementById('title').value; // Obtiene el título del post desde el campo de entrada
  const content = document.getElementById('content').value; // Obtiene el contenido del post desde el campo de entrada
  const category = document.getElementById('category').value; // Obtiene la categoría del post desde el campo de entrada

  // Realiza una solicitud HTTP POST para crear un nuevo post
  const response = await fetch('/api/posts', {
    method: 'POST', // Especifica que la solicitud es de tipo POST
    headers: {
      'Content-Type': 'application/json', // Indica que los datos enviados son en formato JSON
    },
    body: JSON.stringify({ title, content, category }), // Convierte los datos del formulario a formato JSON y los incluye en el cuerpo de la solicitud
  });

  // Si la respuesta es exitosa (código de estado 200)
  if (response.ok) {
    // Convierte la respuesta JSON en un objeto de post
    const post = await response.json();
    console.log('Post creado:', post); // Muestra el post recién creado en la consola para depuración
    // Redirige a la página de posts después de crear el nuevo post
    window.location.href = '/posts'; 
    // Aquí puedes hacer algo más después de crear el post, como mostrar un mensaje de éxito
  } else {
    // Si la respuesta no es exitosa, obtiene el mensaje de error
    const errorData = await response.json();
    console.error('Error al crear el post:', errorData); // Muestra el error en la consola para depuración
  }
}
