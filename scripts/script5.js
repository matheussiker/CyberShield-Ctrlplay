/* =========================
   BOTÃO CONTINUAR — MODAL
========================= */

document.getElementById("btnContinuar").addEventListener("click", function () {
  const overlay = document.getElementById("modalOverlay");
  const central = document.getElementById("centralWrapper");
  const somContinuar = document.getElementById("somContinuar");
  const musicaFundo = document.getElementById("musicaFundo");

  this.disabled = true;

  const volumeOriginal = musicaFundo.volume;
  musicaFundo.volume = 0.1;

  somContinuar.currentTime = 0;
  somContinuar.play();

  setTimeout(() => {
    somContinuar.pause();
    somContinuar.currentTime = 0;
    musicaFundo.volume = volumeOriginal;

    overlay.classList.add("fechando");
    setTimeout(() => {
      overlay.style.display = "none";
      central.classList.add("liberado");
    }, 600);
  }, 1000);
});

/* =========================
   LÓGICA DOS CARDS
========================= */

const cardsConfigurados = {
  bloqueio:  false,
  tempo:     false,
  relatorio: false,
  alertas:   false,
  controle:  false,
};

function marcarConfigurado(cardId, badgeTexto) {
  if (cardsConfigurados[cardId]) return;

  cardsConfigurados[cardId] = true;

  document.getElementById("card-"   + cardId).classList.add("configurado");
  document.getElementById("status-" + cardId).textContent = "CONFIGURADO";
  document.getElementById("badge-"  + cardId).textContent = badgeTexto || "OK";

  atualizarProgresso();
}

function atualizarProgresso() {
  const total      = Object.keys(cardsConfigurados).length;
  const concluidos = Object.values(cardsConfigurados).filter(Boolean).length;

  document.getElementById("progressoBar").style.width =
    (concluidos / total) * 100 + "%";
  document.getElementById("progressoTexto").textContent =
    concluidos + " / " + total;

  if (concluidos === total) {
    document.getElementById("concluidoWrap").classList.add("visivel");
  }
}

/* Card 1 — Bloqueio: qualquer toggle marcado */
document.querySelectorAll('input[data-card="bloqueio"]').forEach((input) => {
  input.addEventListener("change", function () {
    const ativos = document.querySelectorAll('input[data-card="bloqueio"]:checked').length;
    if (ativos > 0) marcarConfigurado("bloqueio", ativos + " APP");
  });
});

/* Card 2 — Tempo: qualquer slider mexido */
document.querySelectorAll('.slider[data-card="tempo"]').forEach((slider) => {
  slider.addEventListener("input", function () {
    document.getElementById("val-" + this.dataset.label).textContent =
      this.value + " min";
    marcarConfigurado("tempo", "SET");
  });
});

/* Card 3 — Relatório: qualquer radio clicado */
document
  .querySelectorAll('input[name="relatorio"], input[name="formato"]')
  .forEach((radio) => {
    radio.addEventListener("change", function () {
      marcarConfigurado("relatorio", this.value.slice(0, 3).toUpperCase());
    });
  });

/* Card 4 — Alertas: qualquer toggle clicado */
document.querySelectorAll('input[data-card="alertas"]').forEach((input) => {
  input.addEventListener("change", function () {
    marcarConfigurado("alertas", "SET");
  });
});

/* Card 5 — Controle: qualquer radio clicado */
document.querySelectorAll('input[name="controle"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    marcarConfigurado("controle", this.value.slice(0, 3).toUpperCase());
  });
});

/* =========================
   BOTÃO CONCLUÍDO
========================= */

const btnConcluido = document.getElementById("btnConcluido");
const somClique    = document.getElementById("somClique");
const musicaFundo  = document.getElementById("musicaFundo");

btnConcluido.addEventListener("click", () => {
  btnConcluido.disabled = true;

  const volumeOriginal = musicaFundo.volume;
  musicaFundo.volume = 0.1;

  somClique.currentTime = 0;
  somClique.play();

  setTimeout(() => {
    somClique.pause();
    somClique.currentTime = 0;

    const scan = document.createElement("div");
    scan.classList.add("scan-overlay");
    document.body.appendChild(scan);
    requestAnimationFrame(() => scan.classList.add("ativo"));

    setTimeout(() => {
      window.location.href = "pagina5.html";
    }, 1000);
  }, 4000);
});