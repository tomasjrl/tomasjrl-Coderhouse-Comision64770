import { productos } from "../data/productos.js";
import { generarHTMLProductos } from "./contenedor-html.js";

let ordenAlfabetico = true;

// funcion para ordenar los productos

function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j].marca.localeCompare(arr[j + 1].marca) > 0) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// ordeno productos alfabéticamente según la marca

export function ordenarProductos() {
  const invertido = !ordenAlfabetico;
  const ordenado = invertido ? bubbleSort(productos).reverse() : bubbleSort(productos);
  let htmlProductos = generarHTMLProductos(ordenado);
  document.querySelector(".js-productos-grid").innerHTML = htmlProductos;
}