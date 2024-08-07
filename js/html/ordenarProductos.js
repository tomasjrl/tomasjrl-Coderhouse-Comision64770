import { productos } from "../data/productos.js";
import { generarHTMLProductos } from "./contenedor-html.js";

document.addEventListener("DOMContentLoaded", function () {
  const botonOrdenar = document.querySelector(".orden-productos-svg");
  botonOrdenar.addEventListener("click", ordenarProductos);
});

let ordenAlfabetico = true;

export function ordenarProductos() {
  const botonOrdenar = document.querySelector(".orden-productos-svg");
  const invertido = !ordenAlfabetico;

  productos.sort((a, b) => {
    const comparacion = a.marca.localeCompare(b.marca);
    return invertido ? -comparacion : comparacion;
  });

  ordenAlfabetico = invertido;
  botonOrdenar.classList.toggle("invertido", invertido);
  localStorage.setItem("ordenInvertido", invertido);

  let htmlProductos = generarHTMLProductos(productos);
  document.querySelector(".js-productos-grid").innerHTML = htmlProductos;
}