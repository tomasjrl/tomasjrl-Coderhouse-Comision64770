// variable para exportar productos declarada

export let productos;


// funcion para cargar los productos traidos del JSON

export async function cargarProductos() {
  try {
    const respuesta = await fetch("./assets/data/productos.json");
    if (!respuesta.ok) {
      throw new Error(`Error al cargar productos: ${respuesta.status}`);
    }
    const data = await respuesta.json();
    productos = data;
    return productos; //devuelva la promesa con los productos cargados
  } catch (error) {
    Swal.fire({
      title: 'Sitio en mantenimiento.',
      text: 'Ingrese más tarde. Disculpe las molestias.',
      icon: 'warning'
    });
  }
}

// Reinicia el stock de los productos para futuras interacciones

export function restablecerProductos() {
  fetch("./assets/data/productos.json")
    .then((resp) => resp.json())
    .then((data) => {
      productos = data;
      localStorage.removeItem("productos");
    });
}