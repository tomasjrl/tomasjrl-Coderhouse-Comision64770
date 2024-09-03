/*--------------------------------------------------------------//
     FUNCIONES PARA OBTENER LA LISTA DE PRODUCTOS ADQUIRIDOS
 //--------------------------------------------------------------*/

import { productos } from "../data/productos.js";
import { actualizarCuentas } from "./functions/cuenta-compras-utils.js";

let unidadesDeCompras = 0;
let subtotalDeCompras = 0;

export let listadoDeCompra = [];

if (
  localStorage.getItem("listadoDeCompra") &&
  localStorage.getItem("listadoDeCompra") !== "Listado de Compra:"
) {
  const stringifiedListadoDeCompra = localStorage.getItem("listadoDeCompra");
  const listadoDeCompraObjeto = JSON.parse(stringifiedListadoDeCompra);
  listadoDeCompra = listadoDeCompraObjeto;
}

export function actualizarTotales() {
  actualizarCuentas(
    unidadesDeCompras,
    subtotalDeCompras,
    listadoDeCompra,
    productos
  );
}
