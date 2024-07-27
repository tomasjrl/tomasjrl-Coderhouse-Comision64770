/*--------------------------------------------------------------//

       PARA AGREGAR AL HTML EL LISTADO DE PRODUCTOS (productos.js)
      
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

      PARA BUSCAR PRODUCTOS EN EL HTML

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

    PARA SUMAR UNIDADES Y SUBTOTAL DEL LISTADO DE COMPRA
      
//--------------------------------------------------------------*/

let unidadesDeCompras = 0;
let subtotalDeCompras = 0;

function actualizarTotales() {
  unidadesDeCompras = 0;
  subtotalDeCompras = 0;

  listadoDeCompra.forEach((item) => {
    unidadesDeCompras += item.productoUnidades;
    subtotalDeCompras += item.productoSubtotal;
  });

  document.querySelector(
    ".js-cantidad-compras"
  ).innerHTML = `${unidadesDeCompras}`;
  document.querySelector(
    ".js-suma-compras"
  ).innerHTML = `$${subtotalDeCompras}`;
  document.querySelector(".js-pago-total").innerHTML = `$${(
    subtotalDeCompras * 1.21
  ).toFixed(2)}`;

  console.clear();

  console.log(
    `%cCUENTAS DE SUPERPRECIOS`,
    "color: lightyellow; font-weight: bold;"
  );

  console.log(
    `%cListado de Compra = ${JSON.stringify(
      listadoDeCompra.map((producto) => ({
        ...producto,
        productoPrecio: `$${producto.productoPrecio}`,
        productoSubtotal: `$${producto.productoSubtotal}`,
      })),
      null,
      2
    )}`,
    "color: lightpink; font-weight: bold;"
  );

  console.log(
    `%cTOTAL UNIDADES = ${unidadesDeCompras}`,
    "color: lightblue; font-weight: bold;"
  );

  console.log(
    `%cSUB-TOTAL = $${subtotalDeCompras}`,
    "color: lightblue; font-weight: bold;"
  );

  console.log(`%cIVA: * 1.21`, "color: lightgray; font-weight: bold;");

  console.log(
    `%cTOTAL = $${(subtotalDeCompras * 1.21).toFixed(2)}`,
    "color: lightgreen; font-weight: bold;"
  );

  return { unidadesDeCompras, subtotalDeCompras };
}

/*--------------------------------------------------------------//

       PARA AGREGAR AL HTML EL LISTADO DE COMPRA AL TEXTAREA DEL POP-UP
      
//--------------------------------------------------------------*/

let listadoDeCompra = [];

// Función para actualizar el contenido del textarea
function actualizarTextarea() {
  if (listadoDeCompra.length === 0) {
    document.getElementById("texto-popup").value = "Listado de compra:";
  } else {
    const contenido = listadoDeCompra
      .map((obj) => {
        const valores = Object.values(obj);
        const valoresFiltrados = valores.filter(
          (valor, indice) => indice !== 0 && indice !== 6
        );
        const linea2y3 = valoresFiltrados[1] + " " + valoresFiltrados[2];
        valoresFiltrados.splice(1, 2, linea2y3);
        valoresFiltrados[2] = "Precio por unidad: $" + valoresFiltrados[2];
        valoresFiltrados[3] = "Unidades: " + valoresFiltrados[3];
        return valoresFiltrados.join("\n");
      })
      .join("\n\n");
    document.getElementById("texto-popup").value =
      "Listado de compra:\n\n" + contenido;
  }
}

// Cuando se agrega un nuevo elemento al array, actualiza el textarea
listadoDeCompra.push = function () {
  Array.prototype.push.apply(this, arguments); // Agrega el nuevo elemento al array
  actualizarTextarea(); // Actualiza el contenido del textarea
};

// Inicializa el contenido del textarea
actualizarTextarea();

/*--------------------------------------------------------------//

       PARA AGREGAR / CANCELAR PRODUCTO AL LISTADO DE COMPRA

//--------------------------------------------------------------*/

document.querySelectorAll(".js-boton-agregar-producto").forEach((boton) => {
  boton.addEventListener("click", () => {
    if (boton.classList.contains("js-boton-agregar-producto")) {
      let unidades;

      // agrego un alert para indicar si desea confirmar el producto
      // agrego un confirm para que indique la cantidad de productos
      // agrego un 2do alert confirmando la cantidad agregada
      // deshabilito boton de agregar producto

      if (confirm("¿Confirma agregar este producto a la lista de compras?")) {
        let unidades,
          productoId,
          productoMarca,
          productoContenido,
          productoMedida,
          productoPrecio,
          subtotal,
          matchingItem;

        while (true) {
          let input = prompt(
            "Ingrese la cantidad de unidades que desea agregar:"
          );

          if (input === null) {
            alert("Proceso cancelado.");
            return;
          }

          unidades = parseInt(input);

          if (!isNaN(unidades) && unidades > 0) {
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
          `Agregado a la lista de compras:\n\n${productoMarca} ${productoContenido} ${productoMedida}\n\nPrecio $${productoPrecio} * Unidades ${unidades} = $${
            parseFloat(productoPrecio) * unidades
          }`
        );

        subtotal = parseFloat(productoPrecio) * unidades;

        listadoDeCompra.forEach((item) => {
          if (productoId === item.productoId) {
            matchingItem = item;
          }
        });

        if (matchingItem) {
          matchingItem.productoUnidades += unidades;
          matchingItem.productoSubtotal += subtotal;
        } else {
          listadoDeCompra.push({
            productoId: productoId,
            productoMarca: productoMarca,
            productoContenido: productoContenido,
            productoMedida: productoMedida,
            productoPrecio: productoPrecio,
            productoUnidades: unidades,
            productoSubtotal: subtotal,
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
      let indice = listadoDeCompra.findIndex(
        (item) => item.productoId === productoId
      );

      // Eliminar el objeto del producto del array compra
      if (indice !== -1) {
        listadoDeCompra.splice(indice, 1);
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

       PARA PAGAR / CANCELAR LA COMPRA TOTAL

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
  listadoDeCompra.splice(0, listadoDeCompra.length);

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
