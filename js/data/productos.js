

// variable para exportar productos declarada 

export let productos;


/*fetch para importar productos el array de objetos de los productos 
desde el JSON = simulando un backend*/

fetch("./assets/data/productos.json")
  .then(function(resp) {
    return resp.json();
  })
  .then(function(data) {
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
  });

    // Reinicia el stock de los productos para futuras interacciones

  export function restablecerProductos() {
  fetch("./assets/data/productos.json")
    .then((resp) => resp.json())
    .then((data) => {
      productos = data;
      localStorage.removeItem("productos");
    });
}