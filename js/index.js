/*--------------------------------------------------------------//

      CODIGO PARA AGREGAR AL HTML TODOS LOS PRODUCTOS DESDE JAVASCRIPT
      
//--------------------------------------------------------------*/

let productosHTML = "";

// creo variable productosHTML para insertar el html generado con todos los productos
// La funcion forEach recorre cada objeto de productos.js
// para que sume el contenido obtenido de cada producto a productosHTML

productos.forEach((producto) => {


  productosHTML += `
  <div class="producto-contenedor js-producto-contenedor" 
     data-producto-id="${producto.identificador}"
     data-producto-marca="${producto.marca}"
     data-producto-contenido="${producto.contenido}"
     data-producto-medida="${producto.medida}">
        <div>
          <img src="${producto.imagen}">
        </div>
        <section class="productos-informacion">
          <div class="marca-producto">${producto.marca}</div>
          <div class="contenido-producto">${producto.contenido}</div>
          <div class="medida-producto">${producto.medida}</div>
          <div class="precio-producto">$${(producto.precio)}</div>
        </section>
        <div class="botones-agregar-cancelar">
          <button class="boton-agregar js-boton-agregar-producto" 
          data-producto-id="${producto.identificador}" 
          data-producto-marca="${producto.marca}"
          data-producto-contenido="${producto.contenido}" 
          data-producto-medida="${producto.medida}"
          data-producto-precio="${(producto.precio)}"
          >AGREGAR</button>
        </div>
      </div>
 `;
});

// traigo a javascript la etiqueta con clase "js-productos-grid" 
// y agrego al html el codigo obtenido en la variable productosHTML

document.querySelector(".js-productos-grid").innerHTML = productosHTML;

/*--------------------------------------------------------------//

     CODIGO PARA BUSCAR PRODUCTOS

//--------------------------------------------------------------*/

function buscarProductos() {

  const terminoBusqueda = document
    .querySelector("#buscador")
    .value.toLowerCase();

  const productosElementos = document.querySelectorAll(".js-producto-contenedor");

  // Obtengo todos los elementos de la clase "js-producto-contenedor"
  // Recorro todos los elementos de productos y sus atributos data

  productosElementos.forEach((productoElemento) => {

    const id = productoElemento.getAttribute("data-producto-id") || "";
    const marca = productoElemento.getAttribute("data-producto-marca") || "";
    const contenido =
      productoElemento.getAttribute("data-producto-contenido") || "";
    const medida = productoElemento.getAttribute("data-producto-medida") || "";

    // Verifico si alguno de los atributos contiene el término de búsqueda

    if (
      marca.toLowerCase().includes(terminoBusqueda) ||
      contenido.toLowerCase().includes(terminoBusqueda) ||
      medida.toLowerCase().includes(terminoBusqueda)
    ) {
      productoElemento.style.display = "";
    } else {
      productoElemento.style.display = "none";
    }
  });
}

// event listener al campo de búsqueda para que se ejecute la función al escribir

document.querySelector("#buscador").addEventListener("input", buscarProductos);


/*--------------------------------------------------------------//

      CODIGO AL APRETAR EL BOTON "AGREGAR" PRODUCTO AL CARRITO DE COMPRAS

//--------------------------------------------------------------*/

let botonPagar = document.querySelector(".js-boton-pagar-compra");
let botonCancelar = document.querySelector(".js-boton-cancelar-compra");

document.querySelectorAll(".js-boton-agregar-producto").forEach((boton) => {
  boton.addEventListener("click", () => {
    let cantidad;

    // agrego un alert para indicar si desea confirmar el producto
    // agrego un confirm para que indique la cantidad de productos
    // agrego un 2do alert confirmando la cantidad agregada
    // deshabilito boton de agregar producto

    if (
      confirm(
        "¿Confirma este producto al carrito de compras?\n\n(esta información será agregada al console.log)"
      )
    ) {
      while (true) {
        let input = prompt(
          "Ingrese la cantidad de este producto que desea agregar:"
        );

        if (input === null) {
          alert("Proceso cancelado.");
          return;
        }

        cantidad = parseInt(input);

        if (!isNaN(cantidad) && cantidad > 0) {
          break;
        } else {
          alert(
            "Cantidad no válida. Pruebe nuevamente ingresando un número mayor a 0."
          );
        }
      }

      const productoId = boton.dataset.productoId;
      const productoMarca = boton.dataset.productoMarca;
      const productoContenido = boton.dataset.productoContenido;
      const productoMedida = boton.dataset.productoMedida;
      const productoPrecio = boton.dataset.productoPrecio;

      alert(
        `Agregado al carrito de compras\n\n${productoMarca} ${productoContenido} ${productoMedida}\n\nPrecio $${productoPrecio} * Unidades ${cantidad} = $${(parseFloat(productoPrecio) * parseInt(cantidad)).toFixed(2)}`
      );

      boton.innerHTML = "AGREGADO";
      boton.disabled = true;


/*--------------------------------------------------------------//

      CODIGO PARA ACTUALIZAR CANTIDAD / SUBTOTAL / TOTAL EN EL CARRITO (y en el console.log)

//--------------------------------------------------------------*/
      let matchingItem;
      let subtotal = parseFloat(productoPrecio) * cantidad;

      compra.forEach((item) => {
        if (productoId === item.productoId) {
          matchingItem = item;
        }
      });

      if (matchingItem) {
        matchingItem.cantidad += cantidad;
        matchingItem.subtotal += subtotal;
      } 
      else {
        compra.push({
          productoId: productoId,
          productoMarca: productoMarca,
          productoContenido: productoContenido,
          productoMedida: productoMedida,
          productoPrecio: productoPrecio,
          cantidad: cantidad,
          subtotal: subtotal,
        });
      }

      let cantidadDeCompras = 0;
      let sumaDeCompras = 0;

    // si ya existe agrega solo incrementa la cantidad especificada
    // si no existe agrega los valores del producto a la compra

      compra.forEach((item) => {
        cantidadDeCompras += item.cantidad;
        sumaDeCompras += item.subtotal;
      });

      document.querySelector(".js-cantidad-compras").innerHTML =
      `${cantidadDeCompras}`;
      document.querySelector(".js-suma-compras").innerHTML =
        `$${sumaDeCompras}`;
        document.querySelector(".js-pago-total").innerHTML =
        `$${(sumaDeCompras * 1.21).toFixed(2)}`;
        
      
      botonCancelar.disabled = false;
      botonPagar.disabled = false;
      document.querySelector(".js-pago-total").classList.add("js-pago-total-amarillo");

      console.log(
        "%cNUEVO PRODUCTO AGREGADO",
        "text-decoration: underline; color: red; font-weight: bold;"
      );
      console.log(`${productoMarca} ${productoContenido} ${productoMedida}`);
      console.log(`Precio $${productoPrecio} * Unidades ${cantidad} = $${(parseFloat(productoPrecio) * parseInt(cantidad))}`);
      console.log(
        `%cSUB-TOTAL = $${sumaDeCompras} // TOTAL UNIDADES = ${cantidadDeCompras}`,
        "color: lightblue; font-weight: bold;"
      );
      console.log(
        "IVA: * 1.21"
      );
      console.log(
        `%cTOTAL = $${(sumaDeCompras * 1.21).toFixed(2)}`,
        "color: lightgreen; font-weight: bold;"
      );
      
    }
  });
});

/*--------------------------------------------------------------//

      CODIGO PARA PAGAR / CANCELAR LA COMPRA TOTAL (y limpiar el console.log)

//--------------------------------------------------------------*/


function restablecerCompra(tipo) {
  // Restablecer valores a 0
  document.querySelector(".js-cantidad-compras").innerHTML = "0";
  document.querySelector(".js-suma-compras").innerHTML = "$0";
  document.querySelector(".js-pago-total").innerHTML = "$0";

  botonCancelar.disabled = true;
  botonPagar.disabled = true;

  // Restablezco el array de compra.js
  compra = [];

  // Limpio el console.log
  console.clear();
  console.log(`Proceso de compra ${tipo === "pagar" ? "COMPLETADO" : "CANCELADO"}. Todos los datos han sido reiniciados.`);

  // agrego un alert avisando la confirmación
  alert(`Proceso de compra ${tipo === "pagar" ? "COMPLETADO" : "CANCELADO"}. Todos los datos han sido reiniciados.`);

  document.querySelectorAll(".js-boton-agregar-producto").forEach((boton) => {
    boton.innerHTML = "AGREGAR";
    boton.disabled = false;
    document.querySelector(".js-pago-total").classList.remove("js-pago-total-amarillo");
  });
}

document.querySelector(".js-boton-pagar-compra").addEventListener("click", () => {
  if (confirm("¿Confirma EL PAGO de su compra?\n\n(esto finalizará el proceso y reiniciará los valores y el console.log)")) {
    restablecerCompra("pagar");
  }
});

document.querySelector(".js-boton-cancelar-compra").addEventListener("click", () => {
  if (confirm("¿Confirma CANCELAR su compra?\n\n(esto reiniciará los valores y el console.log)")) {
    restablecerCompra("cancelar");
  }
});
