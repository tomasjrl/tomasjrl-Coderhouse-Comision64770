export function buscarProductos() {
  const terminoBusqueda = document
    .querySelector("#buscador")
    .value.toLowerCase();
  const productosElementos = document.querySelectorAll(
    ".js-producto-contenedor"
  );

  productosElementos.forEach((productoElemento) => {
    const marca = productoElemento.getAttribute("data-producto-marca") || "";
    const contenido =
      productoElemento.getAttribute("data-producto-contenido") || "";

    if (
      marca.toLowerCase().includes(terminoBusqueda) ||
      contenido.toLowerCase().includes(terminoBusqueda)
    ) {
      productoElemento.style.display = "";
    } else {
      productoElemento.style.display = "none";
    }
  });
  document
    .querySelector("#buscador")
    .addEventListener("input", buscarProductos);
}
