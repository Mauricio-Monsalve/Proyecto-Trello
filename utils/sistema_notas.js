import elementos from "./elementos.js";
import {usuario} from "./sistema_usuarios.js";
import Nota from "../classes/Nota.js";
import controlador_vistas from "./controlador.js";

export function crearNota(event) {
    event.preventDefault();

    let titulo = "";
    let descripcion = "";

    titulo = elementos.inputTituloNota.value;
    descripcion = elementos.inputDescripcionNota.value;



    if(
        titulo.replaceAll(" ","") == "" ||
        descripcion.replaceAll(" ","") == ""
    ){
        alert(`Asegurate de llenar todos los campos ${usuario.actual.nombre}`);
        return;
    }

    const baseNotasExiste = localStorage.getItem("Notas");
    let baseNotas = [];

    if(baseNotasExiste) {
        baseNotas = baseNotas.concat( JSON.parse(baseNotasExiste) );
    }

    if(!usuario.actual.correo) {
        alert("Solo puedes agregar notas si ya tienes una cuenta");
        return;
    }

    const nuevaNota = new Nota(
        // baseNotas.length,
        titulo.replaceAll("<","&#60;").replaceAll(">","&#62;"),
        descripcion.replaceAll("<","&#60;").replaceAll(">","&#62;"),
        usuario.actual.correo
    );

    baseNotas.push(nuevaNota);

    localStorage.setItem("Notas", JSON.stringify(baseNotas) );

    alert("¡La nota fue agregada con exito!");

    controlador_vistas.actualizar_vista(3);

    setTimeout(() => {
        elementos.formNotes.reset();
        crearHTMLNota(nuevaNota);
    }, 500);
}

export function traerNotas(quien) {

    const baseNotasExiste = localStorage.getItem("Notas");
    let baseNotas = [];

    //ni no existe base de notas, hacer nada
    if (!baseNotasExiste) {
        return;
    }

    baseNotas = baseNotas.concat( JSON.parse(baseNotasExiste) );

    let notasUsuario = baseNotas.filter(nota => nota.correo == quien);

    if(notasUsuario.length == 0) {
        return;
    }
    crearHTMLNota(...notasUsuario);
}

export function limpiarNotas() {
    let notasEnGroupNotes = document.getElementsByClassName("memo");

    if(notasEnGroupNotes.length == 0) {
        return;
    }

    for (const notaHTML of notasEnGroupNotes) {
        notaHTML.className = "memo hide-note";
    }
}

function crearHTMLNota(...notas) {

    let textoHtml = "";

    for (const {id, titulo, descripcion, estado, eliminada} of notas) {

        let color_select = "";
        if(estado == 1) color_select = "orange";
        if(estado == 2) color_select = "green";
        if(estado == 3) color_select = "red";
        
        if(!eliminada) {

            textoHtml += `
            <div class="memo show-note" id="nota${id}">
                <div>
                    <div class="separator">
                        <strong>${titulo}</strong>
                        <div class="menu">
                            <img src="./images/3menu.svg" alt="Modificar borrar">
                            <ul>
                                <li class="btn-modificar-nota">Modificar</li>
                                <li class="btn-borrar-nota">Borrar</li>
                            </ul>
                        </div>
                    </div>
                    <p>${descripcion}</p>
                    <select style="color: ${color_select};" class="opcion${estado}">
                        <option style="color: orange;" value="1" ${estado == 1? 'selected' : ''}>Pendiente</option>
                        <option style="color: green;" value="2" ${estado == 2? 'selected' : ''}>Completo</option>
                        <option style="color: red;" value="3" ${estado == 3? 'selected' : ''}>Incompleto</option>
                    </select>
                </div>
            </div>
            `;
            setTimeout(() => {
                // document.querySelector(`#nota${id} select option:nth-child(${estado})`).removeAttribute("selected");
                document.getElementById(`nota${id}`).className = "memo";
            }, 600);
        }

    
    }
    elementos.groupNotes.innerHTML += textoHtml;

    const evento_falso = new Event("change");

    elementos.categoriaNotas.dispatchEvent(evento_falso);
}

export function cambiarEstadoNota(event) {

    if(event.target.tagName != "SELECT") return;

    //estilo del campo
    const selectDeLaNota = event.target;

    //valor en localStorage
    const idDeLaNota = selectDeLaNota.closest(".memo").id.replace("nota","");
    const nuevoEstado = selectDeLaNota.value;

    const baseNotasExiste = localStorage.getItem("Notas");
    let baseNotas = [];

    if(!baseNotasExiste) {
        alert("Error al acceder a la base de datos");
        return;
    }

    baseNotas = baseNotas.concat( JSON.parse(baseNotasExiste) );

    const indiceNotaObtenida = baseNotas.findIndex(nota => nota.id == idDeLaNota);

    if(indiceNotaObtenida == -1) {
        alert("Error al cambiar el estado de la nota");
        return;
    }

    let estado_anterior = selectDeLaNota.className.replace("opcion","");
    selectDeLaNota.querySelector(`option:nth-child(${estado_anterior})`).toggleAttribute("selected",false);

    const notaModificable = new Nota();
    notaModificable.colocarValores( baseNotas[indiceNotaObtenida] );

    let estadoPalabra = selectDeLaNota.options[ selectDeLaNota.selectedIndex ].text;
    notaModificable.cambiarEstado(estadoPalabra);
    
    baseNotas[indiceNotaObtenida] = notaModificable;
    localStorage.setItem("Notas", JSON.stringify(baseNotas) );

    selectDeLaNota.style.color = selectDeLaNota.querySelector(`option:nth-child(${nuevoEstado})`).style.color;
    
    selectDeLaNota.className = `opcion${nuevoEstado}`;
    selectDeLaNota.querySelector(`option:nth-child(${nuevoEstado})`).toggleAttribute("selected",true);

    const evento_falso = new Event("change");
    elementos.categoriaNotas.dispatchEvent(evento_falso);
}

export function filtrarNotas(event) {
    const selectDeLaNota = event.target;
    const nuevoEstado = parseInt(selectDeLaNota.value);
    selectDeLaNota.style.color = selectDeLaNota.querySelector(`option:nth-child(${nuevoEstado+1})`).style.color;

    const notasAgregadas = elementos.groupNotes.getElementsByClassName("memo");

    if(notasAgregadas.length == 0){
        return;
    }
    for (const nota of notasAgregadas) {
        const select_de_la_nota = nota.querySelector("select");
        const valor_elegido = select_de_la_nota.value;

        if(nuevoEstado == 0){
            animarNotaEspecifica(
                nota,
                true
            );
        }else{
            animarNotaEspecifica(
                nota,
                valor_elegido == nuevoEstado
            );
        }
    }
}

export function cambiarNota(event) {
    const etiqueta = event.target;

    if(etiqueta.tagName != "LI") return;

    //obtengo la nota
    const nota = etiqueta.closest(".memo");
    //obtengo el id de la nota
    const idNota = nota.id.replace("nota","");

    const baseNotasExiste = localStorage.getItem("Notas");
    let baseNotas = [];

    if(!baseNotasExiste) {
        alert("Error, la base de datos de notas no existe");
        return;
    }

    baseNotas = baseNotas.concat(JSON.parse(baseNotasExiste));

    const indiceNotaExiste = baseNotas.findIndex(n => n.id == idNota);

    if(indiceNotaExiste == -1) {
        alert("Error, la nota no existe");
        return;
    }

    if(etiqueta.className == "btn-modificar-nota") {
        desplegarModificarNota(idNota,indiceNotaExiste,baseNotas);
    }

    if(etiqueta.className == "btn-borrar-nota") {
        borrarNota(nota,idNota,indiceNotaExiste,baseNotas);
    }
}










function desplegarModificarNota(idNota, posicionNota, baseNotas) {
    elementos.tituloNotaModificar.value = baseNotas[posicionNota].titulo;
    elementos.descripcionNotaModificar.value = baseNotas[posicionNota].descripcion;
    elementos.modalNotas.classList.remove("modal-hidden");
    elementos.modalNotas.classList.add(`nota${idNota}`);
}














export function modificarNota(event) {
    event.preventDefault();


    const baseNotasExiste = localStorage.getItem("Notas");
    const baseNotas = baseNotasExiste ? JSON.parse(baseNotasExiste) : [];

    if(!baseNotas.length) { //que pasa aqui???
        alert("Error al acceder a la base de datos");
        return;
    }

    let idNota = "";

    for (const clase of elementos.modalNotas.classList) {
        if( clase.startsWith("nota") ) {
            idNota = clase;
            elementos.modalNotas.classList.remove(clase);
        }
    }
    
    const indiceNotaExiste = baseNotas.findIndex(not => not.id == idNota.replace("nota",""));
    
    if(indiceNotaExiste == -1) {
        alert("La nota que desea modificar ya no existe");
        return;
    }
    
    baseNotas[indiceNotaExiste].titulo = elementos.tituloNotaModificar.value.replaceAll("<","&#60;").replaceAll(">","&#62;");
    baseNotas[indiceNotaExiste].descripcion = elementos.descripcionNotaModificar.value.replaceAll("<","&#60;").replaceAll(">","&#62;");
    localStorage.setItem("Notas",JSON.stringify(baseNotas));
    
    const htmlNota = document.getElementById(idNota);

    elementos.modalNotas.classList.add("modal-hidden");

    setTimeout(() => {
        elementos.formModalNotas.reset();

        animarNotaEspecifica(htmlNota,false);
        setTimeout(() => {
            htmlNota.querySelector("strong").textContent = baseNotas[indiceNotaExiste].titulo;
            htmlNota.querySelector("p").textContent = baseNotas[indiceNotaExiste].descripcion;
            animarNotaEspecifica(htmlNota,true);
        }, 600);
    }, 300);
}












export function cancelarModificarNota() {
    elementos.modalNotas.classList.add("modal-hidden");

    for (const clase of elementos.modalNotas.classList) {
        if(clase.startsWith("nota")) {
            elementos.modalNotas.classList.remove(clase);
        }
    }
    

    setTimeout(() => {
        elementos.formModalNotas.reset();
    }, 300);
}








function borrarNota(elementoNota, idNota, posicionNota, baseNotas) {

    baseNotas.splice(posicionNota,1);
    localStorage.setItem("Notas",JSON.stringify(baseNotas));

    animarNotaEspecifica(elementoNota,false);
    setTimeout(() => {
        document.getElementById(`nota${idNota}`).remove();
    }, 600);

}

function animarNotaEspecifica(cual, quiero_mostrar) {
    if(quiero_mostrar) {
        //si ya tiene la clase, no animar
        if(cual.className == "memo mostrada") return;

        //le coloco la clase de animacion
        cual.className = "memo show-note";

        //si ya se animo, le quito la clase
        setTimeout(() => {
            cual.className = "memo mostrada";
        }, 600);
    }else{

        //si ya tiene la clase, no animar
        if(cual.className == "memo oculta") return;

        //le coloco la clase de animacion
        cual.className = "memo hide-note";

        //si ya se animo, le quito la clase
        setTimeout(() => {
            cual.className = "memo oculta";
        }, 600);
    }
}