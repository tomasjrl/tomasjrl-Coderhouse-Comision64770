import { listadoDeCompra, actualizarTextarea } from "../html/listado-compra.js";

/*--------------------------------------------------------------//
     PARA PAGAR / CANCELAR LA COMPRA TOTAL
//--------------------------------------------------------------*/

export let botonPagar = document.querySelector(".js-boton-pagar-compra");
export let botonCancelar = document.querySelector(".js-boton-cancelar-compra");

export function restablecerCompra(tipo) {
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
export function agregarEventoBoton(tipo) {
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

export function culminarCompra() {
  agregarEventoBoton("pagar");
  agregarEventoBoton("cancelar");
}
