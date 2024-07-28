let listadoDeCompra = [];

import { productos } from "./data/productos.js";
import { generarHTMLProductos } from "./html/contenedor-html.js";
import { buscarProductos } from "./html/buscador.js";
import { actualizarTotales } from "./funciones/cuenta-compras.js";
import { procesoCompra } from "./funciones/proceso-compras.js";
export { listadoDeCompra };

/*--------------------------------------------------------------//
     PARA AGREGAR AL HTML EL LISTADO DE PRODUCTOS  
//--------------------------------------------------------------*/

let htmlProductos = generarHTMLProductos(productos);
document.querySelector(".js-productos-grid").innerHTML = htmlProductos;

/*--------------------------------------------------------------//
     PARA BUSCAR PRODUCTOS EN EL HTML
//--------------------------------------------------------------*/

buscarProductos();
document.querySelector("#buscador").addEventListener("input", buscarProductos);

/*--------------------------------------------------------------//
     PARA SUMAR UNIDADES Y SUBTOTAL DEL LISTADO DE COMPRA
//--------------------------------------------------------------*/

actualizarTotales();

/*--------------------------------------------------------------//
     PARA AGREGAR / CANCELAR / PAGAR / CANCELAR PROCESO DE COMPRA     
//--------------------------------------------------------------*/

procesoCompra(listadoDeCompra);
