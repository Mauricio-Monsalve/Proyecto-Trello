const elementos = {

    //elementos del header
    header : document.querySelector("header"),
    nombrePerfilHeader : document.querySelector(".header-right span"),
    imgHeader : document.querySelector("header .header-right .user-image"),
    headerMobileCheck: document.querySelector("header .header-right label input"),
    headerLiConfig : document.getElementById("headerLiConfig"),
    headerLiExit : document.getElementById("headerLiExit"),

    //contenedor principal
    divMain : document.getElementById("cont-regis"),
    divNotes : document.getElementById("cont-notes"),
    
    //elementos del login
    seccionLogin : document.getElementById("sect-login"),
    formLogin : document.getElementById("form-login"),
    correoLogin : document.getElementById("inputEmail"),
    claveLogin : document.getElementById("inputPass"),
    pErrorLogin : document.querySelector("#sect-login .error-p"),
    aLinkToRegis : document.querySelector("#sect-login .link-change"),
    
    //elementos del registro
    seccionRegis : document.getElementById("sect-regis"),
    formRegis : document.getElementById("form-regis"),
    nombreRegis : document.getElementById("inputName"),
    apellidoRegis : document.getElementById("inputLastName"),
    edadRegis : document.getElementById("inputAge"),
    correoRegis : document.getElementById("inputRegEmail"),
    claveRegis : document.getElementById("inputRegPass"),
    claveConfirmRegis : document.getElementById("inputRegPassConfirm"),
    pErrorRegis : document.querySelector("#sect-regis .error-p"),
    aLinkToLogin : document.querySelector("#sect-regis .link-change"),
    
    //elementos de cambio de foto
    seccionPhoto : document.getElementById("sect-photo"),
    nombrePerfil : document.querySelector("#sect-photo h2"),
    imgPhoto : document.querySelector("#sect-photo .user-image"),
    btnDataChange : document.getElementById("btnDataChange"),
    btnDataCancel : document.getElementById("btnDataCancel"),
    btnDataSave : document.getElementById("btnDataSave"),
    
    //elementos notas
    formNotes : document.getElementById("form-notes"),
    inputTituloNota: document.getElementById("note-title-input"),
    inputDescripcionNota: document.getElementById("note-desc-input"),
    contCategorias : document.querySelector(".cont-categorias"),
    categoriaNotas : document.getElementById("agruparNotas"),
    groupNotes : document.getElementById("notes"),

    //modal modificar datos
    modalDatos : document.querySelector(".modal-datos"),
    formModalDatos: document.querySelector(".modal-datos form"),
    nombreModificar: document.getElementById("inputModName"),
    apellidoModificar: document.getElementById("inputModLastName"),
    edadModificar: document.getElementById("inputModAge"),
    correoModificar: document.getElementById("inputModEmail"),
    claveModificar: document.getElementById("inputModLastPass"),
    claveNuevaModificar: document.getElementById("inputModNewPass"),
    claveNuevaConfirmarModificar: document.getElementById("inputModNewPassConfirm"),
    cancelarModificar: document.querySelector(".modal-datos form button[type='button']"),
    pErrorModificar: document.querySelector(".modal-datos .error-p"),

    //modal modificar notas
    modalNotas: document.querySelector(".modal-notas"),
    formModalNotas: document.querySelector(".modal-notas form"),
    tituloNotaModificar: document.getElementById("mod-note-title-input"),
    descripcionNotaModificar: document.getElementById("mod-note-desc-input"),
    cancelarNotaModificar: document.querySelector(".modal-notas form button[type='button']"),
};

export default elementos;
