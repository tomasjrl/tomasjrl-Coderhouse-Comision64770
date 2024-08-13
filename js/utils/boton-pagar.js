import { listadoDeCompra, actualizarTotales } from "./cuenta-compras.js";

// funcion para restablecer la compra ya sea habiendo pagado o cancelado la compra
export function restablecerCompra(tipo) {
  if (tipo === null || tipo === undefined) return;

  const botones = document.querySelectorAll(".js-boton-hero");

  // deshabilito los botones de pagar/cancelar puesto que quedara vacío de productos
  // estos botones solo pueden habilitarse con productos en el carrito de compras
  botones.forEach((boton) => {
    boton.disabled = true;
  });

  listadoDeCompra.splice(0, listadoDeCompra.length);

  // texto popup para informar que la operación final fue completada o cancelada
  Swal.fire({
    icon: tipo === "pagar" ? "success" : "info",
    background: "#153081",
    color: "#eaeaea",
    title: `Proceso de compra <br> ${
      tipo === "pagar" ? "COMPLETADO" : "CANCELADO"
    }.`,
    showConfirmButton: true,
  });

  // devuelvo clases originales a las etiquetas de los botones

  document.querySelectorAll(".js-boton-cancelar-producto").forEach((boton) => {
    const productoId = boton.dataset.productoId;
    boton.innerHTML = "AGREGAR";
    boton.classList.remove("js-boton-cancelar-producto");
    boton.classList.add("js-boton-agregar-producto");
    localStorage.removeItem(`boton-${productoId}`);
  });

  // vacío los arrays de objetos almacenados
  localStorage.removeItem("productos");
  actualizarTotales([]);
  localStorage.removeItem("listadoDeCompra");
}

// texto popup para concretar o cancelar el pago de la compra

export function agregarEventoBoton(tipo) {
  if (tipo === null || tipo === undefined) return;
  document
    .querySelector(`.js-boton-${tipo}-compra`)
    .addEventListener("click", () => {
      if (tipo.toUpperCase() === "PAGAR") {
        try {
          // Aquí iría el código que procesa el pago
          Swal.fire({
            title: `¿Desea ${tipo.toUpperCase()} su compra?`,
            html: `
              <form style="display: flex; flex-direction: column;">
                <input type="text" id="nombre" autocomplete="name" value="Tomás Stabilini" placeholder="Nombre" style="width: 100%; margin-bottom: 10px;">
                <input type="email" id="email" autocomplete="email" value="Comision64770@coderhouse.com" placeholder="Correo electrónico" style="width: 100%; margin-bottom: 10px;">
              </form>
            `,
            icon: "question",
            background: "#153081",
            color: "#eaeaea",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            denyButtonText: "Cancelar",
            preConfirm: () => {
              const nombre = document.getElementById("nombre").value;
              const email = document.getElementById("email").value;
              if (!nombre || !email) {
                Swal.showValidationMessage("Por favor, complete ambos campos");
              } else if (!email.includes("@")) {
                Swal.showValidationMessage(
                  "Por favor, ingrese un correo electrónico válido"
                );
              }
              return { nombre, email };
            },
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Procesando su pago...",
                html: "Por favor, espere...",
                background: "#153081",
                color: "#eaeaea",
                didOpen: () => {
                  Swal.showLoading();
                  Swal.getContainer()
                    .querySelector(".swal-title")
                    ?.classList.add("loading");
                },
                timer: 1250,
              }).then(() => {
                restablecerCompra(tipo);
              });
            }
          });
        } catch (error) {
          Swal.fire({
            title: "Error al procesar el pago",
            text: "Por favor, inténtelo nuevamente más tarde",
            icon: "error",
            background: "#153081",
            color: "#eaeaea",
          });
        }
      } else {
        Swal.fire({
          
          title: `¿Desea ${tipo.toUpperCase()} su compra?`,
          icon: "question",
          background: "#153081",
          color: "#eaeaea",
          showCancelButton: true,
          confirmButtonText: "Confirmar",
          denyButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            restablecerCompra(tipo);
          }
        });
      }
    });
}
