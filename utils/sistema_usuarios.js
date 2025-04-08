import elementos from "./elementos.js";
import controlador_vistas from "./controlador.js";
import Usuario from "../classes/Usuario.js";

export const usuario = { actual: {} };

export function registrarUsuario(event) {
    event.preventDefault();
    //verificamos si el arreglo de usuarios existe
    const baseUsuariosExiste = localStorage.getItem("Usuarios");
    let baseUsuarios = [];

    // si el arreglo existe, quiere decir que probablemente tenga usuarios ya registrados dentro
    if(baseUsuariosExiste) {
        //fusionamos el arreglo vacio con el arreglo traido del localstorage
        baseUsuarios = baseUsuarios.concat(JSON.parse(baseUsuariosExiste));

        //buscamos en dicho arreglo si existe un usuario ya registrado con el correo que pusimos en el campo de registro
        const usuarioExistente = baseUsuarios.find(usuario => usuario.correo == elementos.correoRegis.value);

        //si el usuario existe, arrojar un error
        if(usuarioExistente) {
            elementos.pErrorRegis.textContent = "Ya hay un usuario registrado con este correo";
            return;
        }
    }

    //sin importar si existe o no el arreglo, preguntamos si la clave de confirmacion es la misma
    if( elementos.claveRegis.value != elementos.claveConfirmRegis.value ) {
        elementos.pErrorRegis.textContent = "La contraseña debe ser la misma";
        return;
    }
    //si no hay ningun error, vaciamos el parrafo de error
    elementos.pErrorRegis.textContent ="";
    //tambien creamos un objeto con los datos a guardar
    const usuarioGuardar = new Usuario(
        // baseUsuarios.length,
        elementos.nombreRegis.value.replaceAll("<","&#60;").replaceAll(">","&#62;"),
        elementos.apellidoRegis.value.replaceAll("<","&#60;").replaceAll(">","&#62;"),
        elementos.edadRegis.value.replaceAll("<","&#60;").replaceAll(">","&#62;"),
        elementos.correoRegis.value.replaceAll("<","&#60;").replaceAll(">","&#62;"),
        elementos.claveRegis.value.replaceAll("<","&#60;").replaceAll(">","&#62;"),
        "./images/userDefault.svg"
    );
    //sin importar si el arreglo existe o no, agregamos el usuario al arreglo
    baseUsuarios.push(usuarioGuardar);

    //localstorage no entiende los arreglos, asi que lo convertimos en JSON
    const stringBaseUsuarioConUsuarioGuardado = JSON.stringify(baseUsuarios);

    //guardamos el JSON bajo la clave "Usuarios", ya que no queremos mezclar los usuarios con las notas, ambos estaran en arreglos
    localStorage.setItem("Usuarios", stringBaseUsuarioConUsuarioGuardado);

    //luego de haber guardado en localstorage, felicitamos al usuario
    alert("¡Usuario registrado con exito!");
    //borramos los campos
    setTimeout(() => {
        elementos.formRegis.reset();
    }, 500);
    //ayudamos al usuario colocandole el correo en el formLogin
    elementos.correoLogin.value = usuarioGuardar.correo;
    //nos vamo pa form login
    controlador_vistas.actualizar_vista(0);
}

export function ingresarUsuario(event) {
    event.preventDefault();

    //consultar si existe la base de datos de "Usuarios"
    const baseUsuariosExiste = localStorage.getItem("Usuarios");
    let baseUsuarios = [];

    //si no existe la base de datos, arrojar un error diciendo que no esta registrado o encontrado
    if(!baseUsuariosExiste) {
        elementos.pErrorLogin.textContent = "Usuario no encontrado";
        return;
    }
    //si existe, fusionarlo con el arreglo vacio
    baseUsuarios = baseUsuarios.concat(JSON.parse(baseUsuariosExiste));

    let campoCorreo = elementos.correoLogin.value.replaceAll("<","&#60;").replaceAll(">","&#62;");

    const usuarioExistente = baseUsuarios.find(usuarioBuscar => usuarioBuscar.correo == campoCorreo);

    //si el usuario no existe, arrojar un error
    if(!usuarioExistente) {
        elementos.pErrorLogin.textContent = "Usuario no encontrado";
        return;
    }

    let campoClave = elementos.claveLogin.value.replaceAll("<","&#60;").replaceAll(">","&#62;");

    

    //verificar si la clave registrada es la misma que en el campo de texto
    if(usuarioExistente.clave != campoClave) {
        elementos.pErrorLogin.textContent = "Contraseña incorrecta";
        return;
    }

    elementos.pErrorLogin.textContent = "";

    alert(`¡Bienvenido/a ${usuarioExistente.nombre.replaceAll("&#60;","<").replaceAll("&#62;",">")}!`);
    usuario.actual = usuarioExistente;
    elementos.imgPhoto.src = usuario.actual.foto;
    elementos.nombrePerfil.textContent = usuario.actual.nombre.replaceAll("&#60;","<").replaceAll("&#62;",">") + " " + usuario.actual.apellido.replaceAll("&#60;","<").replaceAll("&#62;",">");

    setTimeout(() => {
        elementos.formLogin.reset();
    }, 500);

    controlador_vistas.actualizar_vista(2);
}
