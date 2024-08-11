import { actualizarTotales } from "./cuenta-compras.js";


export function botonesProductos(listadoDeCompra) {
  document.querySelectorAll(".js-boton-agregar-producto").forEach((boton) => {
    boton.addEventListener("click", () => {
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
                if (value <= 0 || value > 15) {
                  return "Ingrese un número mayor a 0 sin superar el máximo.";
                }
              },
              preConfirm: async (cantidad) => {
                let input = cantidad;
                if (!isNaN(input) && input > 0 && input <= 15) {
                  unidades = parseInt(input);
                  return true;
                } else {
                  return (
                    "Por favor, ingrese un número positivo mayor que 0 y no mayor a " +
                    15
                  );
                }
              },
              allowOutsideClick: () => !Swal.isLoading(),
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: `AGREGADO<br>a lista de compras`,
                  icon: "success",
                  background: "#153081",
                  color: "#eaeaea",
                  confirmButtonText: "Continuar",
                });

                subtotal = parseFloat(productoPrecio) * unidades;

                listadoDeCompra.push({
                  productoId: productoId,
                  productoMarca: productoMarca,
                  productoContenido: productoContenido,
                  productoMedida: productoMedida,
                  productoPrecio: productoPrecio,
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
          title: "¿ELIMINAR de la lista de compras?",
          icon: "question",
          showDenyButton: true,
          background: "#153081",
          color: "#dcdedf",
          confirmButtonText: "Sí",
          denyButtonText: `No`,
        }).then((result) => {
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

            const idProducto = boton.dataset.productoId;
            const elementos = document.querySelectorAll(".id-producto");

            boton.innerHTML = "AGREGAR";
            boton.classList.remove("js-boton-cancelar-producto");
            boton.classList.add("js-boton-agregar-producto");

            localStorage.setItem(`boton-${productoId}`, "agregar");

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