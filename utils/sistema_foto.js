import elementos from "./elementos.js";
import { usuario } from "./sistema_usuarios.js";

export function cambiarFoto() {
    let nuevaFoto = prompt("Ingresa el enlace a la nueva foto");
    
    if(nuevaFoto == null){
        return;
    }

    const fotoPrueba = new Image();

    
    fotoPrueba.onload = () => {
        elementos.imgPhoto.src = nuevaFoto;
        usuario.temporal.foto = nuevaFoto;
    };
    
    fotoPrueba.onerror = () => {
        alert("Url no valido");
    };
    
    fotoPrueba.src = nuevaFoto;


    // if(nuevaFoto.replaceAll(" ","") == "") {
    //     alert("Url no valido");
    //     return;
    // }

    
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