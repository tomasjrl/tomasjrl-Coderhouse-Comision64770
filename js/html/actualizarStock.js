import { productos } from "../data/productos.js";

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
  document.querySelectorAll(".id-producto").forEach((elemento) => {
    const idProducto = elemento.textContent;
    const stockElement = elemento
      .closest(".productos-informacion")
      .querySelector(".js-producto-stock");
    stockElement.innerHTML = `Stock: ${
      productos.find((producto) => producto.identificador === idProducto).stock
    }`;
  });
}

export function actualizarTextoPopup(listadoDeCompra) {
  const listadoDeComprasTexto =
    listadoDeCompra.length === 0
      ? "Listado de Compra:"
      : listadoDeCompra
          .map((producto) => {
            return `
        ${producto.productoMarca} 
        ${producto.productoContenido} 
        ${producto.productoMedida}
        $${producto.productoPrecio}
        Unidades: ${producto.productoUnidades}
        Sub-Total: $${producto.productoSubtotal}
      `;
          })
          .join("______________");

  document.getElementById("texto-popup").value = listadoDeComprasTexto;
}
