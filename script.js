// Esperar o documento carregar completamente
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM loaded");
  
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

  // Formulário de mensagens via WhatsApp
  const WHATSAPP_NUMBER = "5588997876860";
  const form = document.getElementById("message-form");
  
  console.log("Form encontrado:", form);
  
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      console.log("Formulário enviado");
      
      // Buscar elementos dentro do formulário
      const inputNome = form.querySelector("#nome");
      const inputMensagem = form.querySelector("#mensagem");
      
      console.log("Input nome:", inputNome);
      console.log("Input mensagem:", inputMensagem);
      
      if (!inputNome || !inputMensagem) {
        console.error("Elementos do formulário não encontrados!");
        alert("Erro: Formulário incompleto");
        return false;
      }

      const nome = inputNome.value ? inputNome.value.trim() : "";
      const mensagem = inputMensagem.value ? inputMensagem.value.trim() : "";

      console.log("Nome capturado:", nome);
      console.log("Mensagem capturada:", mensagem);

      if (!nome || !mensagem) {
        alert("Por favor, preencha todos os campos!");
        return false;
      }

      // Construir a mensagem formatada
      const mensagemFormatada = `Seu nome: ${nome}\n\nSua mensagem: ${mensagem}`;
      
      // Codificar para URL
      const mensagemEncodada = encodeURIComponent(mensagemFormatada);
      
      // Criar URL do WhatsApp
      const urlWhatsApp = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagemEncodada}`;
      
      console.log("Abrindo WhatsApp:", urlWhatsApp);
      
      // Redirecionar para WhatsApp
      window.open(urlWhatsApp, "_blank");
      
      // Limpar o formulário
      form.reset();
      
      return false;
    });
  } else {
    console.error("Formulário com ID 'message-form' não encontrado!");
  }

  // Menu mobile
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

  // Contagem regressiva
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
});

