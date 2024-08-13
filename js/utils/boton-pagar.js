import { listadoDeCompra, actualizarTotales } from "./cuenta-compras.js";

// funcion para restablecer la compra ya sea habiendo pagado o cancelado la compra
export function restablecerCompra(tipo) {
  if (tipo === null || tipo === undefined) return;

  const botones = document.querySelectorAll(".js-boton-hero");

  // deshabilito los botones de pagar/cancelar puesto que quedara vacío de productos
  // estos botones solo pueden habilitarse con productos en el carrito de compras
  botones.forEach((boton) => {
    boton.disabled = true;
  });

  listadoDeCompra.splice(0, listadoDeCompra.length);

  // texto popup para informar que la operación final fue completada o cancelada
  Swal.fire({
    icon: tipo === "pagar" ? "success" : "info",
    background: "#153081",
    color: "#eaeaea",
    title: `Proceso de compra <br> ${
      tipo === "pagar" ? "COMPLETADO" : "CANCELADO"
    }.`,
    showConfirmButton: true,
  });

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
      Swal.fire({
        title: `¿Desea ${tipo.toUpperCase()} su compra?`,
        text: tipo.toUpperCase() === "PAGAR" ? "Complete el formulario:" : "",
        input: tipo.toUpperCase() === "PAGAR" ? "text" : null,
        inputPlaceholder: tipo.toUpperCase() === "PAGAR" ? "Escriba su nombre" : "",
        inputValue: tipo.toUpperCase() === "PAGAR" ? "Comision64770: Tomás Stabilini" : "",
        inputValidator: (value) => {
          if (tipo.toUpperCase() === "PAGAR" && !value) {
            return "Por favor, ingrese su nombre";
          }
        },
        icon: "question",
        background: "#153081",
        color: "#eaeaea",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed && tipo === 'pagar') {
          Swal.fire({
            title: 'Procesando su pago...',
            html: 'Por favor, espere...',
            background: "#153081",
            color: "#eaeaea",
            didOpen: () => {
              Swal.showLoading()
              Swal.getContainer().querySelector('.swal-title')?.classList.add('loading')
            },
            timer: 1250,
            timerProgressBar: true
          }).then(() => {
            restablecerCompra(tipo);
          })
        } else if (result.isConfirmed) {
          restablecerCompra(tipo);
        }
      });
    });
}
