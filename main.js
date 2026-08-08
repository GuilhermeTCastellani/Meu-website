/* =========================================================
   Guilherme Tadeu Castellani — comportamento do site
   ========================================================= */

(() => {
  "use strict";

  const raiz = document.documentElement;
  const temObservador = "IntersectionObserver" in window;

  /* ---------- Tema ---------- */

  const CHAVE_TEMA = "tema";
  const btnTema = document.getElementById("btnTema");
  const consultaEscuro = window.matchMedia("(prefers-color-scheme: dark)");

  function temaDoSistema() {
    return consultaEscuro.matches ? "dark" : "light";
  }

  function aplicarTema(tema) {
    raiz.dataset.theme = tema;
    btnTema.setAttribute("aria-pressed", String(tema === "dark"));
    btnTema.setAttribute(
      "aria-label",
      tema === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"
    );
  }

  const salvo = localStorage.getItem(CHAVE_TEMA);
  aplicarTema(salvo === "dark" || salvo === "light" ? salvo : temaDoSistema());

  btnTema.addEventListener("click", () => {
    const novo = raiz.dataset.theme === "dark" ? "light" : "dark";
    aplicarTema(novo);
    localStorage.setItem(CHAVE_TEMA, novo);
  });

  // enquanto o usuário não escolher manualmente, acompanha o sistema
  consultaEscuro.addEventListener("change", () => {
    if (!localStorage.getItem(CHAVE_TEMA)) {
      aplicarTema(temaDoSistema());
    }
  });

  /* ---------- Barra superior e botão de topo ---------- */

  const topbar = document.querySelector(".topbar");
  const btnTopo = document.getElementById("btnTopo");

  function aoRolar() {
    const y = window.scrollY;
    topbar.classList.toggle("is-scrolled", y > 8);
    btnTopo.hidden = y < 400;
  }

  window.addEventListener("scroll", aoRolar, { passive: true });
  aoRolar();

  btnTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Revelação das seções ---------- */

  const reveals = document.querySelectorAll(".reveal");

  if (temObservador) {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add("is-visible");
          observador.unobserve(entrada.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
    );

    reveals.forEach((el) => observador.observe(el));
  } else {
    // sem observador, mostra tudo de uma vez em vez de esconder o conteúdo
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Link ativo na navegação ---------- */

  if (temObservador) {
    const links = new Map(
      [...document.querySelectorAll('.topbar__nav a[href^="#"]')].map((a) => [
        a.getAttribute("href").slice(1),
        a,
      ])
    );

    const espiao = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          const link = links.get(entrada.target.id);
          if (link) link.classList.toggle("is-active", entrada.isIntersecting);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    document
      .querySelectorAll("main section[id]")
      .forEach((secao) => espiao.observe(secao));
  }

  /* ---------- Ano do rodapé ---------- */

  document.getElementById("ano").textContent = String(
    new Date().getFullYear()
  );
})();
