import { actualizarTotales } from "./cuenta-compras.js";
import { productos , restablecerProductos } from "../data/productos.js";
import { actualizarStock } from "../html/actualizarStock.js";

let stockOriginal = {};
let stockRestante = 0;

export function procesoCompra(listadoDeCompra) {
  /*--------------------------------------------------------------//
     BOTON AGREGAR PRODUCTO AL LISTADO DE COMPRA
  //--------------------------------------------------------------*/

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
              productoStock,
              subtotal,
              productoId = boton.dataset.productoId;
            productoMarca = boton.dataset.productoMarca;
            productoContenido = boton.dataset.productoContenido;
            productoMedida = boton.dataset.productoMedida;
            productoPrecio = boton.dataset.productoPrecio;
            productoStock = boton.dataset.productoStock;

            if (!stockOriginal[productoId]) {
              stockOriginal[productoId] = productoStock;
            }

            Swal.fire({
              title: `Ingrese la cantidad:<br>(máximo ${productoStock} unidades)`,
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
                const maximo = parseInt(productoStock);
                if (value <= 0 || value > maximo) {
                  return "Ingrese un número mayor a 0 sin superar el máximo.";
                }
              },
              preConfirm: async (cantidad) => {
                let input = cantidad;
                if (!isNaN(input) && input > 0 && input <= productoStock) {
                  stockRestante = productoStock - input;
                  unidades = parseInt(input);
                  productos.forEach((producto) => {
                    if (producto.identificador === productoId) {
                      producto.stock = stockRestante;
                    }
                  });

                  actualizarStock(productoId, stockRestante);

                  return true;
                } else {
                  return (
                    "Por favor, ingrese un número positivo mayor que 0 y no mayor a " +
                    productoStock
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
              productos.forEach((producto) => {
                if (producto.identificador === productoId) {
                  producto.stock = stockOriginal[productoId];
                }
              });

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

  /*--------------------------------------------------------------//
     PARA PAGAR / CANCELAR LA COMPRA TOTAL
   //--------------------------------------------------------------*/

  function restablecerCompra(tipo) {
    const botones = document.querySelectorAll(".js-boton-hero");

    botones.forEach((boton) => {
      boton.disabled = true;
    });

    listadoDeCompra.splice(0, listadoDeCompra.length);

    Swal.fire({
      icon: tipo === "pagar" ? "success" : "info",
      background: "#153081",
      color: "#eaeaea",
      title: `Proceso de compra ${
        tipo === "pagar" ? "COMPLETADO" : "CANCELADO"
      }.`,
      showConfirmButton: true,
    });

    document
      .querySelectorAll(".js-boton-cancelar-producto")
      .forEach((boton) => {
        boton.innerHTML = "AGREGAR";
        boton.classList.remove("js-boton-cancelar-producto");
        boton.classList.add("js-boton-agregar-producto");
      });

     restablecerProductos();
     localStorage.removeItem("productos");
 
    actualizarTotales([]);
    localStorage.removeItem("listadoDeCompra");


  }

  function agregarEventoBoton(tipo) {
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
}
