import { productos } from "../data/productos.js";
import { stockOriginal } from "../utils/proceso-compras.js";

export function actualizarStock(productoId, stockRestante) {
  const idProducto = productoId;
  const elementos = document.querySelectorAll(".id-producto");

  elementos.forEach((elemento) => {
    if (elemento.textContent === idProducto) {
      const stockElement = elemento
        .closest(".productos-informacion")
        .querySelector(".js-producto-stock");
      stockElement.innerHTML = `Stock: ${stockRestante}`;
    }
  });
}

export function restaurarStock() {
  // Código para restaurar el stock de los productos
  productos.forEach((producto) => {
    producto.stock = stockOriginal[producto.identificador] || producto.stock;
    actualizarStock(producto.identificador, producto.stock);
  });
}
