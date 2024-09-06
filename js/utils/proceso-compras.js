/*--------------------------------------------------------------//
         FUNCIONES QUE ESTABLECEN EL PROCESO DE COMPRA
 //--------------------------------------------------------------*/

import { botonesProductos } from "./agregar-cancelar-productos.js";
import { restablecerCompra, agregarEventoBoton } from "./pagar-cancelar-compra.js";
import { recuperarEstadoBotones } from "./functions/utils-proceso-compras.js";

let tipo; // variable indefinida como estado inicial

export function procesoCompra(listadoDeCompra) {
  botonesProductos(listadoDeCompra);  
  restablecerCompra(tipo);
  agregarEventoBoton(tipo);
  agregarEventoBoton("pagar");
  agregarEventoBoton("cancelar");
  recuperarEstadoBotones();
}
