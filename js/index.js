import { crearHeroSection } from "./html/hero-html.js";
import { ordenarProductos } from "./html/ordenarProductos.js";
import { buscarProductos } from "./html/buscador.js";
import { actualizarTotales , listadoDeCompra } from "./utils/cuenta-compras.js";
import { procesoCompra } from "./utils/proceso-compras.js";


crearHeroSection();

ordenarProductos();

buscarProductos();

actualizarTotales();

procesoCompra(listadoDeCompra);
