// Definimos una variable global llamada 'nombre' y le asignamos el valor 'Carlos'
let nombre = 'Carlos';

// Creamos un objeto llamado 'persona'
const persona = {
  // Propiedad 'nombre' del objeto con el valor 'Lionel'
  nombre: 'Lionel',
  
  // Propiedad 'apellido' del objeto con el valor 'Messi'
  apellido: 'Messi',
  
  // Propiedad 'edad' del objeto con el valor 35
  edad: 35,
  
  // Método 'saludar' del objeto que imprime un saludo usando la propiedad 'nombre'
  saludar: function () {
    console.log(`Hola, me llamo ${this.nombre}`);
  },
  
  // Método 'decirAdios' del objeto que imprime un mensaje de despedida
  decirAdios: function () {
    console.log('Chau!');
  }
};

// Usamos el spread operator para crear un nuevo objeto 'otraPersona'
// que copia todas las propiedades de 'persona' y luego sobreescribe
// algunas propiedades con nuevos valores
const otraPersona = {
  ...persona, // Copia todas las propiedades de 'persona'
  
  // Sobreescribe la propiedad 'nombre' con el valor 'Lionel'
  nombre: 'Leonel',
  
  // Sobreescribe la propiedad 'edad' con el valor 24
  edad: 24
};

// Modificamos la variable global 'nombre' a 'Sergio'
// Esto no afecta a las propiedades del objeto 'persona' ni 'otraPersona'
nombre = 'Sergio';

// Llamamos al método 'saludar' del objeto 'otraPersona'
// Este método usa la propiedad 'nombre' del objeto 'otraPersona'
// que es 'Lionel', por lo que la salida será: "Hola, me llamo Lionel"
otraPersona.saludar();
