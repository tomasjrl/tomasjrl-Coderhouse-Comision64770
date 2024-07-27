import { listadoDeCompra } from "../index.js";

/*--------------------------------------------------------------//
     PARA SUMAR UNIDADES Y SUBTOTAL DEL LISTADO DE COMPRA
//--------------------------------------------------------------*/

let unidadesDeCompras = 0;
let subtotalDeCompras = 0;

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

  console.clear();

  console.log(
    `%cCUENTAS DE SUPERPRECIOS`,
    "color: lightyellow; font-weight: bold;"
  );

  console.log(
    `%cListado de Compra = ${JSON.stringify(
      listadoDeCompra.map((producto) => ({
        ...producto,
        productoPrecio: `$${producto.productoPrecio}`,
        productoSubtotal: `$${producto.productoSubtotal}`,
      })),
      null,
      2
    )}`,
    "color: lightpink; font-weight: bold;"
  );

  console.log(
    `%cTOTAL UNIDADES = ${unidadesDeCompras}`,
    "color: lightblue; font-weight: bold;"
  );

  console.log(
    `%cSUB-TOTAL = $${subtotalDeCompras}`,
    "color: lightblue; font-weight: bold;"
  );

  console.log(`%cIVA: * 1.21`, "color: lightgray; font-weight: bold;");

  console.log(
    `%cTOTAL = $${(subtotalDeCompras * 1.21).toFixed(2)}`,
    "color: lightgreen; font-weight: bold;"
  );

  return { unidadesDeCompras, subtotalDeCompras };
}


export function actualizarListadoDeCompra() {
  listadoDeCompra.push = function () {
    Array.prototype.push.apply(this, arguments); // Agrega el nuevo elemento al array
    actualizarTextarea(); // Actualiza el contenido del textarea
  };
}