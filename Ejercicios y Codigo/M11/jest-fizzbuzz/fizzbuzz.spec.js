// fizzbuzz.spec.js
const fizzBuzz = require('./fizzbuzz');

describe('Pruebas de FizzBuzz', () => {
  it('Debe devolver "Fizz" si el número es divisible por 3', () => {
    expect(fizzBuzz(3)).toBe('Fizz');
  });

  it('Debe devolver "Buzz" si el número es divisible por 5', () => {
    expect(fizzBuzz(5)).toBe('Buzz');
  });

  it('Debe devolver "FizzBuzz" si el número es divisible por 3 y 5', () => {
    expect(fizzBuzz(15)).toBe('FizzBuzz');
  });

  it('Debe devolver el número si no es divisible ni por 3 ni por 5', () => {
    expect(fizzBuzz(7)).toBe(7);
  });
});
