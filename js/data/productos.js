import { cargarProductosJson, eliminarProductos, mensajeError } from './productos-utils.js';


export let productos = []; // variable para exportar productos declarada

// Función para cargar los productos
// Carga los productos desde el JSON

export async function cargarProductos() {
  try {
    productos = await cargarProductosJson();
  } catch (error) {
    mensajeError(error);
  }
}

// Función para reiniciar el stock de los productos para futuras interacciones
// Reinicia el stock de los productos desde el JSON y elimina el almacenamiento local

export async function restablecerProductos() {
  try {
    await eliminarProductos();
  } catch (error) {
    mensajeError(error);
  }
}