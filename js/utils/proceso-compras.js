import { actualizarTotales } from "./cuenta-compras.js";


export function procesoCompra(listadoDeCompra) {

/*--------------------------------------------------------------//
     AGREGA/ACTUALIZA AL HTML EL LISTADO DE COMPRA AL TEXTAREA DEL POP-UP      
//--------------------------------------------------------------*/

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

  // Actualiza el textarea
  listadoDeCompra.push = function () {
    Array.prototype.push.apply(this, arguments); // Agrega el nuevo elemento al array
    actualizarTextarea(); // Actualiza el contenido del textarea
  };

  // Inicializa el contenido del textarea por defecto
  actualizarTextarea();

/*--------------------------------------------------------------//
     BOTON AGREGAR / CANCELAR PRODUCTO AL LISTADO DE COMPRA
//--------------------------------------------------------------*/

  document.querySelectorAll(".js-boton-agregar-producto").forEach((boton) => {
    boton.addEventListener("click", () => {
      if (boton.classList.contains("js-boton-agregar-producto")) {
        let unidades;

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

        let productoId = boton.dataset.productoId;

        let indice = listadoDeCompra.findIndex(
          (item) => item.productoId === productoId
        );

        if (indice !== -1) {
          listadoDeCompra.splice(indice, 1);
        }

        actualizarTotales();

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

    // MensajeFinal indicando proceso de compra COMPLETADO O CANCELADO alert + console.log
    const mensajeFinal = `Proceso de compra ${
      tipo === "pagar" ? "COMPLETADO" : "CANCELADO"
    }. Todos los datos han sido reiniciados.`;
    console.log(mensajeFinal);
    alert(mensajeFinal);

    document
      .querySelectorAll(".js-boton-cancelar-producto")
      .forEach((boton) => {
        boton.innerHTML = "AGREGAR";
        boton.classList.remove("js-boton-cancelar-producto");
        boton.classList.add("js-boton-agregar-producto");
        document
          .querySelector(".js-pago-total")
          .classList.remove("js-pago-total-amarillo");
      });
  }

  // Pregunta indicando proceso de compra COMPLETADO O CANCELADO  para alert + console.log
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
}
