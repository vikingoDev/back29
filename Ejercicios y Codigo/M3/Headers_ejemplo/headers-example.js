// Crear un nuevo objeto Headers
const headers = new Headers();

// Establecer cabeceras
headers.set('Content-Type', 'application/json');
headers.set('Content-Encoding', 'br');

// Verificar si una cabecera está definida
console.log('Content-Type header exists:', headers.has('Content-Type')); // true
console.log('Authorization header exists:', headers.has('Authorization')); // false

// Obtener el valor de una cabecera
console.log('Content-Type value:', headers.get('Content-Type')); // application/json

// Modificar una cabecera existente
headers.set('Content-Type', 'text/html');
console.log('Updated Content-Type value:', headers.get('Content-Type')); // text/html

// Añadir un nuevo valor a una cabecera
headers.append('Cache-Control', 'no-cache');
headers.append('Cache-Control', 'max-age=3600'); // Se pueden añadir múltiples valores
console.log('Cache-Control value:', headers.get('Cache-Control')); // no-cache, max-age=3600

// Eliminar una cabecera
headers.delete('Content-Encoding');
console.log('Content-Encoding header exists:', headers.has('Content-Encoding')); // false

// Iterar sobre las cabeceras
console.log('Iterating over headers:');
for (let [key, value] of headers.entries()) {
  console.log('Header:', key, 'Value:', value);
}

// Ejemplo de uso en una solicitud fetch
fetch('https://example.com/api', {
  method: 'POST',
  headers: headers, // Usar el objeto Headers en la solicitud
  body: JSON.stringify({ key: 'value' })
})
.then(response => response.json())
.then(data => console.log('Response data:', data))
.catch(error => console.error('Error:', error));