// Función para sumar la cantidad de productos y el subtotal respecto de su precio por unidad

export function actualizarCuentas(unidadesDeCompras, subtotalDeCompras, listadoDeCompra, productos){

  listadoDeCompra.forEach((item) => {
    unidadesDeCompras += item.productoUnidades;
    subtotalDeCompras += item.productoSubtotal;
  });

  document.querySelector(
    ".js-cantidad-compras"
  ).innerHTML = `${unidadesDeCompras}`;
  document.querySelector(
    ".js-suma-compras"
  ).innerHTML = `$${subtotalDeCompras}`;
  document.querySelector(".js-pago-total").innerHTML = `$${(
    subtotalDeCompras * 1.21
  ).toFixed(2)}`;

  localStorage.setItem(
    "listadoDeCompra",
    JSON.stringify(listadoDeCompra, null, 2)
  );

  // impresión del texto de listado de compras en el HTML para que el usuario pueda visualizarlo

  const texto =
    listadoDeCompra.length === 0
      ? "Listado de Compra:"
      : listadoDeCompra
          .map(
            (item) =>
              ` ${item.productoMarca}
 ${item.productoContenido}
 ${item.productoMedida}
 Precio x unidad: $${item.productoPrecio}
 Unidades: ${item.productoUnidades}
 Subtotal: $${item.productoSubtotal}
 _________________________`
          )
          .join("\n");

  document.getElementById("texto-popup").value = texto;

  //habilito botones para pagar/cancelar operación total ya que contiene productos el carrito de compras
  // solo se habilita si hay productos cargados al carrito de compras
  
  if (listadoDeCompra.length > 0) {
    const botones = document.querySelectorAll(".js-boton-hero");
    botones.forEach((boton) => {
      boton.disabled = false;
    });
  }

  const stringifiedProductos = JSON.stringify(productos, null, 2);
  localStorage.setItem("productos", stringifiedProductos);

  return { unidadesDeCompras, subtotalDeCompras };
}