import elementos from "./elementos.js";

const controlador_vistas = {
    actualizar_vista(cual_vista) {

        this.animar("hide-card");

        setTimeout(() => {
            //vista 0 es login
            elementos.seccionLogin.style.display = cual_vista == 0 ? "flex" : "none";
            //vista 1 es regis
            elementos.seccionRegis.style.display = cual_vista == 1 ? "flex" : "none";
            //vista 2 es photo
            elementos.seccionPhoto.style.display = cual_vista == 2 ? "flex" : "none";
            //vista 3 es dashboard
            elementos.header.style.top = cual_vista == 3 ? "0" : "-60px";
            elementos.divMain.style.display = cual_vista == 3 ? "none" : "flex";
            elementos.divNotes.style.display = cual_vista == 3 ? "flex" : "none";
            
            this.animar("show-card");
        }, 500);
    },
    animar(mostrar_ocultar) {
        elementos.divMain.className = `cont-regis ${mostrar_ocultar}`;
        elementos.formNotes.className = `${mostrar_ocultar}`;
    },
};

export default controlador_vistas;