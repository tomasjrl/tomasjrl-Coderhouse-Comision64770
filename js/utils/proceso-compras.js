import { botonesProductos } from "./boton-agregar.js";
import { actualizarTotales } from "./cuenta-compras.js";

let tipo = null;

export function procesoCompra(listadoDeCompra) {
  /*--------------------------------------------------------------//
     BOTON PARA AGREGAR / CANCELAR PRODUCTO AL LISTADO DE COMPRA
  //--------------------------------------------------------------*/

  botonesProductos(listadoDeCompra);

  /*--------------------------------------------------------------//
     BOTON PARA PAGAR / CANCELAR LA COMPRA TOTAL
  //--------------------------------------------------------------*/

  function restablecerCompra(tipo) {
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
  
  
  
  function agregarEventoBoton(tipo) {
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
  agregarEventoBoton("pagar");
  agregarEventoBoton("cancelar");

  // Recuperar el estado de los botones desde localStorage
  document.querySelectorAll(".js-boton-agregar-producto").forEach((boton) => {
    const productoId = boton.dataset.productoId;
    const estadoBoton = localStorage.getItem(`boton-${productoId}`);

    if (estadoBoton === "cancelar") {
      boton.innerHTML = "CANCELAR";
      boton.classList.add("js-boton-cancelar-producto");
      boton.classList.remove("js-boton-agregar-producto");
    }
  });
}
