import { productos } from "../data/productos.js";
import { actualizarCuentas } from "./functions/cuenta-compras-utils.js";

let unidadesDeCompras = 0;
let subtotalDeCompras = 0;

// variable donde se almacenan los objetos de compra con sus valores y cantidades asignadas

export let listadoDeCompra = [];

if (
  localStorage.getItem("listadoDeCompra") &&
  localStorage.getItem("listadoDeCompra") !== "Listado de Compra:"
) {
  const stringifiedListadoDeCompra = localStorage.getItem("listadoDeCompra");
  const listadoDeCompraObjeto = JSON.parse(stringifiedListadoDeCompra);
  listadoDeCompra = listadoDeCompraObjeto;
}

// función para sumar la cantidad de productos y el subtotal respecto de su precio por unidad

export function actualizarTotales() {
  actualizarCuentas(
    unidadesDeCompras,
    subtotalDeCompras,
    listadoDeCompra,
    productos
  );
}
