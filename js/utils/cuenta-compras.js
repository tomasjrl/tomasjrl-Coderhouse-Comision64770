/*--------------------------------------------------------------//
     PARA SUMAR UNIDADES Y SUBTOTAL DEL LISTADO DE COMPRA
//--------------------------------------------------------------*/

let unidadesDeCompras = 0;
let subtotalDeCompras = 0;

export let listadoDeCompra = [];


if (localStorage.getItem('listadoDeCompra') && localStorage.getItem('listadoDeCompra') !== 'Listado de Compra:') {
  const stringifiedListadoDeCompra = localStorage.getItem('listadoDeCompra');
  const listadoDeCompraObjeto = JSON.parse(stringifiedListadoDeCompra);
  listadoDeCompra = listadoDeCompraObjeto;
}

export function actualizarTotales() {
  unidadesDeCompras = 0;
  subtotalDeCompras = 0;

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

  console.log(listadoDeCompra);

  localStorage.setItem(
    "listadoDeCompra",
    JSON.stringify(listadoDeCompra, null, 2)
  );

  console.log("desde localstorage texto");
  console.log(localStorage.getItem("listadoDeCompra"));

  const stringifiedListadoDeCompra = localStorage.getItem("listadoDeCompra");

  const texto = listadoDeCompra.length === 0 
  ? "Listado de Compra:" 
  : listadoDeCompra.map(item => 
    ` ${item.productoMarca}
 ${item.productoContenido}
 ${item.productoMedida}
 Precio x unidad: $${item.productoPrecio}
 Unidades: ${item.productoUnidades}
 Subtotal: $${item.productoSubtotal}
 ______________________________`
  ).join("\n");

document.getElementById("texto-popup").value = texto;


if (listadoDeCompra.length > 0) {
  const botones = document.querySelectorAll(".js-boton-hero");
  botones.forEach((boton) => {
    boton.disabled = false;
  });
}

  return { unidadesDeCompras, subtotalDeCompras };
}

