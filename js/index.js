let listadoDeCompra = [];

import { productos } from "./data/productos.js";
import { generarHTMLProductos } from "./html/contenedor-html.js";
import { buscarProductos } from "./html/buscador.js";
import { actualizarTotales } from "./funciones/cuenta-compras.js";
import { procesoCompra } from "./funciones/proceso-compras.js";
export { listadoDeCompra };

/*--------------------------------------------------------------//
     AGREGA EL LISTADO DE PRODUCTOS POR ALFABETO AL HTML 
//--------------------------------------------------------------*/

productos.sort((a, b) => a.marca.localeCompare(b.marca));
let htmlProductos = generarHTMLProductos(productos);
document.querySelector(".js-productos-grid").innerHTML = htmlProductos;

/*--------------------------------------------------------------//
     BUSCA PRODUCTOS EN EL HTML
//--------------------------------------------------------------*/

buscarProductos();
document.querySelector("#buscador").addEventListener("input", buscarProductos);

/*--------------------------------------------------------------//
     SUMA UNIDADES Y SUBTOTAL DEL LISTADO DE COMPRA
//--------------------------------------------------------------*/

actualizarTotales();

/*--------------------------------------------------------------//
     PROCESO DE COMPRA PARA AGREGAR-CANCELAR / PAGAR-CANCELAR     
//--------------------------------------------------------------*/

procesoCompra(listadoDeCompra);
