// Función de texto popup con pregunta para agregar producto al carrito de compras

export function preguntaAgregarProducto() {
  return Swal.fire({
    title: "¿AGREGAR a la lista de compras?",
    icon: "question",
    background: "#1e4180",
    color: "#eaeaea",
    showDenyButton: true,
    confirmButtonText: "Sí",
    denyButtonText: `No`,
  });
}

// Función texto popup con pregunta sobre cantidad de unidades a incorporar al carrito de compras

export function preguntaCantidad() {
  return Swal.fire({
    title: `Ingrese la cantidad:<br>(máximo 15 unidades)`,
    input: "number",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Agregar",
    background: "#1e4180",
    color: "#eaeaea",
    showLoaderOnConfirm: true,
    inputValidator: (value) => {
      if (value < 1 || value > 15) {
        return "Ingrese un número mayor a 0 sin superar el máximo.";
      }
    },
    preConfirm: async (cantidad) => {
      let input = cantidad;
      if (!isNaN(input) && input > 0 && input <= 15) {
        // return true;
        return parseInt(input);
      } else {
        return (
          "Por favor, ingrese un número positivo mayor que 0 y no mayor a " + 15
        );
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
}

// Función de mensaje popup de confirmación del producto agregado al carrito de compras

export function mensajeProductoAgregado() {
  Swal.fire({
    title: `AGREGADO<br>a lista de compras`,
    icon: "success",
    background: "#1e4180",
    color: "#eaeaea",
    confirmButtonText: "Continuar",
  });
}

//Función de mensaje popup si cancela el producto del carrito

export function mensajeProductoCancelado() {
  Swal.fire({
    title: "Producto CANCELADO de la lista de compras.",
    icon: "info",
    background: "#1e4180",
    color: "#dcdedf",
    showConfirmButton: true,
  });
};


//Función de mensaje popup que pregunta si quiere eliminar el producto del carrito

export function preguntaCancelarProducto() { 
  return Swal.fire({
  title: "¿ELIMINAR de la lista de compras?",
  icon: "question",
  showDenyButton: true,
  background: "#1e4180",
  color: "#dcdedf",
  confirmButtonText: "Sí",
  denyButtonText: `No`,
})};


// Función de texto popup confirmando la eliminación del producto del carrito de compras

export function mensajeProductoEliminado() {
return Swal.fire({
  title: `ELIMINADO<br>de la lista de compras`,
  icon: "info",
  background: "#1e4180",
  color: "#eaeaea",
  confirmButtonText: "Continuar",
})}