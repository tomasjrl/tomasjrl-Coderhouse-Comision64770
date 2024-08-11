import { botonesProductos } from "./boton-agregar.js";
import { restablecerCompra, agregarEventoBoton } from "./boton-pagar.js";
import { cargarProductos } from "../data/productos.js";

let tipo = null;

export async function procesoCompra(listadoDeCompra) {

  document.querySelectorAll(".js-boton-agregar-producto").forEach((boton) => {
    boton.disabled = true;
  });

  // Cargar la información asíncrona
  await cargarProductos();

  // Habilitar los botones después de cargar la información
  document.querySelectorAll(".js-boton-agregar-producto").forEach((boton) => {
    boton.disabled = false;
  });

  /*--------------------------------------------------------------//
     BOTON PARA AGREGAR / CANCELAR PRODUCTO AL LISTADO DE COMPRA
  //--------------------------------------------------------------*/

  botonesProductos(listadoDeCompra);

  /*--------------------------------------------------------------//
     BOTON PARA PAGAR / CANCELAR LA COMPRA TOTAL
  //--------------------------------------------------------------*/

  restablecerCompra(tipo);
  agregarEventoBoton(tipo);
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
