/*--------------------------------------------------------------//
                  FUNCIÓN MODO CLARO / OSCURO
//--------------------------------------------------------------*/

export function modoOscuro() {
  const toggleMode = document.getElementById("toggleMode");
  const main = document.querySelector("main");
  const heroSection = document.querySelector(".hero-section");
  const modoActual = localStorage.getItem("modo");
  if (modoActual === "dark") {
    main.classList.add("dark-mode");
    heroSection.classList.add("dark-mode");
    toggleMode.checked = true;
  }

  toggleMode.addEventListener("change", () => {
    main.classList.toggle("dark-mode");
    heroSection.classList.toggle("dark-mode");
    main.style.transition = "background-color 0.2s";
    heroSection.style.transition = "background-color 0.2s";
    if (main.classList.contains("dark-mode")) {
      localStorage.setItem("modo", "dark");
    } else {
      localStorage.setItem("modo", "light");
    }
  });
}
