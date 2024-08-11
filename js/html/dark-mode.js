// Función para aplicar modo claro/oscuro

export function toggleMode() {
  const toggleMode = document.getElementById("toggleMode");
  const main = document.querySelector("main");

  // Verificar si ya hay un modo guardado en localStorage

  const modoActual = localStorage.getItem("modo");
  if (modoActual === "dark") {
    main.classList.add("dark-mode");
    toggleMode.checked = true;
  }

  toggleMode.addEventListener("change", () => {
    main.classList.toggle("dark-mode");

    // Guardar el modo en localStorage

    if (main.classList.contains("dark-mode")) {
      localStorage.setItem("modo", "dark");
    } else {
      localStorage.setItem("modo", "light");
    }
  });
}
