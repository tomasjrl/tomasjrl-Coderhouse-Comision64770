/*--------------------------------------------------------------//
      PARA AGREGAR AL HTML EL LISTADO DE PRODUCTOS (productos.js)
//--------------------------------------------------------------*/

// La funcion forEach recorre cada objeto de productos.js
// para que sume el contenido obtenido de cada producto a productosHTML

export function generarHTMLProductos(productos) {
  let productosHTML = "";
  productos.forEach((producto) => {
    productosHTML += `
    <div class="producto-contenedor js-producto-contenedor" 
       data-producto-id="${producto.identificador}"
       data-producto-marca="${producto.marca}"
       data-producto-contenido="${producto.contenido}"
       data-producto-medida="${producto.medida}"
       data-producto-stock="${producto.stock}">
          <div>
            <img src="${producto.imagen}">
          </div>
          <section class="productos-informacion">
            <div class="id-producto">${producto.identificador}</div>
            <div class="marca-producto">${producto.marca}</div>
            <div class="contenido-producto">${producto.contenido}</div>
            <div class="medida-producto">${producto.medida}</div>
            <div class="precio-producto">$${producto.precio}</div>
            <div class="stock-producto stock js-producto-stock">Stock: ${producto.stock}</div>
          </section>
          <div class="botones-agregar-cancelar">
            <button class="boton-agregar js-boton-agregar-producto" 
            data-producto-id="${producto.identificador}" 
            data-producto-marca="${producto.marca}"
            data-producto-contenido="${producto.contenido}" 
            data-producto-medida="${producto.medida}"
            data-producto-precio="${producto.precio}"
            data-producto-stock="${producto.stock}">
            AGREGAR</button>
          </div>
        </div>
    `;
  });
  return productosHTML;
}

