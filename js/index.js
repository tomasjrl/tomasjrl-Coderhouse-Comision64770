import { productos } from "./data/productos.js";
import { actualizarTotales } from "./funciones/cuenta-compras.js";
import { generarHTMLProductos } from "./html/contenedor-html.js";
import { buscarProductos } from "./html/buscador.js";
import { listadoDeCompra, actualizarTextarea } from "./html/listado-compra.js";
import { botonProducto } from "./funciones/boton-producto.js";
import {
  restablecerCompra,
  agregarEventoBoton,
  culminarCompra,
  botonCancelar,
  botonPagar,
} from "./funciones/PagoCancelacion.js";
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
     PARA AGREGAR AL HTML EL LISTADO DE COMPRA AL TEXTAREA DEL POP-UP      
//--------------------------------------------------------------*/

actualizarTextarea();

/*--------------------------------------------------------------//
     PARA SUMAR UNIDADES Y SUBTOTAL DEL LISTADO DE COMPRA
//--------------------------------------------------------------*/

actualizarTotales();

/*--------------------------------------------------------------//
     PARA AGREGAR / CANCELAR PRODUCTO AL LISTADO DE COMPRA
//--------------------------------------------------------------*/

document.addEventListener("DOMContentLoaded", () => {
  botonProducto(
    listadoDeCompra,
    botonCancelar,
    botonPagar,
    actualizarTextarea,
    actualizarTotales
  );
});

/*--------------------------------------------------------------//
     PARA PAGAR / CANCELAR LA COMPRA TOTAL
//--------------------------------------------------------------*/

culminarCompra();
