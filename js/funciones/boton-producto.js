/*--------------------------------------------------------------//
     PARA AGREGAR / CANCELAR PRODUCTO AL LISTADO DE COMPRA
//--------------------------------------------------------------*/

export function botonProducto(listadoDeCompra, botonCancelar, botonPagar, actualizarTextarea, actualizarTotales ) {
  document.querySelectorAll(".js-boton-agregar-producto").forEach((boton) => {
    boton.addEventListener("click", () => {
      if (boton.classList.contains("js-boton-agregar-producto")) {
        let unidades;
  
        // agrego un alert para indicar si desea confirmar el producto
        // agrego un confirm para que indique la cantidad de productos
        // agrego un 2do alert confirmando la cantidad agregada
        // deshabilito boton de agregar producto
  
        if (confirm("¿Confirma agregar este producto a la lista de compras?")) {
          let unidades,
            productoId,
            productoMarca,
            productoContenido,
            productoMedida,
            productoPrecio,
            subtotal,
            matchingItem;
  
          while (true) {
            let input = prompt(
              "Ingrese la cantidad de unidades que desea agregar:"
            );
  
            if (input === null) {
              alert("Proceso cancelado.");
              return;
            }
  
            unidades = parseInt(input);
  
            if (!isNaN(unidades) && unidades > 0) {
              break;
            } else {
              alert(
                "Cantidad no válida. Pruebe nuevamente ingresando un número mayor a 0."
              );
            }
          }
  
          productoId = boton.dataset.productoId;
          productoMarca = boton.dataset.productoMarca;
          productoContenido = boton.dataset.productoContenido;
          productoMedida = boton.dataset.productoMedida;
          productoPrecio = boton.dataset.productoPrecio;
  
          alert(
            `Agregado a la lista de compras:\n\n${productoMarca} ${productoContenido} ${productoMedida}\n\nPrecio $${productoPrecio} * Unidades ${unidades} = $${
              parseFloat(productoPrecio) * unidades
            }`
          );
  
          subtotal = parseFloat(productoPrecio) * unidades;
  
          listadoDeCompra.forEach((item) => {
            if (productoId === item.productoId) {
              matchingItem = item;
            }
          });
  
          if (matchingItem) {
            matchingItem.productoUnidades += unidades;
            matchingItem.productoSubtotal += subtotal;
          } else {
            listadoDeCompra.push({
              productoId: productoId,
              productoMarca: productoMarca,
              productoContenido: productoContenido,
              productoMedida: productoMedida,
              productoPrecio: productoPrecio,
              productoUnidades: unidades,
              productoSubtotal: subtotal,
            });
          }
  
          botonCancelar.disabled = false;
          botonPagar.disabled = false;
          document
            .querySelector(".js-pago-total")
            .classList.add("js-pago-total-amarillo");
  
          actualizarTotales();
  
          boton.innerHTML = "CANCELAR";
          boton.classList.add("js-boton-cancelar-producto");
          boton.classList.remove("js-boton-agregar-producto");
        }
      } else {
        if (
          !confirm("¿Confirma CANCELAR este producto de la lista de compras?")
        ) {
          return;
        }
        alert("Producto CANCELADO de la lista de compras.");
  
        // Declarar la variable productoId
        let productoId = boton.dataset.productoId;
  
        // Encontrar el objeto del producto en el array compra
        let indice = listadoDeCompra.findIndex(
          (item) => item.productoId === productoId
        );
  
        // Eliminar el objeto del producto del array compra
        if (indice !== -1) {
          listadoDeCompra.splice(indice, 1);
        }
        // Actualizar totales
        actualizarTotales();
  
        // Actualizar el contenido del textarea
        actualizarTextarea();
  
        boton.innerHTML = "AGREGAR";
        boton.classList.remove("js-boton-cancelar-producto");
        boton.classList.add("js-boton-agregar-producto");
      }
    });
  });
}