/* ==============================
   AVALIAÇÃO DE RISCO DIGITAL
   script3.js
   ============================== */

const TOTAL_PERGUNTAS = 7;
const respostas = new Array(TOTAL_PERGUNTAS).fill(null);

const RECOMENDACOES_MAP = [
  {
    indice: 0,
    pontoRisco: 14,
    texto:
      "Use um gerenciador de senhas e crie senhas únicas e fortes para cada conta.",
  },
  {
    indice: 1,
    pontoRisco: 14,
    texto:
      "Sempre verifique o cadeado HTTPS antes de inserir dados em qualquer site.",
  },
  {
    indice: 2,
    pontoRisco: 14,
    texto:
      "Desconfie de links recebidos por e-mail ou mensagens não solicitadas — phishing é real.",
  },
  {
    indice: 3,
    pontoRisco: 14,
    texto:
      "Ative a autenticação em dois fatores (2FA) em todas as contas importantes.",
  },
  {
    indice: 4,
    pontoRisco: 14,
    texto:
      "Mantenha sistema e aplicativos sempre atualizados para corrigir falhas de segurança.",
  },
  {
    indice: 5,
    pontoRisco: 14,
    texto:
      "Evite divulgar informações pessoais sensíveis em redes sociais ou Wi-Fi público.",
  },
  {
    indice: 6,
    pontoRisco: 14,
    texto:
      "Revise permissões antes de instalar apps — aplicativos maliciosos podem roubar seus dados.",
  },
];

const MSGS_TRANSICAO = [
  "Compilando respostas...",
  "Calculando vulnerabilidades...",
  "Analisando comportamentos...",
  "Gerando relatório de risco...",
  "Finalizando análise...",
];

/* ── helpers ── */
function getRiscoConfig(pct) {
  if (pct <= 20) return { cor: "#00ffff", label: "BAIXO", badge: "SEGURO" };
  if (pct <= 50) return { cor: "#f59e0b", label: "MODERADO", badge: "ATENÇÃO" };
  if (pct <= 75) return { cor: "#f97316", label: "ALTO", badge: "PERIGO" };
  return { cor: "#ef4444", label: "CRÍTICO", badge: "CRÍTICO" };
}

function atualizarPilulas(respondidas) {
  document.querySelectorAll(".pilula").forEach((p, i) => {
    p.classList.toggle("ativa", i < respondidas);
  });
  document.getElementById("progressoTexto").textContent =
    `${respondidas} / ${TOTAL_PERGUNTAS} respondidas`;
}

/* ── lógica principal ── */
function responder(btn, pontos, indice) {
  const grupo = btn.closest(".pergunta");
  grupo.querySelectorAll("button").forEach((b) => {
    b.classList.remove("selecionado");
    b.disabled = true;
  });
  btn.classList.add("selecionado");
  grupo.classList.add("respondida");

  respostas[indice] = pontos;
  atualizarRisco();
}

function atualizarRisco() {
  const respondidas = respostas.filter((r) => r !== null).length;
  atualizarPilulas(respondidas);

  const total = respostas.reduce((acc, v) => acc + (v ?? 0), 0);
  const maxRisco = TOTAL_PERGUNTAS * 14;
  const pct = Math.round((total / maxRisco) * 100);
  const config = getRiscoConfig(pct);

  /* barra */
  const barra = document.getElementById("nivelRisco");
  barra.style.width = pct + "%";
  barra.style.background = config.cor;
  barra.style.boxShadow = `0 0 18px ${config.cor}`;

  /* texto & badge */
  const textoEl = document.getElementById("textoRisco");
  textoEl.textContent = `Risco Atual: ${pct}% — ${config.label}`;
  textoEl.style.color = config.cor;
  textoEl.style.textShadow = `0 0 8px ${config.cor}80`;

  const badgeEl = document.getElementById("badgeRisco");
  badgeEl.textContent = config.badge;
  badgeEl.style.color = config.cor;

  /* stat boxes */
  document.getElementById("statPct").textContent = pct + "%";
  document.getElementById("statPct").style.color = config.cor;
  document.getElementById("statResp").textContent = respondidas;
  document.getElementById("statRisco").textContent = config.label;
  document.getElementById("statRisco").style.color = config.cor;

  gerarRecomendacoes();

  if (respondidas === TOTAL_PERGUNTAS) {
    document.getElementById("btnAvancar").classList.remove("bloqueado");
  }
}

function gerarRecomendacoes() {
  const div = document.getElementById("recomendacoes");
  const itens = RECOMENDACOES_MAP.filter(
    (m) => respostas[m.indice] === m.pontoRisco,
  );

  if (itens.length === 0) {
    div.innerHTML = `<div class="rec-sucesso">✦ Excelente! Seus hábitos digitais estão bem calibrados. ✦</div>`;
    return;
  }

  div.innerHTML = itens
    .map(
      (m) => `
        <div class="rec-item">
            <div class="rec-bullet"></div>
            <p>${m.texto}</p>
        </div>
    `,
    )
    .join("");
}

/* ── transição ── */
document.getElementById("btnAvancar").addEventListener("click", function (e) {
  e.preventDefault();

  // ÁUDIOS
  const musicaFundo = document.getElementById("musicaFundo");
  const somClique = document.getElementById("somClique");

  // VOLUME ATUAL
  let volume = musicaFundo.volume;

  // FADE OUT DA MÚSICA
  const fadeAudio = setInterval(() => {
    volume -= 0.1;

    if (volume <= 0) {
      musicaFundo.volume = 0;

      musicaFundo.pause();

      clearInterval(fadeAudio);
    } else {
      musicaFundo.volume = volume;
    }
  }, 50);

  // SOM DO BOTÃO
  somClique.play();

  // TRANSIÇÃO
  const transicao = document.getElementById("transicao");
  const barra = document.getElementById("barra");
  const pct = document.getElementById("porcentagem");
  const txt = document.getElementById("textoCarregando");

  transicao.classList.add("ativa");

  let p = 0;

  const passos = MSGS_TRANSICAO.length * 10;

  const interval = setInterval(() => {
    p++;

    const perc = Math.round((p / passos) * 100);

    barra.style.width = perc + "%";

    pct.textContent = perc + "%";

    const msgIdx = Math.min(Math.floor(p / 10), MSGS_TRANSICAO.length - 1);

    txt.textContent = MSGS_TRANSICAO[msgIdx];

    if (perc >= 100) {
      clearInterval(interval);

      setTimeout(() => {
        window.location.href = "pagina3.html";
      }, 500);
    }
  }, 50);
});
