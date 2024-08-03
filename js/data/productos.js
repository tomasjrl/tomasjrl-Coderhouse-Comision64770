import { obtenerProductos } from './productos.service.js';

export let productos = [];

obtenerProductos().then((data) => {
  productos = data;
});