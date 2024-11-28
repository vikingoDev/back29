// Importar el módulo 'fs' para trabajar con el sistema de archivos
const fs = require('fs');              // Proporciona funcionalidades para leer y escribir archivos
// Importar el módulo 'path' para trabajar con rutas de archivos
const path = require('path');          // Proporciona funcionalidades para trabajar con rutas de archivos y directorios
// Importar el módulo 'util' para funcionalidades de utilidad adicionales
const util = require('util');          // Proporciona funcionalidades de utilidad diversa, como convertir funciones asíncronas en promesas

// Leer el contenido del archivo 'ejemplo.txt' de manera sincrónica
let archivo = fs.readFileSync('ejemplo.txt', 'utf-8');
// Mostrar el contenido del archivo en la consola
console.log(archivo);

// Construir la ruta completa para el archivo 'index.html' usando el módulo 'path'
const filePath = path.join(__dirname, 'index.html');

// Leer el contenido del archivo 'index.html' de manera asíncrona usando 'fs.readFile'
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        // Si ocurre un error al leer el archivo, mostrar el error en la consola
        console.error('Error leyendo el archivo:', err);
    } else {
        // Si se lee el archivo con éxito, mostrar su contenido en la consola
        console.log('Contenido del archivo index.html:', data);
    }
});

// Convertir la función asíncrona 'fs.readFile' en una función basada en promesas usando 'util.promisify'
const asyncReadFile = util.promisify(fs.readFile);

// Leer el archivo 'index.html' usando la versión basada en promesas de 'fs.readFile'
asyncReadFile(filePath, 'utf8')
    .then(data => {
        // Si la lectura del archivo es exitosa, mostrar su contenido en la consola
        console.log('Contenido del archivo (usando util.promisify):', data);
    })
    .catch(err => {
        // Si ocurre un error al leer el archivo, mostrar el error en la consola
        console.error('Error al leer el archivo (usando util.promisify):', err);
    });
