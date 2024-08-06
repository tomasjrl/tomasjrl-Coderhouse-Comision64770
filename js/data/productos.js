export let productos;

fetch("./assets/data/productos.json")
  .then(function(resp) {
    return resp.json();
  })
  .then(function(data) {
    productos = data;
    // Actualizar stock desde localStorage si existe
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