import { actualizarTotales } from "./cuenta-compras.js";
import { productos } from "../data/productos.js";
import {
  actualizarStock,
  restaurarStock,
  actualizarTextoPopup,
} from "../html/actualizarStock.js";

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
          title: "¿Confirma agregar este producto a la lista de compras?",
          icon: "question",
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
              title: `Ingrese la cantidad de productos: <br> (máximo ${productoStock} unidades)`,
              input: "number",
              inputAttributes: {
                autocapitalize: "off",
              },
              showCancelButton: true,
              cancelButtonText: "Cancelar",
              confirmButtonText: "Agregar",
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
                  title: `Producto agregado a la lista de compras.`,
                  icon: "success",
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
                actualizarTextoPopup(listadoDeCompra);

                boton.innerHTML = "CANCELAR";
                boton.classList.add("js-boton-cancelar-producto");
                boton.classList.remove("js-boton-agregar-producto");

                const botones = document.querySelectorAll(".js-boton-hero");
                botones.forEach((boton) => {
                  boton.disabled = false;
                });
              } else if (result.isDismissed) {
                Swal.fire(
                  "Producto CANCELADO de la lista de compras.",
                  "",
                  "info"
                );
              }
            });
          }
        });

      /*--------------------------------------------------------------//
     BOTON CANCELAR PRODUCTO DEL LISTADO DE COMPRA
   //--------------------------------------------------------------*/

      if (boton.classList.contains("js-boton-cancelar-producto")) {
        Swal.fire({
          title: "¿Confirma QUITAR este producto a la lista de compras?",
          icon: "question",
          showDenyButton: true,
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
            actualizarTextoPopup(listadoDeCompra);

            const idProducto = boton.dataset.productoId;
            const elementos = document.querySelectorAll(".id-producto");

            restaurarStock();

            boton.innerHTML = "AGREGAR";
            boton.classList.remove("js-boton-cancelar-producto");
            boton.classList.add("js-boton-agregar-producto");
            Swal.fire("Producto cancelado.", "", "info");
          }
        });
      }
    });
  });

  /*--------------------------------------------------------------//
     PARA PAGAR / CANCELAR LA COMPRA TOTAL
   //--------------------------------------------------------------*/

  function restablecerCompra(tipo) {
    // Restablezco valores a 0
    document.querySelector(".js-cantidad-compras").innerHTML = "0";
    document.querySelector(".js-suma-compras").innerHTML = "$0";
    document.querySelector(".js-pago-total").innerHTML = "$0";

    const botones = document.querySelectorAll(".js-boton-hero");

    botones.forEach((boton) => {
      boton.disabled = true;
    });

    // Restablezco el array de compra.js
    // Restauro el stock original para todos los productos en la lista de compra
    listadoDeCompra.forEach((item) => {
      productos.forEach((producto) => {
        if (producto.identificador === item.productoId) {
          producto.stock = stockOriginal[item.productoId];
        }
      });
    });

    listadoDeCompra.splice(0, listadoDeCompra.length);

    Swal.fire({
      icon: tipo === "pagar" ? "success" : "info",
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
        document.querySelector(".js-pago-total").innerText = "$0.00";
      });
  }

  function agregarEventoBoton(tipo) {
    document
      .querySelector(`.js-boton-${tipo}-compra`)
      .addEventListener("click", () => {
        Swal.fire({
          title: `¿Confirma ${tipo} su compra?`,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Confirmar",
          denyButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            restablecerCompra(tipo);
            document.getElementById("texto-popup").value = "Listado de Compra:";
            restaurarStock();
          }
        });
      });
  }

  agregarEventoBoton("pagar");
  agregarEventoBoton("cancelar");
}
