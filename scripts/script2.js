// ==============================
// ESTADO DA APLICAÇÃO
// ==============================
let leuTermos = false;
let aceitouTermos = false;

// ==============================
// PARTÍCULAS
// ==============================
function createParticles() {
  const container = document.getElementById("particles");
  const count = 35;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.classList.add("particle");

    const x = Math.random() * 100;
    const duration = Math.random() * 18 + 10;
    const delay = Math.random() * 18;
    const size = Math.random() * 3 + 1;

    p.style.left = x + "%";
    p.style.bottom = "-10px";
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.animationDuration = duration + "s";
    p.style.animationDelay = "-" + delay + "s";
    p.style.opacity = (Math.random() * 0.6 + 0.2).toString();

    container.appendChild(p);
  }
}

// ==============================
// LER MAIS
// ==============================
document.getElementById("lerMais").addEventListener("click", function () {
  leuTermos = true;
  abrirLeituraTermos();
});

function abrirLeituraTermos() {
  document.getElementById("overlayParabens").classList.add("ativo");
}

function fecharParabens() {
  document.getElementById("overlayParabens").classList.remove("ativo");
}

// ==============================
// CHECKBOX
// ==============================
document.getElementById("aceitar").addEventListener("change", function () {
  const checked = this.checked;

  if (checked && !leuTermos) {
    this.checked = false;
    document.getElementById("overlaySermao").classList.add("ativo");
    return;
  }

  aceitouTermos = checked;
  atualizarBotao();
});

function fecharSermao() {
  document.getElementById("overlaySermao").classList.remove("ativo");
}

// ==============================
// MENSAGENS DA TRANSIÇÃO
// ==============================

const mensagensCarregando = [
  "Inicializando sistema...",
  "Verificando permissões...",
  "Carregando módulos...",
  "Estabelecendo conexão segura...",
  "Quase lá...",
];

// ==============================
// BOTÃO AVANÇAR
// ==============================

function atualizarBotao() {
  const btn = document.getElementById("btnAvancar");

  if (aceitouTermos) {
    btn.classList.remove("bloqueado");
  } else {
    btn.classList.add("bloqueado");
  }
}

function tentarAvancar() {
  if (!aceitouTermos) {
    const tooltip = document.getElementById("tooltipBloqueado");

    tooltip.classList.add("visivel");

    setTimeout(() => {
      tooltip.classList.remove("visivel");
    }, 2000);

    return;
  }

  // ÁUDIOS
  const musicaFundo = document.getElementById("musicaFundo");
  const som = document.getElementById("somClique");

  // FADE OUT SUAVE
  let volume = musicaFundo.volume;

  const fadeAudio = setInterval(() => {
    if (volume > 0.05) {
      volume -= 0.05;

      musicaFundo.volume = volume;
    } else {
      musicaFundo.pause();

      musicaFundo.volume = 1;

      clearInterval(fadeAudio);
    }
  }, 50);

  // SOM DO BOTÃO
  som.play();

  // TRANSIÇÃO
  iniciarTransicao();
}

// ==============================
// TELA DE TRANSIÇÃO
// ==============================

function iniciarTransicao() {
  const transicao = document.getElementById("transicao");
  const barra = document.getElementById("barra");

  const porcEl = document.getElementById("porcentagem");
  const textoEl = document.getElementById("textoCarregando");

  // MOSTRA TELA
  transicao.classList.add("ativa");

  let progresso = 0;
  let msgIndex = 0;

  const intervalo = setInterval(() => {
    const incremento = Math.random() * 3 + 1;

    progresso = Math.min(progresso + incremento, 100);

    // BARRA
    barra.style.width = progresso + "%";

    // TEXTO %
    porcEl.textContent = Math.floor(progresso) + "%";

    // TROCA MENSAGENS
    const novoIndex = Math.floor(
      (progresso / 100) * mensagensCarregando.length,
    );

    if (novoIndex !== msgIndex && novoIndex < mensagensCarregando.length) {
      msgIndex = novoIndex;

      textoEl.classList.add("glitch-active");

      textoEl.textContent = mensagensCarregando[msgIndex];

      setTimeout(() => {
        textoEl.classList.remove("glitch-active");
      }, 300);
    }

    // FINALIZA
    if (progresso >= 100) {
      clearInterval(intervalo);

      porcEl.textContent = "100%";

      barra.style.width = "100%";

      textoEl.textContent = "Concluído! ✓";

      setTimeout(() => {
        // PRÓXIMA PÁGINA
        window.location.href = "pagina2.html";
      }, 600);
    }
  }, 60);
}

// ==============================
// INIT
// ==============================
window.addEventListener("load", function () {
  createParticles();
  atualizarBotao();
});
