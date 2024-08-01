
import { ordenarProductos } from "./html/ordenarProductos.js";
import { buscarProductos } from "./html/buscador.js";
import { actualizarTotales } from "./utils/cuenta-compras.js";
import { procesoCompra } from "./utils/proceso-compras.js";
export { listadoDeCompra };

let listadoDeCompra = [];

ordenarProductos();

buscarProductos();

actualizarTotales();

procesoCompra(listadoDeCompra);


/* 
CODIGO A AGREGAR CUANDO RESUELVA QUE LOS BOTONES DE LOS PRODUCTOS FUNCIONEN:

import { crearHeroSection } from "./html/hero-html.js";
crearHeroSection();  

 POR AHORA ESTE CODIGO SE CARGA POR HTML 
 */








