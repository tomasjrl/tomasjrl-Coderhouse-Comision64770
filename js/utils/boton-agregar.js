import { actualizarTotales } from "./cuenta-compras.js";
import {
  preguntaAgregarProducto,
  preguntaCantidad,
  mensajeProductoAgregado,
  mensajeProductoCancelado,
  preguntaCancelarProducto,
  mensajeProductoEliminado,
} from "./boton-agregar-utils.js";

// función para agregar productos al carrito de compras

export function botonesProductos(listadoDeCompra) {

  // escucho el click del botón del producto que corresponda a su contenedor

    /*--------------------------------------------------------------//
               BOTÓN AGREGAR PRODUCTO DEL LISTADO DE COMPRA
    //--------------------------------------------------------------*/

  document.querySelectorAll(".js-boton-agregar-producto").forEach((boton) => {
    boton.addEventListener("click", () => {

      // función con inicio texto popup con pregunta para agregar producto al carrito de compras

      preguntaAgregarProducto().then((result) => {

        // si confirma, asigno variables con los contenidos del objeto del array productos.js

        if (result.isConfirmed) {
          let productoMarca,
            productoContenido,
            productoMedida,
            productoPrecio,
            subtotal,
            productoId = boton.dataset.productoId;
          productoMarca = boton.dataset.productoMarca;
          productoContenido = boton.dataset.productoContenido;
          productoMedida = boton.dataset.productoMedida;
          productoPrecio = boton.dataset.productoPrecio;

          // texto popup con pregunta sobre cantidad de unidades a incorporar al carrito de compras
          // establezco  mínimo 1 unidad y máximo 15 unidades

          preguntaCantidad().then((result) => {
            const unidades = result.value;

            // mensaje popup de confirmación del producto agregado al carrito de compras

            if (result.isConfirmed) {
              mensajeProductoAgregado();

              // operación multiplicando precio por cantidad de unidades elegidas por el usuario

              subtotal = parseFloat(productoPrecio) * unidades;

              // envío datos a la variable listadoDeCompra

              listadoDeCompra.push({
                productoId: productoId,
                productoMarca: productoMarca,
                productoContenido: productoContenido,
                productoMedida: productoMedida,
                productoPrecio: productoPrecio,
                productoUnidades: unidades,
                productoSubtotal: subtotal,
              });

              // actualizo cuentas totales a medida que se sumen productos a la lista

              actualizarTotales();

              // cambio el estado del boton de la carta del producto
              // cambio texto de botón de AGREGAR por CANCELAR

              boton.innerHTML = "CANCELAR";
              boton.classList.add("js-boton-cancelar-producto");
              boton.classList.remove("js-boton-agregar-producto");

              localStorage.setItem(`boton-${productoId}`, "cancelar");

              // habilito botones de PAGAR/CANCELAR para concretar la operación
              // en la sección hero de la pagina

              const botones = document.querySelectorAll(".js-boton-hero");
              botones.forEach((boton) => {
                boton.disabled = false;
              });
            } else if (result.isDismissed) {

              // función con mensaje popup si se CANCELA/ELIMINA el producto del carrito

              mensajeProductoCancelado();
            }
          });
        }
      });

      /*--------------------------------------------------------------//
               BOTÓN CANCELAR PRODUCTO DEL LISTADO DE COMPRA
      //--------------------------------------------------------------*/

      if (boton.classList.contains("js-boton-cancelar-producto")) {

        // función con mensaje popup preguntando si desea CANCELAR el producto del carrito de compras

        preguntaCancelarProducto().then((result) => {
          if (result.isConfirmed) {
            
            // busco el producto del listado de compras a cancelar/eliminar

            let productoId = boton.dataset.productoId;
            let indice = listadoDeCompra.findIndex(
              (item) => item.productoId === productoId
            );

            // cancelo/elimino el producto del listado de compras

            if (indice !== -1) {
              listadoDeCompra.splice(indice, 1);
            }

            // deshabilito el boton PAGAR/CANCELAR si no hay más productos en el carrito de compras

            if (listadoDeCompra.length === 0) {
              const botones = document.querySelectorAll(".js-boton-hero");
              botones.forEach((boton) => {
                boton.disabled = true;
              });
            }

            // actualizo cuentas totales si se eliminan productos individualmente

            actualizarTotales();

            // devuelvo al botón AGREGAR/CANCELAR del producto su condición original (agregar)

            boton.innerHTML = "AGREGAR";
            boton.classList.remove("js-boton-cancelar-producto");
            boton.classList.add("js-boton-agregar-producto");

            // guardo cambios en el localstorage

            localStorage.setItem(`boton-${productoId}`, "agregar");

            // función texto popup confirmando la cancelación/eliminación del producto del carrito de compras

            mensajeProductoEliminado();
          }
        });
      }
    });
  });
}
