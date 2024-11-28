//Propiedad Pública: Una propiedad pública es accesible desde fuera de la clase.

class Car {
    constructor(brand) {
        this.brand = brand; // Propiedad pública
    }
}

const myCar = new Car('Toyota');
console.log(myCar.brand); // Acceso a propiedad pública