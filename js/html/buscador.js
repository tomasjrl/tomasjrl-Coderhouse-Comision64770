
// código para filtrar la visualización de los productos según los parámetros asignados en el cuadro de búsqueda


export function buscarProductos() {

  // "escucha" lo que escrito por el usuario en el cuadro de búsqueda en el navegador
  // pone en variable productosElementos a todos los productos encontrados con la clase ".js-producto-contenedor"
  const terminoBusqueda = document
    .querySelector("#buscador")
    .value.toLowerCase();
  const productosElementos = document.querySelectorAll(
    ".js-producto-contenedor"
  );


    // busca en cada carta de producto si los paramétros coinciden o no
  productosElementos.forEach((productoElemento) => {
    const marca = productoElemento.getAttribute("data-producto-marca") || "";
    const contenido =
      productoElemento.getAttribute("data-producto-contenido") || "";

    if (

      // pasa todo a minuscula para hacer la comparación entre lo escrito por el usuario y los productos
      marca.toLowerCase().includes(terminoBusqueda) ||
      contenido.toLowerCase().includes(terminoBusqueda)
    ) {

      // los productos que coincidan con los parámetros de búsqueda se muestran en el navegador
      productoElemento.style.display = "";
    } else {

            // los productos que NO coincidan con los parámetros de búsqueda se ocultan del navegador
      productoElemento.style.display = "none";
    }
  });

  // "escucha" cuando el usuario interactúe con el buscador de productos.
  document
    .querySelector("#buscador")
    .addEventListener("input", buscarProductos);
}
