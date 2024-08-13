/*--------------------------------------------------------------//
      FUNCION PARA AGREGAR AL HTML EL LISTADO DE PRODUCTOS (productos.js)
//--------------------------------------------------------------*/

/* La función recorre cada "objeto" de productos.js y le asigna código HTML
 para que sume en el navegador las etiquetas correspondientes por cada producto
 Cada producto contiene un ID - Marca - contenido - medida */

export function generarHTMLProductos(productos) {
  let productosHTML = "";
  productos.forEach((producto) => {
    // codigo HTML que se generará en el navegador por cada producto (objeto del array)

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

  // productosHTML = es el código html que contiene todas las cartas de productos

  return productosHTML;
}
