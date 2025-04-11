import elementos from "./elementos.js";
import controlador_vistas from "./controlador.js";
import { usuario } from "./sistema_usuarios.js";
import Usuario from "../classes/Usuario.js";

export function guardarDatos(){
    console.log("se guardo");
}
export function cancelarDatos(){
    console.log("se cancelo");
}

export function cambiarDatos() {
    elementos.modalDatos.classList.remove("modal-hidden");
}

export function cancelarModificacion(){
    elementos.modalDatos.classList.add("modal-hidden");
}

export function aceptarModificacion() {
    elementos.modalDatos.classList.add("modal-hidden");
}