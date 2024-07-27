/*--------------------------------------------------------------//
     PARA AGREGAR AL HTML EL LISTADO DE COMPRA AL TEXTAREA DEL POP-UP      
//--------------------------------------------------------------*/

let listadoDeCompra = [];

export { listadoDeCompra };

// Función para actualizar el contenido del textarea
export function actualizarTextarea() {
  if (listadoDeCompra.length === 0) {
    document.getElementById("texto-popup").value = "Listado de compra:";
  } else {
    const contenido = listadoDeCompra
      .map((obj) => {
        const valores = Object.values(obj);
        const valoresFiltrados = valores.filter(
          (valor, indice) => indice !== 0 && indice !== 6
        );
        const linea2y3 = valoresFiltrados[1] + " " + valoresFiltrados[2];
        valoresFiltrados.splice(1, 2, linea2y3);
        valoresFiltrados[2] = "Precio por unidad: $" + valoresFiltrados[2];
        valoresFiltrados[3] = "Unidades: " + valoresFiltrados[3];
        return valoresFiltrados.join("\n");
      })
      .join("\n\n");
    document.getElementById("texto-popup").value =
      "Listado de compra:\n\n" + contenido;
  }
}
