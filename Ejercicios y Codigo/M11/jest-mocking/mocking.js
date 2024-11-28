// Mocking de Funciones Asíncronas 
//Si necesitas probar funciones asíncronas que dependen de una API 
//o servicio externo, puedes simular la respuesta usando Jest mocks.
// externalService.js
async function fetchData() {
    return new Promise((resolve) => setTimeout(() => resolve('data'), 100));
  }
  
  module.exports = fetchData;
  