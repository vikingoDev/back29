// Prueba Unitaria 
const suma = require('./suma');

test('suma 1 + 2 para que sea igual a 3', () => {
  expect(suma(1, 2)).toBe(3);
});