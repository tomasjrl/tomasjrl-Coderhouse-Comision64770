// variable para exportar productos declarada

export let productos;

// Función async para cargar productos
export async function cargarProductos() {
  const respuesta = await fetch("./assets/data/productos.json");
  const data = await respuesta.json();
  productos = data;

  // Actualizar stock desde localStorage si este existe, sino toma el stock por defecto declarado en el JSON

  const stockGuardado = localStorage.getItem('productos');
  if (stockGuardado) {
    const productosConStock = JSON.parse(stockGuardado);
    productos.forEach((producto) => {
      const productoConStock = productosConStock.find((p) => p.identificador === producto.identificador);
      if (productoConStock) {
        producto.stock = productoConStock.stock;
      }
    });
  }
}

// Llamar a la función cargarProductos
cargarProductos();

// Reinicia el stock de los productos para futuras interacciones

export function restablecerProductos() {
  fetch("./assets/data/productos.json")
    .then((resp) => resp.json())
    .then((data) => {
      productos = data;
      localStorage.removeItem("productos");
    });
}