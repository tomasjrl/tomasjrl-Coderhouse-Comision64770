/*--------------------------------------------------------------//
      PARA BUSCAR PRODUCTOS EN EL HTML
//--------------------------------------------------------------*/

export function buscarProductos() {
  const terminoBusqueda = document
    .querySelector("#buscador")
    .value.toLowerCase();
  const productosElementos = document.querySelectorAll(
    ".js-producto-contenedor"
  );

  // Obtengo todos los elementos de la clase "js-producto-contenedor"
  // Recorro todos los elementos de productos y sus atributos data

  productosElementos.forEach((productoElemento) => {
    const marca = productoElemento.getAttribute("data-producto-marca") || "";
    const contenido =
      productoElemento.getAttribute("data-producto-contenido") || "";

    // Verifico si alguno de los atributos contiene el término de búsqueda

    if (
      marca.toLowerCase().includes(terminoBusqueda) ||
      contenido.toLowerCase().includes(terminoBusqueda)
    ) {
      productoElemento.style.display = "";
    } else {
      productoElemento.style.display = "none";
    }
  });
}