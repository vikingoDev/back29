// Importar módulos nativos


const os = require('os');              // Para acceder a información del sistema operativo



// Usar 'os' para obtener información del sistema operativo
console.log('Información del sistema operativo:');
console.log('Sistema operativo:', os.type());
console.log('Versión del SO:', os.version());
console.log('Arquitectura:', os.arch());
console.log('Memoria libre (en bytes):', os.freemem());
console.log('Memoria total (en bytes):', os.totalmem());
