import { botonesProductos } from "./boton-agregar.js";
import { restablecerCompra, agregarEventoBoton } from "./boton-pagar.js";
import { recuperarEstadoBotones } from "./functions/proceso-compras-utils.js";

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

  recuperarEstadoBotones();
}
