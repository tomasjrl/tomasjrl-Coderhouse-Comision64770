import { ordenarProductos } from "./html/ordenarProductos.js";
import { buscarProductos } from "./html/buscador.js";
import { actualizarTotales, listadoDeCompra } from "./utils/cuenta-compras.js";
import { procesoCompra } from "./utils/proceso-compras.js";
import { toggleMode } from "./html/dark-mode.js";
import { cargarProductos } from "./data/productos.js";



/* funcion async para iniciar el codigo */

async function iniciarCodigo() {

  /* espero (await) que se complete la funcion que carga los productos antes de continuar con el código */
  await cargarProductos();

  /* llamo a la funcion que permite cambiar modo claro-oscuro */
  toggleMode();

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

}

iniciarCodigo(); // Llama a la función iniciarCodigo

