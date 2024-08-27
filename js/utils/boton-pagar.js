import { listadoDeCompra, actualizarTotales } from "./cuenta-compras.js";
import {
  manejarErrorPago,
  mostrarMensajeConfirmacion,
  mensajeFinal,
  mensajePago,
  procesandoPago,
} from "./utils-pagar.js";

// función para restablecer la compra ya sea habiendo pagado o cancelado la compra

export function restablecerCompra(tipo) {
  if (tipo === null || tipo === undefined) return;

  const botones = document.querySelectorAll(".js-boton-hero");

  // deshabilito los botones de pagar/cancelar puesto que quedara vacío de productos
  // estos botones solo pueden habilitarse si hay productos agregados en el carrito de compras

  botones.forEach((boton) => {
    boton.disabled = true;
  });

  listadoDeCompra.splice(0, listadoDeCompra.length);

  mensajeFinal(tipo); // texto popup para informar que la operación final fue completada o cancelada

  // devuelvo clases originales a las etiquetas de los botones

  document.querySelectorAll(".js-boton-cancelar-producto").forEach((boton) => {
    const productoId = boton.dataset.productoId;
    boton.innerHTML = "AGREGAR";
    boton.classList.remove("js-boton-cancelar-producto");
    boton.classList.add("js-boton-agregar-producto");
    localStorage.removeItem(`boton-${productoId}`);
  });

  // vacío los arrays de objetos almacenados

  localStorage.removeItem("productos");
  actualizarTotales([]);
  localStorage.removeItem("listadoDeCompra");
}

// texto popup para concretar o cancelar el pago de la compra

export function agregarEventoBoton(tipo) {
  if (tipo === null || tipo === undefined) return;
  document
    .querySelector(`.js-boton-${tipo}-compra`)
    .addEventListener("click", () => {
      if (tipo.toUpperCase() === "PAGAR") {
        try {
          // mensaje popup para concretar/cancelar el pago de compra
          mensajePago(tipo).then((result) => {
            if (result.isConfirmed) {
              procesandoPago().then(() => {
                restablecerCompra(tipo); // función para restablecer valores
              });
            }
          });
        } catch (error) {
          manejarErrorPago(); // mensaje popup por si hay error
        }
      } else {
        mostrarMensajeConfirmacion(tipo).then((result) => {
          if (result.isConfirmed) {
            restablecerCompra(tipo); // función para restablecer valores
          }
        });
      }
    });
}
