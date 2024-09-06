 /*--------------------------------------------------------------//
            FUNCIONES DE BOTONES PAGAR Y CANCELAR COMPRA
 //--------------------------------------------------------------*/

import { listadoDeCompra, actualizarTotales } from "./cuenta-compras.js";
import {
  manejarErrorPago,
  mostrarMensajeConfirmacion,
  mensajeFinal,
  mensajePago,
  procesandoPago,
} from "./functions/boton-pagar-utils.js";

export function agregarEventoBoton(tipo) {
  if (tipo === null || tipo === undefined) return;
  document
    .querySelector(`.js-boton-${tipo}-compra`)
    .addEventListener("click", () => {
      if (tipo.toUpperCase() === "PAGAR") {
        try {
          mensajePago(tipo).then((result) => {
            if (result.isConfirmed) {
              procesandoPago().then(() => {
                restablecerCompra(tipo);
              });
            }
          });
        } catch (error) {
          manejarErrorPago();
        }
      } else {
        mostrarMensajeConfirmacion(tipo).then((result) => {
          if (result.isConfirmed) {
            restablecerCompra(tipo);
          }
        });
      }
    });
}

export function restablecerCompra(tipo) {
  if (tipo === null || tipo === undefined) return;

  const botones = document.querySelectorAll(".js-boton-hero");

  botones.forEach((boton) => {
    boton.disabled = true;
  });

  listadoDeCompra.splice(0, listadoDeCompra.length);

  mensajeFinal(tipo);

  document.querySelectorAll(".js-boton-cancelar-producto").forEach((boton) => {
    const productoId = boton.dataset.productoId;
    boton.innerHTML = "AGREGAR";
    boton.classList.remove("js-boton-cancelar-producto");
    boton.classList.add("js-boton-agregar-producto");
    localStorage.removeItem(`boton-${productoId}`);
  });

  localStorage.removeItem("productos");
  actualizarTotales([]);
  localStorage.removeItem("listadoDeCompra");
}
