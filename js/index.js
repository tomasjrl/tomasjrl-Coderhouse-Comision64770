import { ordenarProductos } from "./html/ordenarProductos.js";
import { buscarProductos } from "./html/buscador.js";
import { actualizarTotales, listadoDeCompra } from "./utils/cuenta-compras.js";
import { procesoCompra } from "./utils/proceso-compras.js";
import { toggleMode } from "./html/dark-mode.js";
import { cargarProductos } from "./data/productos.js";



/* función async para iniciar el código */

async function iniciarCodigo() {

  /* espero (await) que se complete la función que carga los productos antes de continuar con el código */

  await cargarProductos();

  /* llamo a la función que permite cambiar modo claro-oscuro */

  toggleMode();

  /* llamo a la función que permite buscar/encontrar productos según parámetros de búsqueda*/

  buscarProductos();

  /* llamo a la función que permite generar el contenido HTML que comprende a las cartas de productos
  que estarán dentro de <section class="productos-grid js-productos-grid"> */

  ordenarProductos();

  /* llamo a la función que permite actualizar las cuentas luego de agregar/quitar productos al listado de compras*/

  actualizarTotales();

  /* llamo a la función que ejecuta la lógica del procesamiento de datos entre el click del usuario en los botones 
  (agregar / cancelar / pagar total / cancelar total) en relación a los valores de los productos para agregarlo al listado de compras  */
  
  procesoCompra(listadoDeCompra);

}

// llamo a la función iniciarCodigo

iniciarCodigo(); 
