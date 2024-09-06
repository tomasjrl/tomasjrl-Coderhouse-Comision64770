import { preguntaCancelarProducto } from "./mensajes-productos.js";

/*--------------------------------------------------------------//
              FUNCIÓN BOTÓN CANCELAR PRODUCTO DEL CARRITO
//--------------------------------------------------------------*/

export function eventoCancelarProducto(
  boton,
  listadoDeCompra,
  actualizarTotales,
  mensajeProductoEliminado
) {
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
