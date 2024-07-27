/*--------------------------------------------------------------//

       VARIABLES Y FUNCION PARA SUMAR PRODUCTOS DE COMPRA
      
//--------------------------------------------------------------*/

let cantidadDeCompras = 0;
let sumaDeCompras = 0;

function actualizarTotales() {
  cantidadDeCompras = 0;
  sumaDeCompras = 0;

  compra.forEach((item) => {
    cantidadDeCompras += item.cantidad;
    sumaDeCompras += item.subtotal;
  });

  document.querySelector(
    ".js-cantidad-compras"
  ).innerHTML = `${cantidadDeCompras}`;
  document.querySelector(".js-suma-compras").innerHTML = `$${sumaDeCompras}`;
  document.querySelector(".js-pago-total").innerHTML = `$${(
    sumaDeCompras * 1.21
  ).toFixed(2)}`;


  console.log(
    `%cLISTA DE SUPERPRECIOS`,
    "color: lightyellow; font-weight: bold;"
  );

  console.log(
    `%cSUB-TOTAL = $${sumaDeCompras} // TOTAL UNIDADES = ${cantidadDeCompras}`,
    "color: lightblue; font-weight: bold;"
  );
  console.log(`%cIVA: * 1.21`,
    "color: lightgray; font-weight: bold;");

  console.log(
    `%cTOTAL = $${(sumaDeCompras * 1.21).toFixed(2)}`,
    "color: lightgreen; font-weight: bold;"
  );

  return { cantidadDeCompras, sumaDeCompras };
}

/*--------------------------------------------------------------//

       PARA AGREGAR AL HTML TODOS LOS PRODUCTOS
      
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
          <div class="precio-producto">$${producto.precio}</div>
        </section>
        <div class="botones-agregar-cancelar">
          <button class="boton-agregar js-boton-agregar-producto" 
          data-producto-id="${producto.identificador}" 
          data-producto-marca="${producto.marca}"
          data-producto-contenido="${producto.contenido}" 
          data-producto-medida="${producto.medida}"
          data-producto-precio="${producto.precio}"
          >AGREGAR</button>
        </div>
      </div>
 `;
});

// traigo a javascript la etiqueta con clase "js-productos-grid"
// y agrego al html el codigo obtenido en la variable productosHTML

document.querySelector(".js-productos-grid").innerHTML = productosHTML;

/*--------------------------------------------------------------//

      PARA BUSCAR PRODUCTOS

//--------------------------------------------------------------*/

function buscarProductos() {
  const terminoBusqueda = document
    .querySelector("#buscador")
    .value.toLowerCase();
  const productosElementos = document.querySelectorAll(
    ".js-producto-contenedor"
  );

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

       PARA AGREGAR PRODUCTOS DE COMPRA AL TEXTAREA DEL POP-UP
      
//--------------------------------------------------------------*/

let compra = [];

// Función para actualizar el contenido del textarea
function actualizarTextarea() {
  if (compra.length === 0) {
    document.getElementById("texto-popup").value = "Lista de productos:";
  } else {
    const contenido = compra
      .map((obj) => {
        const valores = Object.values(obj);
        const valoresFiltrados = valores.filter(
          (valor, indice) => indice !== 0 && indice !== 6
        );
        const linea2y3 = valoresFiltrados[1] + " " + valoresFiltrados[2];
        valoresFiltrados.splice(1, 2, linea2y3);
        valoresFiltrados[2] = "$" + valoresFiltrados[2];
        valoresFiltrados[3] = "Unidades: " + valoresFiltrados[3];
        return valoresFiltrados.join("\n");
      })
      .join("\n\n");
    document.getElementById("texto-popup").value =
      "Lista de productos:\n\n" + contenido;
  }
}

// Cuando se agrega un nuevo elemento al array, actualiza el textarea
compra.push = function () {
  Array.prototype.push.apply(this, arguments); // Agrega el nuevo elemento al array
  actualizarTextarea(); // Actualiza el contenido del textarea
};

// Inicializa el contenido del textarea
actualizarTextarea();

/*--------------------------------------------------------------//

       AL APRETAR EL BOTON "AGREGAR" PRODUCTO AL CARRITO DE COMPRAS

//--------------------------------------------------------------*/

document.querySelectorAll(".js-boton-agregar-producto").forEach((boton) => {
  boton.addEventListener("click", () => {
    if (boton.classList.contains("js-boton-agregar-producto")) {
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
        let cantidad,
          productoId,
          productoMarca,
          productoContenido,
          productoMedida,
          productoPrecio,
          subtotal,
          cantidadDeCompras,
          sumaDeCompras,
          matchingItem;

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

        productoId = boton.dataset.productoId;
        productoMarca = boton.dataset.productoMarca;
        productoContenido = boton.dataset.productoContenido;
        productoMedida = boton.dataset.productoMedida;
        productoPrecio = boton.dataset.productoPrecio;

        alert(
          `Agregado al carrito de compras\n\n${productoMarca} 
        ${productoContenido} 
        ${productoMedida}\n\nPrecio $${productoPrecio} * Unidades ${cantidad} = $${
            parseFloat(productoPrecio) * parseInt(cantidad)
          }`
        );

        subtotal = parseFloat(productoPrecio) * cantidad;

        compra.forEach((item) => {
          if (productoId === item.productoId) {
            matchingItem = item;
          }
        });

        if (matchingItem) {
          matchingItem.cantidad += cantidad;
          matchingItem.subtotal += subtotal;
        } else {
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

        botonCancelar.disabled = false;
        botonPagar.disabled = false;
        document
          .querySelector(".js-pago-total")
          .classList.add("js-pago-total-amarillo");

        actualizarTotales();

        boton.innerHTML = "CANCELAR";
        boton.classList.add("js-boton-cancelar-producto");
        boton.classList.remove("js-boton-agregar-producto");
      }
    } else {
      if (
        !confirm("¿Confirma CANCELAR este producto de la lista de compras?")
      ) {
        return;
      }
      alert("Producto CANCELADO de la lista de compras.");

      // Declarar la variable productoId
      let productoId = boton.dataset.productoId;

      // Encontrar el objeto del producto en el array compra
      let indice = compra.findIndex((item) => item.productoId === productoId);

      // Eliminar el objeto del producto del array compra
      if (indice !== -1) {
        compra.splice(indice, 1);
      }
      // Actualizar totales
      actualizarTotales();

      // Actualizar el contenido del textarea
      actualizarTextarea();

      boton.innerHTML = "AGREGAR";
      boton.classList.remove("js-boton-cancelar-producto");
      boton.classList.add("js-boton-agregar-producto");
    }
  });
});

/*--------------------------------------------------------------//

       PARA PAGAR / CANCELAR LA COMPRA TOTAL (y limpiar el console.log)

//--------------------------------------------------------------*/

let botonPagar = document.querySelector(".js-boton-pagar-compra");
let botonCancelar = document.querySelector(".js-boton-cancelar-compra");

function restablecerCompra(tipo) {
  // Restablecer valores a 0
  document.querySelector(".js-cantidad-compras").innerHTML = "0";
  document.querySelector(".js-suma-compras").innerHTML = "$0";
  document.querySelector(".js-pago-total").innerHTML = "$0";

  botonCancelar.disabled = true;
  botonPagar.disabled = true;

  // Restablezco el array de compra.js
  compra.splice(0, compra.length);

  // Actualizo el contenido del textarea
  actualizarTextarea();

  // Limpio el console.log
  console.clear();

  // MensajeFinal indicando proceso de compra COMPLETADO O CANCELADO  para alert + console.log
  const mensajeFinal = `Proceso de compra ${
    tipo === "pagar" ? "COMPLETADO" : "CANCELADO"
  }. Todos los datos han sido reiniciados.`;
  console.log(mensajeFinal);
  alert(mensajeFinal);

  document.querySelectorAll(".js-boton-cancelar-producto").forEach((boton) => {
    boton.innerHTML = "AGREGAR";
    boton.classList.remove("js-boton-cancelar-producto");
    boton.classList.add("js-boton-agregar-producto");
    document
      .querySelector(".js-pago-total")
      .classList.remove("js-pago-total-amarillo");
  });
}

// MensajePregunta indicando proceso de compra COMPLETADO O CANCELADO  para alert + console.log
function agregarEventoBoton(tipo) {
  document
    .querySelector(`.js-boton-${tipo}-compra`)
    .addEventListener("click", () => {
      if (
        confirm(
          `¿Confirma ${tipo} su compra?\n\n(esto reiniciará los valores y el console.log)`
        )
      ) {
        restablecerCompra(tipo);
      }
    });
}

agregarEventoBoton("pagar");
agregarEventoBoton("cancelar");
