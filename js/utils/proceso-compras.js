import { actualizarTotales } from "./cuenta-compras.js";
import { productos } from "../data/productos.js";
import {
  actualizarStock,
  restaurarStock,
  actualizarTextoPopup,
} from "../html/actualizarStock.js";

let stockOriginal = {};
let stockRestante = 0;

export function procesoCompra(listadoDeCompra) {
  /*--------------------------------------------------------------//
     BOTON AGREGAR / CANCELAR PRODUCTO AL LISTADO DE COMPRA
//--------------------------------------------------------------*/

  document.querySelectorAll(".js-boton-agregar-producto").forEach((boton) => {
    boton.addEventListener("click", () => {
      if (boton.classList.contains("js-boton-agregar-producto")) {
        if (confirm("¿Confirma agregar este producto a la lista de compras?")) {
          let unidades,
            productoMarca,
            productoContenido,
            productoMedida,
            productoPrecio,
            productoStock,
            subtotal,
            productoId = boton.dataset.productoId;
          productoMarca = boton.dataset.productoMarca;
          productoContenido = boton.dataset.productoContenido;
          productoMedida = boton.dataset.productoMedida;
          productoPrecio = boton.dataset.productoPrecio;
          productoStock = boton.dataset.productoStock;

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

          listadoDeCompra.push({
            productoId: productoId,
            productoMarca: productoMarca,
            productoContenido: productoContenido,
            productoMedida: productoMedida,
            productoPrecio: productoPrecio,
            productoUnidades: unidades,
            productoSubtotal: subtotal,
          });

          actualizarTotales();
          actualizarTextoPopup(listadoDeCompra);

          boton.innerHTML = "CANCELAR";
          boton.classList.add("js-boton-cancelar-producto");
          boton.classList.remove("js-boton-agregar-producto");

          const botones = document.querySelectorAll(".js-boton-hero");
          botones.forEach((boton) => {
            boton.disabled = false;
          });
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
          productos.forEach((producto) => {
            if (producto.identificador === productoId) {
              producto.stock = stockOriginal[productoId];
            }
          });

          listadoDeCompra.splice(indice, 1);
        }

        if (listadoDeCompra.length === 0) {
          const botones = document.querySelectorAll(".js-boton-hero");
          botones.forEach((boton) => {
            boton.disabled = true;
          });
        }

        actualizarTotales();
        actualizarTextoPopup(listadoDeCompra);

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

    const botones = document.querySelectorAll(".js-boton-hero");

    botones.forEach((boton) => {
      boton.disabled = true;
    });

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
        document.querySelector(".js-pago-total").innerText = "$0.00";
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
          document.getElementById("texto-popup").value = "Listado de Compra:";

          restaurarStock();
        }
      });
  }

  agregarEventoBoton("pagar");
  agregarEventoBoton("cancelar");
}
