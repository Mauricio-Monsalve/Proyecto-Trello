import Plantilla from "./Plantilla.js";

class Nota extends Plantilla {
    constructor(titulo = new String , descripcion = new String, correo = new String){
        super();
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.correo = correo;
        //1 Pendinete
        //2 Completo
        //3 Incompleto
        this.estado = 1;
        // this.eliminada = false;
    }
    cambiarEstado(nuevo_estado){
        switch (nuevo_estado) {
            case "Pendiente":
                this.estado = 1;
                break;
            case "Completo":
                this.estado = 2;
                break;
            case "Incompleto":
                this.estado = 3;
                break;
            default:
                throw new Error(`Error: trataste de ingresar '${nuevo_estado}', pero los valores validos son 'Pendiente', 'Completo' o 'Incompleto'`);
        }
    }
    colocarValores(objeto){
        for (const clave in this) {
            this[clave] = objeto[clave];
        }
    }
}

// let nota = new Nota();
// nota.cambiarEstado("eeeee")
// console.log(nota.estado)
// nota.cambiarEstado("Completo")
// console.log(nota.estado)

export default Nota;