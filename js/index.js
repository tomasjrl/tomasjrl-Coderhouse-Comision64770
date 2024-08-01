import { crearHeroSection } from "./html/hero-html.js";
import { ordenarProductos } from "./html/ordenarProductos.js";
import { buscarProductos } from "./html/buscador.js";
import { actualizarTotales } from "./utils/cuenta-compras.js";
import { procesoCompra } from "./utils/proceso-compras.js";
export { listadoDeCompra };

let listadoDeCompra = [];

crearHeroSection();

ordenarProductos();

buscarProductos();

actualizarTotales();

procesoCompra(listadoDeCompra);
