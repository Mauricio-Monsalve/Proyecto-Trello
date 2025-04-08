import elementos from "./utils/elementos.js";
import controlador_vistas from "./utils/controlador.js";
import { registrarUsuario, ingresarUsuario } from "./utils/sistema_usuarios.js";
import { cambiarDatos, cancelarCambioFoto, guardarCambioFoto } from "./utils/sistema_foto.js";
import * as irA from "./utils/sistema_vistas_simple.js";
import { cambiarEstadoNota, cambiarNota, crearNota, filtrarNotas } from "./utils/sistema_notas.js";

window.addEventListener("resize",() => {
    const mediaQuery = window.matchMedia("(max-aspect-ratio: 4/5)");
    elementos.header.querySelector(".header-right ul").style.display = mediaQuery.matches ? "flex" : "none";
    setTimeout(() => {
        elementos.header.querySelector(".header-right ul").style.display = "flex";
    }, 1);
});

controlador_vistas.actualizar_vista(0);


elementos.headerLiConfig.addEventListener("click",irA.configuracion);

elementos.headerLiExit.addEventListener("click",irA.salir);

elementos.aLinkToLogin.addEventListener("click",irA.login);

elementos.aLinkToRegis.addEventListener("click",irA.regis);

elementos.formRegis.addEventListener("submit",registrarUsuario);

elementos.formLogin.addEventListener("submit",ingresarUsuario);

elementos.btnPhotoCancel.addEventListener("click",cancelarCambioFoto);

elementos.btnDataChange.addEventListener("click",cambiarDatos);

elementos.btnPhotoSave.addEventListener("click",guardarCambioFoto);

elementos.formNotes.addEventListener("submit",crearNota);

elementos.categoriaNotas.addEventListener("change",filtrarNotas);

elementos.groupNotes.addEventListener("change",cambiarEstadoNota);

elementos.groupNotes.addEventListener("click",cambiarNota);

// patchEliminarNotas();

// function patchEliminarNotas() {

//     //Verificamos si la base de datos existe
//     let baseNotas = localStorage.getItem("Notas");
//     if(!baseNotas) return;
//     baseNotas = JSON.parse( baseNotas );
//     if(!baseNotas) return;

//     //Si no tienen la propiedad "eliminada", la agregamos forzosamente
//     baseNotas.forEach(nota => {
//         if(nota.eliminada == undefined) {
//             nota.eliminada = false;
//         }
//     });

//     //Actualizamos la base de datos
//     localStorage.setItem("Notas", JSON.stringify(baseNotas) );
// }