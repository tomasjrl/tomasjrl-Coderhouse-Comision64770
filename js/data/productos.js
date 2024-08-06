export let productos;

fetch("./assets/data/productos.json")
  .then(function(resp) {
    return resp.json();
  })
  .then(function(data) {
    productos = data;
  });
