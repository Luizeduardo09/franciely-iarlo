// Rolagem suave ao clicar nos links do menu
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Formulário de mensagens (salva no localStorage do navegador)
const form = document.getElementById("message-form");
const container = document.getElementById("messages-container");

function carregarMensagens() {
  const armazenadas = localStorage.getItem("fy_mensagens");
  if (!armazenadas) return;

  try {
    const lista = JSON.parse(armazenadas);
    lista.forEach(adicionarMensagemNaTela);
  } catch {
    // Se der erro ao ler o JSON, limpa o storage
    localStorage.removeItem("fy_mensagens");
  }
}

function salvarMensagem(mensagem) {
  const armazenadas = localStorage.getItem("fy_mensagens");
  let lista = [];
  if (armazenadas) {
    try {
      lista = JSON.parse(armazenadas);
    } catch {
      lista = [];
    }
  }
  lista.push(mensagem);
  localStorage.setItem("fy_mensagens", JSON.stringify(lista));
}

function adicionarMensagemNaTela({ nome, tipo, texto }) {
  const li = document.createElement("li");
  li.className = "message-item";

  const header = document.createElement("div");
  header.className = "message-item-header";

  const spanNome = document.createElement("span");
  spanNome.className = "message-item-name";
  spanNome.textContent = nome || "Convidado(a)";

  const spanTipo = document.createElement("span");
  spanTipo.className = "message-item-type";
  spanTipo.textContent =
    tipo === "sugestao-presente"
      ? "Sugestão de presente"
      : "Mensagem para os noivos";

  header.appendChild(spanNome);
  header.appendChild(spanTipo);

  const p = document.createElement("p");
  p.className = "message-item-text";
  p.textContent = texto;

  li.appendChild(header);
  li.appendChild(p);
  container.prepend(li); // mais recente aparece em cima
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const tipo = document.getElementById("tipo").value;
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!mensagem) return;

    const novaMensagem = {
      nome,
      tipo,
      texto: mensagem,
    };

    salvarMensagem(novaMensagem);
    adicionarMensagemNaTela(novaMensagem);

    form.reset();
  });
}

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

function closeMobileMenu() {
  if (mobileMenu) {
    mobileMenu.classList.remove("open");
  }
  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
  }
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        closeMobileMenu();
      }
    });
  });
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});

const targetDate = new Date("2026-10-17T19:00:00");
const countdownElements = {
  days: document.getElementById("countdown-days"),
  hours: document.getElementById("countdown-hours"),
  minutes: document.getElementById("countdown-minutes"),
  seconds: document.getElementById("countdown-seconds"),
};

function atualizarContagemRegressiva() {
  const agora = new Date();
  const diferenca = targetDate - agora;

  if (diferenca <= 0) {
    Object.values(countdownElements).forEach((element) => {
      if (element) element.textContent = "00";
    });
    return;
  }

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

  if (countdownElements.days) countdownElements.days.textContent = String(dias).padStart(2, "0");
  if (countdownElements.hours) countdownElements.hours.textContent = String(horas).padStart(2, "0");
  if (countdownElements.minutes) countdownElements.minutes.textContent = String(minutos).padStart(2, "0");
  if (countdownElements.seconds) countdownElements.seconds.textContent = String(segundos).padStart(2, "0");
}

atualizarContagemRegressiva();
setInterval(atualizarContagemRegressiva, 1000);

// Esconder/mostrar topbar ao rolar
const topbar = document.querySelector(".topbar");
let lastScrollTop = 0;
let isTopbarVisible = true;

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop) {
    // Rolando para baixo - esconde topbar
    if (isTopbarVisible) {
      topbar.style.transform = "translateY(-100%)";
      topbar.style.transition = "transform 0.3s ease-in-out";
      isTopbarVisible = false;
    }
  } else {
    // Rolando para cima - mostra topbar
    if (!isTopbarVisible) {
      topbar.style.transform = "translateY(0)";
      topbar.style.transition = "transform 0.3s ease-in-out";
      isTopbarVisible = true;
    }
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

carregarMensagens();

