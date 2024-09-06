import {
  preguntaAgregarProducto,
  preguntaCantidad,
} from "./mensajes-productos.js";

/*--------------------------------------------------------------//
              FUNCIÓN BOTÓN AGREGAR PRODUCTO AL CARRITO
//--------------------------------------------------------------*/

export function eventoAgregarProducto(
  boton,
  listadoDeCompra,
  actualizarTotales,
  mensajeProductoAgregado,
  mensajeProductoCancelado
) {
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
}
