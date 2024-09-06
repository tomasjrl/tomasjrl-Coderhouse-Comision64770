/*--------------------------------------------------------------//
    MENSAJES SWEETALERT2 PARA PAGAR/CANCELAR COMPRA
//--------------------------------------------------------------*/

export function manejarErrorPago() {
  Swal.fire({
    title: "Error al procesar el pago",
    text: "Por favor, inténtelo nuevamente más tarde",
    icon: "error",
    background: "#1e4180",
    color: "#eaeaea",
  });
}

export function mensajePago(tipo) {
  return Swal.fire({
    title: `¿Desea ${tipo.toUpperCase()} su compra?`,
    html: `
      <form class="js-formulario-de-pago" style="display: flex; flex-direction: column;">
        <input type="text" id="nombre" autocomplete="name" class="js-input-form" value="Tomás Stabilini" placeholder="Nombre" style="width: 100%; margin-bottom: 10px;">
        <input type="email" id="email" autocomplete="email" class="js-input-form" value="Comision64770@coderhouse.com" placeholder="Correo electrónico" style="width: 100%; margin-bottom: 10px;">
      </form>
    `,
    icon: "question",
    background: "#1e4180",
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
  });
}

export function mostrarMensajeConfirmacion(tipo) {
  return Swal.fire({
    title: `¿Desea ${tipo.toUpperCase()} su compra?`,
    icon: "question",
    background: "#1e4180",
    color: "#eaeaea",
    showCancelButton: true,
    confirmButtonText: "Confirmar",
    denyButtonText: "Cancelar",
  });
}

export function procesandoPago() {
  return Swal.fire({
    title: "Procesando su pago...",
    html: "Por favor, espere...",
    background: "#1e4180",
    color: "#eaeaea",
    didOpen: () => {
      Swal.showLoading();
      Swal.getContainer()
        .querySelector(".swal-title")
        ?.classList.add("loading");
    },
    timer: 1250,
  });
}

export function mensajeFinal(tipo) {
  Swal.fire({
    icon: tipo === "pagar" ? "success" : "info",
    background: "#1e4180",
    color: "#eaeaea",
    title: `Proceso de compra <br> ${
      tipo === "pagar" ? "COMPLETADO" : "CANCELADO"
    }.`,
    showConfirmButton: true,
  });
}
