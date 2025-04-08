import Plantilla from "./Plantilla.js";

class Usuario extends Plantilla {
    constructor( nombre, apellido, edad, correo, clave, foto ) {
        super();
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.correo = correo;
        this.clave = clave;
        this.foto = foto;
    }
}

export default Usuario;