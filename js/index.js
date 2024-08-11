import { crearHeroSection } from "./html/hero-html.js";
import { ordenarProductos } from "./html/ordenarProductos.js";
import { buscarProductos } from "./html/buscador.js";
import { actualizarTotales , listadoDeCompra } from "./utils/cuenta-compras.js";
import { procesoCompra } from "./utils/proceso-compras.js";
import { toggleMode } from "./html/dark-mode.js";


setTimeout(() => {
  /* llamo a la funcion que permite cambiar modo claro-oscuro */
  toggleMode();

  /* llamo a la funcion para generar el contenido HTML que estará dentro de <section class="hero-section"> 
  Aquí esta ubicado el listado de compras, las cuentas y la opción de pagar/cancelar la operación*/
  crearHeroSection();

  /* llamo a la funcion que permite buscar/encontrar productos según parámetros de búsqueda*/
  buscarProductos();

  /* llamo a la funcion que permite generar el contenido HTML que comprende a las cartas de productos
  que estarán dentro de <section class="productos-grid js-productos-grid"> */
  ordenarProductos();

  /* llamo a la funcion que permite actualizar las cuentas luego de agregar/quitar productos al listado de compras*/
  actualizarTotales();

  /* llamo a la funcion que ejecuta la logica del procesamiento de datos entre el click del usuario en los botones 
  (agregar / cancelar / pagar total / cancelar total) en relación a los valores de los productos para agregarlo al listado de compras  */
  procesoCompra(listadoDeCompra);
}, 100); // retraso de 100 milisegundos