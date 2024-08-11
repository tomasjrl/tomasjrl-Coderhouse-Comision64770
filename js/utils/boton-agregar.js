import { actualizarTotales } from "./cuenta-compras.js";

//funcion para agregar productos al carrito de compras

export function botonesProductos(listadoDeCompra) {
  //escucho el click del boton del producto que corresponda a su contenedor

  document.querySelectorAll(".js-boton-agregar-producto").forEach((boton) => {
    boton.addEventListener("click", () => {
      // inicio texto popup con pregunta para agregar producto al carrito de compras

      if (boton.classList.contains("js-boton-agregar-producto"))
        Swal.fire({
          title: "¿AGREGAR a la lista de compras?",
          icon: "question",
          background: "#153081",
          color: "#eaeaea",
          showDenyButton: true,
          confirmButtonText: "Sí",
          denyButtonText: `No`,
        }).then((result) => {
          // si confirma, asigno variables con los contenidos del objeto del array productos.js

          if (result.isConfirmed) {
            let unidades,
              productoMarca,
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

            Swal.fire({
              title: `Ingrese la cantidad:<br>(máximo 15 unidades)`,
              input: "number",
              inputAttributes: {
                autocapitalize: "off",
              },
              showCancelButton: true,
              cancelButtonText: "Cancelar",
              confirmButtonText: "Agregar",
              background: "#153081",
              color: "#eaeaea",
              showLoaderOnConfirm: true,
              inputValidator: (value) => {
                if (value < 1 || value > 15) {
                  return "Ingrese un número mayor a 0 sin superar el máximo.";
                }
              },

              // si cumple con los parámetros la cantidad asignada, devuelve positivo

              preConfirm: async (cantidad) => {
                let input = cantidad;
                if (!isNaN(input) && input > 0 && input <= 15) {
                  unidades = parseInt(input);
                  return true;
                } else {
                  // si NO cumple con los parámetros la cantidad asignada, informa y devuelve al estado anterior

                  return (
                    "Por favor, ingrese un número positivo mayor que 0 y no mayor a " +
                    15
                  );
                }
              },
              allowOutsideClick: () => !Swal.isLoading(),
            }).then((result) => {
              // mensaje popup de confirmación del producto agregado al carrito de compras

              if (result.isConfirmed) {
                Swal.fire({
                  title: `AGREGADO<br>a lista de compras`,
                  icon: "success",
                  background: "#153081",
                  color: "#eaeaea",
                  confirmButtonText: "Continuar",
                });

                // operacion multiplicando precio por cantidad de unidades elegidas por el usuario

                subtotal = parseFloat(productoPrecio) * unidades;

                // envio datos a la variable listadoDeCompra

                listadoDeCompra.push({
                  productoId: productoId,
                  productoMarca: productoMarca,
                  productoContenido: productoContenido,
                  productoMedida: productoMedida,
                  productoPrecio: productoPrecio,
                  productoUnidades: unidades,
                  productoSubtotal: subtotal,
                });

                //actualizo cuentas totales a medida que se sumen productos a la lista

                actualizarTotales();

                //cambio el estado del boton de la carta del producto
                // pasando de agregar a CANCELAR

                boton.innerHTML = "CANCELAR";
                boton.classList.add("js-boton-cancelar-producto");
                boton.classList.remove("js-boton-agregar-producto");

                localStorage.setItem(`boton-${productoId}`, "cancelar");

                // habilito botones de pagar/cancelar para concretar la operación
                //en la seccion hero de la pagina

                const botones = document.querySelectorAll(".js-boton-hero");
                botones.forEach((boton) => {
                  boton.disabled = false;
                });
              } else if (result.isDismissed) {
                //mensaje popup si cancela el producto del carrito

                Swal.fire({
                  title: "Producto CANCELADO de la lista de compras.",
                  icon: "info",
                  background: "#153081",
                  color: "#dcdedf",
                  showConfirmButton: true,
                });
              }
            });
          }
        });

      /*--------------------------------------------------------------//
     BOTON CANCELAR PRODUCTO DEL LISTADO DE COMPRA
   //--------------------------------------------------------------*/

      if (boton.classList.contains("js-boton-cancelar-producto")) {
        Swal.fire({
          //mensaje popup preguntando si desea cancelar el producto del carrito de compras

          title: "¿ELIMINAR de la lista de compras?",
          icon: "question",
          showDenyButton: true,
          background: "#153081",
          color: "#dcdedf",
          confirmButtonText: "Sí",
          denyButtonText: `No`,
        }).then((result) => {
          if (result.isConfirmed) {
            //busco el producto del listado de compras a eliminar

            let productoId = boton.dataset.productoId;
            let indice = listadoDeCompra.findIndex(
              (item) => item.productoId === productoId
            );

            // elimino el producto del listado de compras

            if (indice !== -1) {
              listadoDeCompra.splice(indice, 1);
            }

            // deshabilito el boton pagar/cancelar si no hay productos en el carrito de compras

            if (listadoDeCompra.length === 0) {
              const botones = document.querySelectorAll(".js-boton-hero");
              botones.forEach((boton) => {
                boton.disabled = true;
              });
            }

            // actualizo cuentas totales si se eliminan productos individualmente
            actualizarTotales();

            const idProducto = boton.dataset.productoId;
            const elementos = document.querySelectorAll(".id-producto");

            // devuelvo al boton del producto su condicio original (agregar)

            boton.innerHTML = "AGREGAR";
            boton.classList.remove("js-boton-cancelar-producto");
            boton.classList.add("js-boton-agregar-producto");

            // guardo cambios en localstorage

            localStorage.setItem(`boton-${productoId}`, "agregar");

            // texto popup confirmando la eliminación del producto del carrito de compras
            Swal.fire({
              title: `ELIMINADO<br>de la lista de compras`,
              icon: "info",
              background: "#153081",
              color: "#eaeaea",
              confirmButtonText: "Continuar",
            });
          }
        });
      }
    });
  });
}
