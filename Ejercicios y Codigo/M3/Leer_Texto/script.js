// Usar fetch para obtener el archivo robots.txt
fetch('/texto.txt')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then((data) => {
    // Mostrar el contenido del archivo en el <pre> del HTML
    document.getElementById('output').textContent = data;
  })
  .catch((error) => {
    // Manejar cualquier error que ocurra
    document.getElementById('output').textContent = `Error: ${error.message}`;
  })
  .finally(() => {
    console.log('Petición completada.');
  });