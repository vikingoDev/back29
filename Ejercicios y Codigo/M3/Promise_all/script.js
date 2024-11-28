// Definir las promesas de fetch
// Realizar solicitudes fetch para obtener los archivos
const p1 = fetch('/texto.txt');  // Solicitud para obtener '/texto.txt'
const p2 = fetch('/texto2.txt');   // Solicitud para obtener '/robo.txt'
const p3 = fetch('/texto3.txt');   // Solicitud para obtener '/text.txt'

// Ejecutar Promise.all para esperar a que todas las promesas se resuelvan
Promise.all([p1, p2, p3])
  .then((responses) => {
    // Comprobar que todas las respuestas sean exitosas
    responses.forEach((response) => {
      if (!response.ok) {
        // Si la respuesta no es exitosa, lanzar un error
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }
    });

    // Leer el contenido de cada respuesta y devolver una promesa para cada uno
    return Promise.all(responses.map(response => response.text()));
  })
  .then((texts) => {
    // Procesar los textos obtenidos de cada respuesta
    // Mostrar el contenido del archivo en el <pre> del HTML con el ID 'output'
    document.getElementById('output').textContent = texts.join('\n\n');
  })
  .catch((error) => {
    // Manejar cualquier error que ocurra durante las solicitudes o el procesamiento
    console.error('Se produjo un error:', error);
  });
