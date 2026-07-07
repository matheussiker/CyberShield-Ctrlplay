/* =========================
   MENSAGENS DA TRANSIÇÃO
========================= */

const MSGS_TRANSICAO = [
  "Inicializando sistema...",
  "Validando acesso...",
  "Conectando à central...",
  "Carregando módulos...",
  "Acesso autorizado...",
];

/* =========================
   EVENTO DO BOTÃO
========================= */

document.getElementById("btnEntrar").addEventListener("click", function () {
  /* =========================
     ÁUDIOS
  ========================= */

  // Música de fundo
  const musicaFundo = document.getElementById("musicaFundo");

  // Som do botão
  const somClique = document.getElementById("somClique");

  /* =========================
     FADE OUT DA MÚSICA
  ========================= */

  // Volume inicial
  let volume = musicaFundo.volume;

  // Diminui o volume aos poucos
  const fadeAudio = setInterval(() => {
    volume -= 0.1;

    // Quando chegar em 0
    if (volume <= 0) {
      // Garante volume zerado
      musicaFundo.volume = 0;

      // Pausa a música
      musicaFundo.pause();

      // Para o intervalo
      clearInterval(fadeAudio);
    } else {
      // Atualiza volume
      musicaFundo.volume = volume;
    }
  }, 50);

  /* =========================
     SOM DO BOTÃO
  ========================= */

  somClique.play();

  /* =========================
     ELEMENTOS DA TRANSIÇÃO
  ========================= */

  const transicao = document.getElementById("transicao");

  const barra = document.getElementById("barra");

  const pct = document.getElementById("porcentagem");

  const txt = document.getElementById("textoCarregando");

  /* =========================
     ATIVA A TRANSIÇÃO
  ========================= */

  transicao.classList.add("ativa");

  /* =========================
     LOADING
  ========================= */

  let p = 0;

  // Quantidade total de passos
  const passos = MSGS_TRANSICAO.length * 10;

  // Intervalo da animação
  const interval = setInterval(() => {
    // Incrementa
    p++;

    // Calcula %
    const perc = Math.round((p / passos) * 100);

    // Atualiza barra
    barra.style.width = perc + "%";

    // Atualiza porcentagem
    pct.textContent = perc + "%";

    // Troca mensagens
    const msgIdx = Math.min(Math.floor(p / 10), MSGS_TRANSICAO.length - 1);

    txt.textContent = MSGS_TRANSICAO[msgIdx];

    /* =========================
       FINALIZA
    ========================= */

    if (perc >= 100) {
      // Para loading
      clearInterval(interval);

      // Espera um pouco
      setTimeout(() => {
        // Vai para página 4
        window.location.href = "pagina4.html";
      }, 500);
    }
  }, 50);
});
