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

carregarMensagens();

