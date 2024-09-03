/*--------------------------------------------------------------//
            FUNCIÓN PARA CARGAR / ELIMINAR PRODUCTOS
//--------------------------------------------------------------*/

import { cargarProductosJson, eliminarProductos, mensajeError } from './functions/productos-utils.js';

export let productos = [];

export async function cargarProductos() {
  try {
    productos = await cargarProductosJson();
  } catch (error) {
    mensajeError(error);
  }
}

export async function restablecerProductos() {
  try {
    await eliminarProductos();
  } catch (error) {
    mensajeError(error);
  }
}