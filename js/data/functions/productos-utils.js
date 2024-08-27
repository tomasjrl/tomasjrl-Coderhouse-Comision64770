// Función para cargar los productos traídos del JSON
// Carga los productos desde el JSON y devuelve la promesa con los productos cargados.

export async function cargarProductosJson() {
  const respuesta = await fetch("./assets/data/productos.json");
  if (!respuesta.ok) {
    throw new Error(`Error al cargar productos: ${respuesta.status}`);
  }
  return await respuesta.json();
}

// Función para reiniciar el stock de los productos para futuras interacciones
// Reinicia el stock de los productos desde el JSON y elimina el almacenamiento local

export async function eliminarProductos() {
  const respuesta = await fetch("./assets/data/productos.json");
  if (!respuesta.ok) {
    throw new Error(`Error al restablecer productos: ${respuesta.status}`);
  }
  productos = await respuesta.json();
  localStorage.removeItem("productos");
}


// Función de mensaje de mantenimiento de sitio
// Muestra un mensaje de mantenimiento de sitio.

export function mensajeError(error) {
  Swal.fire({
    title: "Sitio en mantenimiento.",
    text: error.message || "Ingrese más tarde. Disculpe las molestias.",
    icon: "warning",
  });
}
