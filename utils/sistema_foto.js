import elementos from "./elementos.js";
import { usuario } from "./sistema_usuarios.js";
import extractFrom from "extract-uri-image";

export function cambiarFoto() {
    elementos.changeImagePreview.src = elementos.imgPhoto.src;
    elementos.modalFoto.classList.remove("modal-hidden");
}

export function cancelarModificarFoto() {
    elementos.modalFoto.classList.add("modal-hidden");
    setTimeout(() => {
        elementos.changeImagePreview.src = "./images/userDefault.svg";
        elementos.formModalFoto.reset();
    }, 300);
}

export function cambiarFotoUrl() {
    let nuevaFoto = prompt("Ingresa el enlace a la nueva foto");
    
    if(nuevaFoto == null){
        return;
    }

    const fotoPrueba = new Image();

    
    fotoPrueba.onload = async () => {
        try {
            const resultado = await extractFrom.url(nuevaFoto);
            elementos.changeImagePreview.src = resultado;
        } catch (error) {
            elementos.changeImagePreview.src = error;
        }
    };
    
    fotoPrueba.onerror = () => {
        alert("Url no valido");
    };
    
    fotoPrueba.src = nuevaFoto;
    
}

export async function cambiarFotoFile(event) {

    const input = event.target;

    if(input.files[0] == undefined) return;

    try {
        const resultado = await extractFrom.input(input);
        elementos.changeImagePreview.src = resultado;
    } catch (error) {
        elementos.changeImagePreview.src = error;
    }
    
}

export function aceptarModificarFoto(event) {
    event.preventDefault();

    const baseUsuariosExiste = localStorage.getItem("Usuarios");
    let baseUsuarios = [];

    if(!baseUsuariosExiste) {
        alert("Error al acceder a la base de datos");
        return;
    }

    baseUsuarios = baseUsuarios.concat(JSON.parse(baseUsuariosExiste));

    const usuarioExistente = baseUsuarios.find(
        usuarioBuscar => usuarioBuscar.correo.toLowerCase() == usuario.actual.correo.toLowerCase()
    );

    if(!usuarioExistente) {
        alert("Error al cambiar la foto de perfil");
        return;
    }

    usuario.temporal.foto = elementos.changeImagePreview.src;

    elementos.imgPhoto.src = usuario.temporal.foto;

    elementos.modalFoto.classList.add("modal-hidden");

    alert("Se ha modificado la foto de perfil correctamente\nPresione 'Guardar' para confirmar cambios");

    setTimeout(() => {
        elementos.formModalFoto.reset();
    }, 300);
}

// export function cancelarCambioFoto() {
//     elementos.imgHeader.src = usuario.actual.foto;
//     controlador_vistas.actualizar_vista(3);
//     elementos.nombrePerfilHeader.textContent = usuario.actual.nombre.replaceAll("&#60;","<").replaceAll("&#62;",">");
//     setTimeout(() => {
//         traerNotas(usuario.actual.correo);
//         elementos.contCategorias.className = `cont-categorias show-category`;
//     }, 500);
// }

// export function guardarCambioFoto() {
//     //extraer el URL de la foto
//     let extraerURL = elementos.imgPhoto.src;
    
//     //buscar en el localstorage la base de datos de usuarios
//     const baseUsuariosExiste = localStorage.getItem("Usuarios");
//     let baseUsuarios = [];

//     //si no existe, error
//     if(!baseUsuariosExiste) {
//         alert("Error  al acceder a la base de datos");
//         return;
//     }

//     //fusionar arreglo vacio con la base de datos
//     baseUsuarios = baseUsuarios.concat(JSON.parse(baseUsuariosExiste));

//     //buscar indice o posicion del usuario
//     const indiceUsuarioExistente = baseUsuarios.findIndex(usuarioBuscar => usuarioBuscar.correo == usuario.actual.correo);

//     //si el indice es -1 (es decir, no lo encontro), dar error
//     if(indiceUsuarioExistente == -1) {
//         alert("Error al cambiar la foto de perfil");
//         return;
//     }

//     baseUsuarios[indiceUsuarioExistente].foto = extraerURL;

//     usuario.actual.foto = extraerURL;

//     elementos.imgHeader.src = extraerURL;

//     elementos.nombrePerfilHeader.textContent = usuario.actual.nombre.replaceAll("&#60;","<").replaceAll("&#62;",">");

//     localStorage.setItem("Usuarios",JSON.stringify(baseUsuarios));

//     controlador_vistas.actualizar_vista(3);

//     setTimeout(() => {
//         traerNotas(usuario.actual.correo);
//         elementos.contCategorias.className = `cont-categorias show-category`;
//     }, 500);
// }