import { actualizarTotales } from "./cuenta-compras.js";
import {
  mensajeProductoAgregado,
  mensajeProductoCancelado,
  mensajeProductoEliminado,
} from "./functions/mensajes-productos.js";
import { eventoAgregarProducto } from "./functions/evento-agregar-producto.js";
import { eventoCancelarProducto } from "./functions/evento-cancelar-producto.js";

/*--------------------------------------------------------------//
             FUNCIONES AGREGAR/CANCELAR PRODUCTO
//--------------------------------------------------------------*/

export function botonesProductos(listadoDeCompra) {
  document.querySelectorAll(".js-boton-agregar-producto").forEach((boton) => {
    boton.addEventListener("click", () => {
      // AGREGAR PRODUCTO AL CARRITO

      eventoAgregarProducto(
        boton,
        listadoDeCompra,
        actualizarTotales,
        mensajeProductoAgregado,
        mensajeProductoCancelado
      );

      if (boton.classList.contains("js-boton-cancelar-producto")) {
        // CANCELAR PRODUCTO DEL CARRITO

        eventoCancelarProducto(
          boton,
          listadoDeCompra,
          actualizarTotales,
          mensajeProductoEliminado
        );
      }
    });
  });
}
