export async function cargarProductosJson() {
  const respuesta = await fetch("./assets/data/productos.json");
  if (!respuesta.ok) {
    throw new Error(`Error al cargar productos: ${respuesta.status}`);
  }
  return await respuesta.json();
}

export async function eliminarProductos() {
  const respuesta = await fetch("./assets/data/productos.json");
  if (!respuesta.ok) {
    throw new Error(`Error al restablecer productos: ${respuesta.status}`);
  }
  productos = await respuesta.json();
  localStorage.removeItem("productos");
}

export function mensajeError(error) {
  Swal.fire({
    title: "Sitio en mantenimiento.",
    text: error.message || "Ingrese más tarde. Disculpe las molestias.",
    icon: "warning",
  });
}
