export function crearHeroSection() {
  const section = document.querySelector('.hero-section');
  const heroHTML = `
    <div class="su-compra">
      <h2>SU COMPRA</h2>
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f2f2f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="10" cy="20.5" r="1" />
        <circle cx="18" cy="20.5" r="1" />
        <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
      </svg>
    </div>
    <table>
      <tbody>
        <tr>
          <td>Unidades:</td>
          <td class="js-cantidad-compras">0</td>
        </tr>
        <tr>
          <td>Sub-Total:</td>
          <td class="js-suma-compras">$0</td>
        </tr>
        <tr>
          <td>IVA:</td>
          <td>* 1.21</td>
        </tr>
        <tr>
          <td class="pago-total">Total:</td>
          <td class="pago-total js-pago-total">$0</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2" class="botones-pago-cancelar">
            <button class="boton-pagar js-boton-pagar-compra" disabled>PAGAR</button>
            <button class="boton-cancelar js-boton-cancelar-compra" disabled>Cancelar</button>
          </td>
        </tr>
      </tfoot>
    </table>
    <!-- Popup -->
    <div id="popup">
      <div id="contenido-popup">
        <textarea id="texto-popup">Listado de Compra:</textarea>
      </div>
    </div>
  `;
  section.innerHTML = heroHTML;
}