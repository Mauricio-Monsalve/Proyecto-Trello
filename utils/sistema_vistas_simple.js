import elementos from "./elementos.js";
import controlador_vistas from "./controlador.js";
import { usuario } from "./sistema_usuarios.js";
import { limpiarNotas } from "./sistema_notas.js";

export function configuracion() {
    for (const clave in usuario.actual) {
        usuario.temporal[clave] = usuario.actual[clave];
    }
    elementos.imgPhoto.src = usuario.actual.foto;
    elementos.nombrePerfil.textContent = usuario.actual.nombre.replaceAll("&#60;","<").replaceAll("&#62;",">") + " " + usuario.actual.apellido.replaceAll("&#60;","<").replaceAll("&#62;",">");
    limpiarNotas();
    elementos.header.querySelector(".header-right").classList.add("hide-list");
    elementos.headerMobileCheck.checked = false;
    elementos.contCategorias.className = `cont-categorias hide-category`;
    setTimeout(() => {
        controlador_vistas.actualizar_vista(2);
        elementos.groupNotes.innerHTML = "";
        // elementos.formNotes.reset();

        setTimeout(() => {
            elementos.header.querySelector(".header-right").classList.remove("hide-list");
        }, 600);

    }, 600);
}

export function salir() {
    usuario.actual = {};
    elementos.nombrePerfil.textContent = "";
    elementos.imgPhoto.src = "";
    limpiarNotas();
    elementos.header.querySelector(".header-right").classList.add("hide-list");
    elementos.headerMobileCheck.checked = false;
    elementos.contCategorias.className = `cont-categorias hide-category`;
    setTimeout(() => {
        elementos.formNotes.reset();
        controlador_vistas.actualizar_vista(0);
        elementos.groupNotes.innerHTML = "";

        setTimeout(() => {
            elementos.nombrePerfilHeader.textContent = "";
            elementos.header.querySelector(".header-right").classList.remove("hide-list");
        }, 600);

    }, 600);
}

export function login() {
    controlador_vistas.actualizar_vista(0);
    setTimeout(() => {
        elementos.formRegis.reset();
        elementos.pErrorRegis.textContent = "";
    }, 500);
}

export function regis() {
    controlador_vistas.actualizar_vista(1);
    setTimeout(() => {
        elementos.formLogin.reset();
        elementos.pErrorLogin.textContent = "";
    }, 500);
}