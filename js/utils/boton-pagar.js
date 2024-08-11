import { actualizarTotales, listadoDeCompra } from "./cuenta-compras.js";

export function restablecerCompra(tipo) {
  if (tipo === null || tipo === undefined) return;

  const botones = document.querySelectorAll(".js-boton-hero");

  botones.forEach((boton) => {
    boton.disabled = true;
  });

  listadoDeCompra.splice(0, listadoDeCompra.length);

  Swal.fire({
    icon: tipo === "pagar" ? "success" : "info",
    background: "#153081",
    color: "#eaeaea",
    title: `Proceso de compra <br> ${
      tipo === "pagar" ? "COMPLETADO" : "CANCELADO"
    }.`,
    showConfirmButton: true,
  });

  document
    .querySelectorAll(".js-boton-cancelar-producto")
    .forEach((boton) => {
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



export function agregarEventoBoton(tipo) {
  if (tipo === null || tipo === undefined) return;
  document
    .querySelector(`.js-boton-${tipo}-compra`)
    .addEventListener("click", () => {
      Swal.fire({
        title: `¿Desea ${tipo.toUpperCase()} su compra?`,
        icon: "question",
        background: "#153081",
        color: "#eaeaea",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          restablecerCompra(tipo);
        }
      });
    });
}