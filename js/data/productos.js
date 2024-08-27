export let productos; // variable para exportar productos declarada

// Función para cargar los productos
// Carga los productos desde el JSON

export async function cargarProductos() {
  try {
    await cargarProductosJson();
  } catch (error) {
    mensajeError();
  }
}

// Reinicia el stock de los productos para futuras interacciones
// Reinicia el stock de los productos desde el JSON y elimina el almacenamiento local

export async function restablecerProductos() {
  try {
    const respuesta = await fetch("./assets/data/productos.json");
    if (!respuesta.ok) {
      throw new Error(`Error al restablecer productos: ${respuesta.status}`);
    }
    const data = await respuesta.json();
    productos = data;
    localStorage.removeItem("productos");
  } catch (error) {
    mensajeError();
  }
}

// Función para cargar los productos traídos del JSON
// Carga los productos desde el JSON y devuelve la promesa con los productos cargados.

async function cargarProductosJson() {
  const respuesta = await fetch("./assets/data/productos.json");
  if (!respuesta.ok) {
    throw new Error(`Error al cargar productos: ${respuesta.status}`);
  }
  const data = await respuesta.json();
  productos = data;
  return productos; // devuelve la promesa con los productos cargados
}

// Función de mensaje de mantenimiento de sitio
// Muestra un mensaje de mantenimiento de sitio.

function mensajeError() {
  Swal.fire({
    title: "Sitio en mantenimiento.",
    text: "Ingrese más tarde. Disculpe las molestias.",
    icon: "warning",
  });
}
