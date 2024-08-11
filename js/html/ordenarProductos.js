import { productos } from "../data/productos.js";
import { generarHTMLProductos } from "./contenedor-html.js";

let ordenAlfabetico = true;

// ordeno productos alfabéticamente según la marca

export function ordenarProductos() {
  const invertido = !ordenAlfabetico;

  productos.sort((a, b) => {
    const marcaA = a?.marca;
    const marcaB = b?.marca;
    if (marcaA && marcaB) {
      const comparacion = marcaA.localeCompare(marcaB);
      return invertido ? -comparacion : comparacion;
    } else {
      // Manejar el caso en que alguno de los objetos no tenga la propiedad "marca"
      return 0; // o algún otro valor predeterminado
    }
  });
  let htmlProductos = generarHTMLProductos(productos);
  document.querySelector(".js-productos-grid").innerHTML = htmlProductos;
}
