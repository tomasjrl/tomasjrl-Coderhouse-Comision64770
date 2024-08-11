import { productos } from "../data/productos.js";
import { generarHTMLProductos } from "./contenedor-html.js";


let ordenAlfabetico = true;

export function ordenarProductos() {
  const botonOrdenar = document.querySelector(".orden-productos-svg");
  const invertido = !ordenAlfabetico;

  productos.sort((a, b) => {
    const comparacion = a.marca.localeCompare(b.marca);
    return invertido ? -comparacion : comparacion;
  });
  let htmlProductos = generarHTMLProductos(productos);
  document.querySelector(".js-productos-grid").innerHTML = htmlProductos;
}