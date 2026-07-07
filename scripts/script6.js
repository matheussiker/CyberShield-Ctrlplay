/* =========================
   SCAN DE ENTRADA — REVERSO
========================= */

const scanEntrada = document.getElementById("scanEntrada");

// Após a animação do scan (1s), remove o overlay e toca a música
setTimeout(() => {
  // Remove overlay do scan
  scanEntrada.style.display = "none";

  // Inicia música em loop
  const musica = document.getElementById("musicaParabens");
  musica.volume = 0.7;
  musica.play().catch(() => {
    // Fallback: toca na primeira interação do usuário
    document.addEventListener("click", () => musica.play(), { once: true });
  });
}, 1100);

/* =========================
   BOTÃO VOLTAR AO INÍCIO
========================= */

document.getElementById("btnVoltar").addEventListener("click", function () {
  // Scan de saída antes de navegar
  const scan = document.createElement("div");
  scan.classList.add("scan-overlay");
  document.body.appendChild(scan);

  // Reutiliza o mesmo CSS de scan de saída da pagina5
  scan.style.cssText = `
        position: fixed; inset: 0; z-index: 9999; pointer-events: all;
        background: transparent;
    `;

  // Cria linha e fill manualmente para o scan descer
  const linha = document.createElement("div");
  linha.style.cssText = `
        position: absolute; left:0; right:0; top:-3px; height:3px;
        background: linear-gradient(90deg, transparent, rgba(0,240,255,0.4) 20%, #00f0ff 50%, rgba(0,240,255,0.4) 80%, transparent);
        box-shadow: 0 0 18px rgba(0,240,255,0.9), 0 0 40px rgba(0,240,255,0.4);
        animation: scanLinhaSobe 1s ease forwards;
    `;

  const fill = document.createElement("div");
  fill.style.cssText = `
        position: absolute; inset:0;
        background: #020c1b;
        animation: scanFillSobe 1s ease forwards;
    `;

  scan.appendChild(fill);
  scan.appendChild(linha);

  setTimeout(() => {
    window.location.href = "../public/index.html";
  }, 1000);
});
