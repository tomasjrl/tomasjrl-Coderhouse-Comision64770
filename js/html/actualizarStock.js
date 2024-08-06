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
