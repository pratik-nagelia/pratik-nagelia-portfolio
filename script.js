// Minimal site behavior: footer year, mobile nav toggle, active-section highlight.
(function () {
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Highlight the nav link matching the section in view (home page only).
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  var byId = {};
  navAnchors.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var a = byId[entry.target.id];
      if (a && entry.isIntersecting) {
        navAnchors.forEach(function (x) { x.style.fontWeight = "400"; });
        a.style.fontWeight = "700";
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach(function (s) { observer.observe(s); });
})();
