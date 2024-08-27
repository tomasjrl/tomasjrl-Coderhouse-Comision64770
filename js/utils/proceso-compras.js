import { botonesProductos } from "./boton-agregar.js";
import { restablecerCompra, agregarEventoBoton } from "./boton-pagar.js";


let tipo; // variable "tipo" indefinida como estado inicial

export function procesoCompra(listadoDeCompra) {
  
  /*--------------------------------------------------------------//
     BOTÓN PARA AGREGAR / CANCELAR PRODUCTO AL LISTADO DE COMPRA
  //--------------------------------------------------------------*/

  botonesProductos(listadoDeCompra);

  /*--------------------------------------------------------------//
     BOTÓN PARA PAGAR / CANCELAR LA COMPRA TOTAL
  //--------------------------------------------------------------*/

  restablecerCompra(tipo);
  agregarEventoBoton(tipo);
  agregarEventoBoton("pagar");
  agregarEventoBoton("cancelar");


    /*--------------------------------------------------------------//
     RECUPERO ESTADO DE BOTONES DESDE LOCALSTORAGE
  //--------------------------------------------------------------*/

  document.querySelectorAll(".js-boton-agregar-producto").forEach((boton) => {
    const productoId = boton.dataset.productoId;
    const estadoBoton = localStorage.getItem(`boton-${productoId}`);

    if (estadoBoton === "cancelar") {
      boton.innerHTML = "CANCELAR";
      boton.classList.add("js-boton-cancelar-producto");
      boton.classList.remove("js-boton-agregar-producto");
    }
  });
}
