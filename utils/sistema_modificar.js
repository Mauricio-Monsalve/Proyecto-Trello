import elementos from "./elementos.js";
import controlador_vistas from "./controlador.js";
import { usuario } from "./sistema_usuarios.js";
import Usuario from "../classes/Usuario.js";
import { traerNotas } from "./sistema_notas.js";

export function guardarDatos(){

    const baseUsuariosExiste = localStorage.getItem("Usuarios");
    let baseUsuarios = [];

    if(!baseUsuariosExiste) {
        alert("Error  al acceder a la base de datos");
        return;
    }
    
    baseUsuarios = baseUsuarios.concat(JSON.parse(baseUsuariosExiste));

    const baseNotasExiste = localStorage.getItem("Notas");
    let baseNotas = [];

    if(baseNotasExiste) {
        baseNotas = baseNotas.concat(JSON.parse(baseNotasExiste));
    }

    const indiceUsuarioExiste = baseUsuarios.findIndex(usuarioBuscar => usuarioBuscar.correo = usuario.actual.correo);

    if(indiceUsuarioExiste == -1) {
        alert("Error al guardar cambios en la base de datos");
        return;
    }

    const correoTemporal = usuario.actual.correo;

    for (const clave in usuario.temporal) {
        usuario.actual[clave] = usuario.temporal[clave];
        baseUsuarios[indiceUsuarioExiste][clave] = usuario.actual[clave];
    }

    baseNotas.forEach(
        (nota) => {
            if(nota.correo == correoTemporal) {
                nota.correo = usuario.actual.correo;
            }
        }
    );

    elementos.imgHeader.src = usuario.actual.foto;

    elementos.nombrePerfilHeader.textContent = usuario.actual.nombre.replaceAll("&#60;","<").replaceAll("&#62;",">");

    localStorage.setItem("Usuarios",JSON.stringify(baseUsuarios));

    localStorage.setItem("Notas",JSON.stringify(baseNotas));

    controlador_vistas.actualizar_vista(3);

    setTimeout(() => {
        traerNotas(usuario.actual.correo);
        elementos.contCategorias.className = `cont-categorias show-category`;
    }, 500);

    usuario.temporal = {};
}
export function cancelarDatos(){
    usuario.temporal = {};
    elementos.imgHeader.src = usuario.actual.foto;
    controlador_vistas.actualizar_vista(3);
    elementos.nombrePerfilHeader.textContent = usuario.actual.nombre.replaceAll("&#60;","<").replaceAll("&#62;",">");
    setTimeout(() => {
        traerNotas(usuario.actual.correo);
        elementos.contCategorias.className = `cont-categorias show-category`;
    }, 500);
}

export function cambiarDatos() {
    elementos.nombreModificar.value = usuario.temporal.nombre;
    elementos.apellidoModificar.value = usuario.temporal.apellido;
    elementos.edadModificar.value = usuario.temporal.edad;
    elementos.correoModificar.value = usuario.temporal.correo;
    elementos.modalDatos.classList.remove("modal-hidden");
}

export function cancelarModificacion(){
    elementos.modalDatos.classList.add("modal-hidden");
    setTimeout(() => {
        elementos.formModalDatos.reset();
    }, 300);
}

export function aceptarModificacion(event) {

    event.preventDefault();

    //consultar si existe la base de datos de "Usuarios"
    const baseUsuariosExiste = localStorage.getItem("Usuarios");
    let baseUsuarios = [];

    //si no existe la base de datos, arrojar un error diciendo que no esta registrado o encontrado
    if(!baseUsuariosExiste) {
        elementos.pErrorModificar.textContent = "Error al acceder a la base de datos";
        return;
    }
    //si existe, fusionarlo con el arreglo vacio
    baseUsuarios = baseUsuarios.concat(JSON.parse(baseUsuariosExiste));

    let campoCorreo = elementos.correoModificar.value.replaceAll("<","&#60;").replaceAll(">","&#62;");

    const usuarioExistente = baseUsuarios.find(usuarioBuscar => usuarioBuscar.correo.toLowerCase() == campoCorreo.toLowerCase());

    //si el usuario existe, Y NO ES EL MISMO arrojar un error
    if(usuarioExistente) {
        if(usuarioExistente.correo != usuario.actual.correo) {
            elementos.pErrorModificar.textContent = "El nuevo correo ya fue usado por otra cuenta";
            return;
        }
    }

    //la clave anterior no es la misma
    let campoClaveAnterior = elementos.claveModificar.value.replaceAll("<","&#60;").replaceAll(">","&#62;");

    if(campoClaveAnterior != usuario.actual.clave) {
        elementos.pErrorModificar.textContent = "La clave anterior no es la misma";
        return;
    }

    //la clave nueva y su confirmacion no son la misma
    let campoClaveNueva = elementos.claveNuevaModificar.value;
    let campoClaveNuevaConfirmar = elementos.claveNuevaConfirmarModificar.value;
    if(campoClaveNueva != campoClaveNuevaConfirmar) {
        elementos.pErrorModificar.textContent = "La clave nueva y su confirmacion no son la misma";
        return;
    }

    //si todo esta bien, modificar el usuario
    elementos.pErrorModificar.textContent = "";

    usuario.temporal.nombre = elementos.nombreModificar.value.replaceAll("<","&#60;").replaceAll(">","&#62;");
    usuario.temporal.apellido = elementos.apellidoModificar.value.replaceAll("<","&#60;").replaceAll(">","&#62;");
    usuario.temporal.edad = elementos.edadModificar.value.replaceAll("<","&#60;").replaceAll(">","&#62;");
    usuario.temporal.correo = campoCorreo;
    usuario.temporal.clave = campoClaveNueva;

    elementos.nombrePerfil.textContent = usuario.temporal.nombre.replaceAll("&#60;","<").replaceAll("&#62;",">") + " " + usuario.temporal.apellido.replaceAll("&#60;","<").replaceAll("&#62;",">");;

    elementos.modalDatos.classList.add("modal-hidden");

    alert("Se ha modificado el usuario correctamente\nPresione 'Guardar' para confirmar cambios");
    setTimeout(() => {
        elementos.formModalDatos.reset();
    }, 300);
}