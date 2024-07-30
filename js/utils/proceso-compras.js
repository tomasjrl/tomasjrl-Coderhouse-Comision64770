import { actualizarTotales } from "./cuenta-compras.js";
import { productos } from "../data/productos.js";
import { actualizarStock , restaurarStock } from "../html/actualizarStock.js";

let stockOriginal = {};
let stockRestante = 0;
let botonPagar = document.querySelector(".js-boton-pagar-compra");
let botonCancelar = document.querySelector(".js-boton-cancelar-compra");

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

    if (listadoDeCompra.length === 0) {
      botonPagar.disabled = true;
      botonCancelar.disabled = true;
    } else {
      botonPagar.disabled = false;
      botonCancelar.disabled = false;
    }
  }

  listadoDeCompra.push = function () {
    Array.prototype.push.apply(this, arguments);
    actualizarTextarea();
  };

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
            productoStock,
            subtotal,
            matchingItem;

          productoId = boton.dataset.productoId;
          productoMarca = boton.dataset.productoMarca;
          productoContenido = boton.dataset.productoContenido;
          productoMedida = boton.dataset.productoMedida;
          productoPrecio = boton.dataset.productoPrecio;
          productoStock = boton.dataset.productoStock;

          //GUARDA ID Y STOCK ORIGINAL
          if (!stockOriginal[productoId]) {
            stockOriginal[productoId] = productoStock;
          }

          while (true) {
            let input = prompt(
              "Ingrese la cantidad de unidades que desea agregar (máximo " +
                productoStock +
                " unidades):"
            );

            if (input === null) {
              alert("Proceso cancelado.");
              return;
            }

            unidades = parseInt(input);

            if (!isNaN(unidades) && unidades > 0 && unidades <= productoStock) {
              stockRestante = productoStock - unidades;

              // Actualizar el stock del producto en el array productos
              productos.forEach((producto) => {
                if (producto.identificador === productoId) {
                  producto.stock = stockRestante;
                }
              });

              actualizarStock(productoId, stockRestante);

              break;
            } else {
              alert(
                "Cantidad no válida. Pruebe nuevamente ingresando un número mayor a 0 y menor o igual al máximo de unidades " +
                  productoStock +
                  "."
              );
            }
          }

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

          listadoDeCompra.push({
            productoId: productoId,
            productoMarca: productoMarca,
            productoContenido: productoContenido,
            productoMedida: productoMedida,
            productoPrecio: productoPrecio,
            productoUnidades: unidades,
            productoSubtotal: subtotal,
          });

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

        // debugger; //ANTES DE RESTAURAR STOCK
        // console.log(productos);

        if (indice !== -1) {
          // Restaurar el stock original
          productos.forEach((producto) => {
            if (producto.identificador === productoId) {
              producto.stock = stockOriginal[productoId];
            }
          });

          listadoDeCompra.splice(indice, 1);
        }

        // debugger; //DESPUES DE RESTAURAR STOCK
        // console.log(productos);

        actualizarTotales();

        actualizarTextarea();

        const idProducto = boton.dataset.productoId;
        const elementos = document.querySelectorAll(".id-producto");

        restaurarStock();

        boton.innerHTML = "AGREGAR";
        boton.classList.remove("js-boton-cancelar-producto");
        boton.classList.add("js-boton-agregar-producto");
      }
    });
  });

  /*--------------------------------------------------------------//
     PARA PAGAR / CANCELAR LA COMPRA TOTAL
//--------------------------------------------------------------*/

  function restablecerCompra(tipo) {
    // Restablecer valores a 0
    document.querySelector(".js-cantidad-compras").innerHTML = "0";
    document.querySelector(".js-suma-compras").innerHTML = "$0";
    document.querySelector(".js-pago-total").innerHTML = "$0";

    botonCancelar.disabled = true;
    botonPagar.disabled = true;

    // debugger; //ANTES DE RESTAURAR STOCK
    // console.log(productos);

    // Restablezco el array de compra.js
    listadoDeCompra.forEach((item) => {
      // Restaurar el stock original para todos los productos en la lista de compra
      productos.forEach((producto) => {
        if (producto.identificador === item.productoId) {
          producto.stock = stockOriginal[item.productoId];
        }
      });
    });

    listadoDeCompra.splice(0, listadoDeCompra.length);


    actualizarTextarea();
    console.clear();

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

          restaurarStock();
        }
      });
  }

  agregarEventoBoton("pagar");
  agregarEventoBoton("cancelar");
}
