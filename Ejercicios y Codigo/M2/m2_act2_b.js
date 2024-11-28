/*Propuesta B

Tenemos un array de objetos que representan órdenes de compra con los siguientes atributos: 
Por ejemplo
cliente: string

montoTotal: number

entregado: boolean

Por ejemplo:

const ordenes = [
 { cliente: 'Tomas Gutierrez', montoTotal: 260, entregado: true },
 { cliente: 'Ines Perez', montoTotal: 956, entregado: false },
 { cliente: 'Renata Echeverría', montoTotal: 1670, entregado: true }
];

Debemos filtrar todas las órdenes de compra que cumplan con la condición de tener un monto total
mayor o igual a $500 y que hayan sido entregadas (“entregado” = true)

Para solucionarlo debemos crear una función llamada filterOrders que recibe un array de entrada.

Explicación solución

Definición de la Función:

La función filterOrders toma un array de órdenes como argumento.
Método filter:

Usamos el método filter para crear un nuevo array que contiene solo los elementos que cumplen con la condición especificada en la función de callback.
La función de callback dentro de filter verifica dos condiciones:
orden.montoTotal >= 500: El monto total de la orden debe ser mayor o igual a 500.
orden.entregado: La propiedad entregado debe ser true.
Uso de la Función:

Definimos un array de órdenes de ejemplo.
Llamamos a filterOrders con el array de órdenes.
Imprimimos el resultado para verificar las órdenes que cumplen con las condiciones.
*/


function filterOrders(ordenes) {
    // Filtramos las órdenes según las condiciones dadas
    return ordenes.filter(orden => orden.montoTotal >= 500 && orden.entregado);
  }
  
  // Ejemplo de uso
  const ordenes = [
    { cliente: 'Tomas Gutierrez', montoTotal: 260, entregado: true },
    { cliente: 'Ines Perez', montoTotal: 956, entregado: false },
    { cliente: 'Renata Echeverría', montoTotal: 1670, entregado: true }
  ];
  
  // Aplicar la función filterOrders
  const resultado = filterOrders(ordenes);
  
  console.log(resultado);