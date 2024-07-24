// creo variable productosHTML para insertar el html generado con todos los productos agregados
// esta variable debe estar antes de la funcion productos.forEach((producto) => {}

let productosHTML = "";

// funcion forEach para recorrer cada objeto de productos.js
// productos.js esta cargado ANTES que index.js en index.html
// se le da como parametro el nombre = "producto"

productos.forEach((producto) => {
  // ejecuto un patron de acumulacion += para que sume el contenido obtenido de cada producto a la variable productosHTML

  productosHTML += `
  <div class="producto-contenedor">
        <div>
          <img src="${producto.imagen}">
        </div>
        <section class="productos-informacion">
          <div class="marca-producto">${producto.marca}</div>
          <div class="contenido-producto">${producto.contenido}</div>
          <div class="medida-producto">${producto.medida}</div>
          <div class="precio-producto">$${
            // divido a precioCentavos por 100 para que el resultado sea en pesos y utilizo la funcion .toFixed(2) para que muestre los decimales

            (producto.precioCentavos / 100).toFixed(2)
          }</div>
        </section>
        <div>
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="botones-agregar-cancelar">
          <button class="boton-agregar js-boton-agregar" 
          data-producto-id="${producto.identificador}" 
          data-producto-marca="${producto.marca}"
          data-producto-contenido="${producto.contenido}" 
          data-producto-medida="${producto.medida}"
          >AGREGAR</button>
          <button class="boton-cancelar">Cancelar</button>
        </div>
      </div>
 `;
});

// traigo a javascript la etiqueta con clase "js-productos-grid"
// y agrego al html el codigo obtenido en la variable productosHTML

document.querySelector(".js-productos-grid").innerHTML = productosHTML;

// traigo a javascript la etiqueta con clase "js-boton-agregar" para modificar su contenido
// aplico forEach porque debe fijarse segun cada boton de cada producto

document.querySelectorAll(".js-boton-agregar").forEach((boton) => {
  // utilizo 'addEventListener' para escuchar el click del usuario sobre el boton

  boton.addEventListener("click", () => {
    // agrego un alert para indicar si desea confirmar el producto
    // agrego un 2do alert si es confirmado por el usuario

    if (confirm("¿Desea agregar este producto al carrito de compras?")) {
      alert("Producto agregado al carrito de compras");
      const productoId = boton.dataset.productoId;
      const productoMarca = boton.dataset.productoMarca;
      const productoContenido = boton.dataset.productoContenido;
      const productoMedida = boton.dataset.productoMedida;

      // funcion para agregar productos a la compra
      // si ya existe agrega solo incrementa +1 a la cantidad (ya que es el mismo producto)
      // si no existe agrega los valores del producto a la compra

      let matchingItem;

      compra.forEach((item) => {
        if (productoId === item.productoId) {
          matchingItem = item;
        }
      });

      if (matchingItem) {
        // si existe sumo +1 la "cantidad"
        matchingItem.cantidad += 1;
      } else {
        // envio con push a compras.js los nuevos valores del producto agregado confirmado por el agregado

        compra.push({
          productoId: productoId,
          productoMarca: productoMarca,
          productoContenido: productoContenido,
          productoMedida: productoMedida,
          cantidad: 1,
        });
      }
    }

    // actualiza numero de "cantidad" de compras para seccion "hero" del html

    let cantidadDeCompras = 0;

    compra.forEach((item) => {
      cantidadDeCompras += item.cantidad;
    });

    // traigo a javascript la etiqueta 'js-cantidad-compras'
    // reescribo el html con la cantidad actualizada
    document.querySelector('.js-cantidad-compras').innerHTML = cantidadDeCompras;
  });
});
