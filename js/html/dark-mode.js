export function toggleMode() {
  const toggleMode = document.getElementById("toggleMode");
  const main = document.querySelector("main");
  const heroSection = document.querySelector(".hero-section");

  // Verifica si ya hay un modo guardado en localStorage

  const modoActual = localStorage.getItem("modo");
  if (modoActual === "dark") {
    main.classList.add("dark-mode");
    heroSection.classList.add("dark-mode");
    toggleMode.checked = true;
  }

  toggleMode.addEventListener("change", () => {
    main.classList.toggle("dark-mode");
    heroSection.classList.toggle("dark-mode");

    // Transición al activar/desactivar modo oscuro

    main.style.transition = "background-color 0.2s";
    heroSection.style.transition = "background-color 0.2s";

    // Guardar el modo en localStorage

    if (main.classList.contains("dark-mode")) {
      localStorage.setItem("modo", "dark");
    } else {
      localStorage.setItem("modo", "light");
    }
  });
}
