  // Función para restaurar botones de producto

  export function recuperarEstadoBotones() {
  document.querySelectorAll(".js-boton-agregar-producto").forEach((boton) => {
    const productoId = boton.dataset.productoId;
    const estadoBoton = localStorage.getItem(`boton-${productoId}`);
  
    if (estadoBoton === "cancelar") {
      boton.innerHTML = "CANCELAR";
      boton.classList.add("js-boton-cancelar-producto");
      boton.classList.remove("js-boton-agregar-producto");
    }
  })}