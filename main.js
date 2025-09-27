const btnTopo = document.getElementById("btnTopo");

window.onscroll = function () {
  if (document.documentElement.scrollTop > 200) {
    btnTopo.style.display = "block";
  } else {
    btnTopo.style.display = "none";
  }
};

btnTopo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const btnDark = document.getElementById("btnDark");

btnDark.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    btnDark.textContent = "☀️";
  } else {
    btnDark.textContent = "🌙";
  }
});

menuToggle.addEventListener("click", () => {
  menuLinks.style.display =
    menuLinks.style.display === "block" ? "none" : "block";
});
