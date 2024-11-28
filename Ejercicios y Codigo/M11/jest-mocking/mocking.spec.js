// externalService.spec.js
const fetchData = require('./externalService');

jest.mock('./externalService');

test('Debe retornar "data" como respuesta de la función asíncrona', async () => {
  fetchData.mockResolvedValue('data');
  
  const result = await fetchData();
  expect(result).toBe('data');
});
