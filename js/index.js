// creo variable productosHTML para insertar el html generado con todos los productos agregados
// esta variable debe estar antes de la funcion productos.forEach((producto) => {}
let productosHTML = '';

// funcion forEach para recorrer cada objeto de productos.js
// productos.js esta cargado ANTES que index.js en index.html
// se le da como parametro el nombre = "producto"
// divido a precioCentavos por 100 para que el resultado sea en pesos y utilizo la funcion .toFixed(2) para que muestre los decimales
// ejecuto un patron de acumulacion += para que sume el contenido obtenido de cada producto a la variable productosHTML

productos.forEach((producto) => {
  productosHTML += `
  <div class="producto-contenedor">
        <div>
          <img src="${producto.imagen}">
        </div>
        <section class="productos-informacion">
          <div class="marca-producto">${producto.marca}</div>
          <div class="contenido-producto">${producto.contenido}</div>
          <div class="medida-producto">${producto.medida}</div>
          <div class="precio-producto">$${(producto.precioCentavos / 100).toFixed(2)}</div>
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

        <div class="botones-comprar-cancelar">
          <button class="boton-comprar">COMPRAR</button>
          <button class="boton-cancelar">Cancelar</button>
        </div>
      </div>
 `;
});

console.log(productosHTML);


// traigo a javascript la etiqueta class js-productos-grid
// y agrego al html el codigo obtenido en la variable productosHTML
document.querySelector('.js-productos-grid').innerHTML = productosHTML