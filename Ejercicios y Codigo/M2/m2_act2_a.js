/*
Tenemos un array de objetos que representan datos de productos con los siguientes atributos: nombre precio stock. 
Por ejemplo: 
                      
const productos = [
 { nombre: 'Gaseosa 1.5L', stock: 46, precio: 1000 },
 { nombre: 'Chocolate', stock: 9, precio: 80 },
 { nombre: 'Chicles', stock: 19, precio: 50 }
];
Debemos agregar y calcular una nueva propiedad llamada "impuesto", 
la cual debe ser del 30% con base al precio base. 
Por ejemplo si aplicamos el 30% de impuestos para un producto con precio de $1000 el resultado será de $300, 
o para un producto con precio de $500 el resultado será $150.

Para solucionarlo debemos encontrar una función llamada addNewAttr 
que recibe un parámetro de entrada un array de objetos, 
la cual debe agregar esta nueva propiedad “impuesto” a cada objeto del array

Paso a Paso
Definir la Función addNewAttr:

La función tomará un array de objetos como parámetro.
Cada objeto en el array representa un producto con propiedades nombre, precio y stock.
Debe agregar una nueva propiedad impuesto a cada objeto, que será el 30% del valor del precio.
Calcular el Impuesto:

El impuesto se calcula como precio * 0.30.
Agregar la Propiedad impuesto:

Iterar sobre cada objeto en el array y calcular el impuesto.
Asignar el valor del impuesto a la propiedad impuesto de cada objeto.*/
const productos = [
    { nombre: 'Gaseosa 1.5L', stock: 46, precio: 1000 },
    { nombre: 'Chocolate', stock: 9, precio: 80 },
    { nombre: 'Chicles', stock: 19, precio: 50 }
  ];
  
  // Función para agregar la propiedad 'impuesto' a cada producto
  function agregarImpuesto(arrayProductos) {
    // Iterar sobre cada producto en el array
     // Calcular el impuesto como el 30% del precio
    arrayProductos.forEach(producto => {producto.impuesto = producto.precio * 0.30;});
  }
  
  // Llamar a la función para agregar la propiedad 'impuesto'
  agregarImpuesto(productos);
    // Imprimir el array para verificar el resultado
  console.log(productos);