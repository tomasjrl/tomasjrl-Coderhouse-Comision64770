/*--------------------------------------------------------------//
      FUNCIÓN PARA AGREGAR AL HTML EL LISTADO DE PRODUCTOS (productos.js)
//--------------------------------------------------------------*/

export function generarHTMLProductos(productos) {
  let productosHTML = "";
  productos.forEach((producto) => {
    productosHTML += `
    <div class="producto-contenedor js-producto-contenedor" 
       data-producto-id="${producto.identificador}"
       data-producto-marca="${producto.marca}"
       data-producto-contenido="${producto.contenido}"
       data-producto-medida="${producto.medida}">
            <img src="${producto.imagen}">
          <section class="productos-informacion">
            <div class="id-producto">${producto.identificador}</div>
            <div class="marca-producto">${producto.marca}</div>
            <div class="contenido-producto">${producto.contenido}</div>
            <div class="medida-producto">${producto.medida}</div>
            <div class="precio-producto">$${producto.precio}</div>
          </section>
          <div class="botones-agregar-cancelar">
            <button class="boton-agregar js-boton-agregar-producto" 
            data-producto-id="${producto.identificador}" 
            data-producto-marca="${producto.marca}"
            data-producto-contenido="${producto.contenido}" 
            data-producto-medida="${producto.medida}"
            data-producto-precio="${producto.precio}">
            AGREGAR</button>
          </div>
        </div>
    `;
  });

  return productosHTML;
}
