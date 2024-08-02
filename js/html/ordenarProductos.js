import { productos } from "../data/productos.js";
import { generarHTMLProductos } from "./contenedor-html.js";

export function ordenarProductos() {
  productos.sort((a, b) => a.marca.localeCompare(b.marca));
  let htmlProductos = generarHTMLProductos(productos);
  document.querySelector(".js-productos-grid").innerHTML = htmlProductos;
}
