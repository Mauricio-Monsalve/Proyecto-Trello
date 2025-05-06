import elementos from "./utils/elementos.js";
import controlador_vistas from "./utils/controlador.js";
import { registrarUsuario, ingresarUsuario } from "./utils/sistema_usuarios.js";
import { aceptarModificarFoto, cambiarFoto, cambiarFotoFile, cambiarFotoUrl, cancelarModificarFoto } from "./utils/sistema_foto.js";
import * as irA from "./utils/sistema_vistas_simple.js";
import { cambiarEstadoNota, cambiarNota, cancelarModificarNota, crearNota, filtrarNotas, modificarNota } from "./utils/sistema_notas.js";
import { guardarDatos, cancelarDatos, cambiarDatos, aceptarModificacion, cancelarModificacion } from "./utils/sistema_modificar.js";

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

elementos.btnDataCancel.addEventListener("click",cancelarDatos);

elementos.imgPhoto.addEventListener("click",cambiarFoto);

elementos.btnDataChange.addEventListener("click",cambiarDatos);

elementos.cancelarModificar.addEventListener("click",cancelarModificacion);

elementos.formModalDatos.addEventListener("submit",aceptarModificacion);

elementos.btnDataSave.addEventListener("click",guardarDatos);

elementos.formNotes.addEventListener("submit",crearNota);

elementos.categoriaNotas.addEventListener("change",filtrarNotas);

elementos.groupNotes.addEventListener("change",cambiarEstadoNota);

elementos.groupNotes.addEventListener("click",cambiarNota);

elementos.formModalNotas.addEventListener("submit",modificarNota);

elementos.cancelarNotaModificar.addEventListener("click",cancelarModificarNota);

elementos.btnCancelarChangeImage.addEventListener("click",cancelarModificarFoto);

elementos.btnChangeUrlFoto.addEventListener("click",cambiarFotoUrl);

elementos.btnChangeFileFoto.addEventListener("change",cambiarFotoFile);

elementos.formModalFoto.addEventListener("submit",aceptarModificarFoto);