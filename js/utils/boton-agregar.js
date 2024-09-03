import { actualizarTotales } from "./cuenta-compras.js";
import {
  preguntaAgregarProducto,
  preguntaCantidad,
  mensajeProductoAgregado,
  mensajeProductoCancelado,
  preguntaCancelarProducto,
  mensajeProductoEliminado,
} from "./functions/boton-agregar-utils.js";

export function botonesProductos(listadoDeCompra) {
    /*--------------------------------------------------------------//
               BOTÓN AGREGAR PRODUCTO AL CARRITO
    //--------------------------------------------------------------*/

  document.querySelectorAll(".js-boton-agregar-producto").forEach((boton) => {
    boton.addEventListener("click", () => {
      preguntaAgregarProducto().then((result) => {
        if (result.isConfirmed) {
          const {
            productoId,
            productoMarca,
            productoContenido,
            productoMedida,
            productoPrecio,
          } = boton.dataset;

          preguntaCantidad().then((result) => {
            const unidades = result.value;

            if (result.isConfirmed) {
              mensajeProductoAgregado();
              const subtotal = parseFloat(productoPrecio) * unidades;
              listadoDeCompra.push({
                productoId,
                productoMarca,
                productoContenido,
                productoMedida,
                productoPrecio,
                productoUnidades: unidades,
                productoSubtotal: subtotal,
              });

              actualizarTotales();

              boton.innerHTML = "CANCELAR";
              boton.classList.add("js-boton-cancelar-producto");
              boton.classList.remove("js-boton-agregar-producto");

              localStorage.setItem(`boton-${productoId}`, "cancelar");

              const botones = document.querySelectorAll(".js-boton-hero");
              botones.forEach((boton) => {
                boton.disabled = false;
              });
            } else if (result.isDismissed) {
              mensajeProductoCancelado();
            }
          });
        }
      });

      /*--------------------------------------------------------------//
               BOTÓN CANCELAR PRODUCTO DEL CARRITO
      //--------------------------------------------------------------*/

      if (boton.classList.contains("js-boton-cancelar-producto")) {
        preguntaCancelarProducto().then((result) => {
          if (result.isConfirmed) {
            let productoId = boton.dataset.productoId;
            let indice = listadoDeCompra.findIndex(
              (item) => item.productoId === productoId
            );

            if (indice !== -1) {
              listadoDeCompra.splice(indice, 1);
            }

            if (listadoDeCompra.length === 0) {
              const botones = document.querySelectorAll(".js-boton-hero");
              botones.forEach((boton) => {
                boton.disabled = true;
              });
            }

            actualizarTotales();

            boton.innerHTML = "AGREGAR";
            boton.classList.remove("js-boton-cancelar-producto");
            boton.classList.add("js-boton-agregar-producto");

            localStorage.setItem(`boton-${productoId}`, "agregar");

            mensajeProductoEliminado();
          }
        });
      }
    });
  });
}
