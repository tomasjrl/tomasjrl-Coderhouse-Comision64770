import { ordenarProductos } from "./html/ordenarProductos.js";
import { buscarProductos } from "./html/buscador.js";
import { actualizarTotales, listadoDeCompra } from "./utils/cuenta-compras.js";
import { procesoCompra } from "./utils/proceso-compras.js";
import { modoOscuro } from "./html/dark-mode.js";
import { cargarProductos } from "./data/productos.js";

async function iniciarCodigo() {
  await cargarProductos();
  modoOscuro();
  buscarProductos();
  ordenarProductos(); 
  actualizarTotales();
  procesoCompra(listadoDeCompra);
}

iniciarCodigo();
