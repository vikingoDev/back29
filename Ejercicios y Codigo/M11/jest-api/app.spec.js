// app.test.js
const request = require('supertest');
const app = require('./app');

describe('POST /products', () => {
  it('Debe almacenar un nuevo producto con nombre y precio', async () => {
    const response = await request(app)
      .post('/products')
      .send({ name: 'Producto de prueba', price: 100 })
      .expect('Content-Type', /json/)
      .expect(201);
    
    expect(response.body.name).toBe('Producto de prueba');
    expect(response.body.price).toBe(100);
  });

  it('Debe retornar 400 si falta el nombre o precio', async () => {
    const response = await request(app)
      .post('/products')
      .send({ name: 'Producto sin precio' })
      .expect(400);

    expect(response.body.error).toBe('El nombre y precio son requeridos');
  });
});
