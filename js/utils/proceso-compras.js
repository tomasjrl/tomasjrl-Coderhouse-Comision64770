import { botonesProductos } from "./boton-agregar.js";
import { restablecerCompra, agregarEventoBoton } from "./boton-pagar.js";

let tipo = null;

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

  // Recuperar el estado de los botones desde localStorage

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
