/* Kairali — small, dependency-free behaviour layer.
   1. header solid on scroll   2. mobile nav   3. hero slideshow
   4. menu tabs              5. reveal on scroll   6. year stamp        */
(function () {
  "use strict";

  /* 1 — header */
  var header = document.querySelector(".site");
  if (header && !header.classList.contains("solid")) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* 2 — mobile nav */
  var toggle = document.getElementById("mt");
  var links = document.getElementById("links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "✕" : "☰";
      document.body.style.overflow = open ? "hidden" : "";
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.textContent = "☰";
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* 3 — hero slideshow */
  var slides = document.querySelectorAll(".hero-slide");
  var dots = document.querySelectorAll(".hero-dots button");
  if (slides.length > 1) {
    var i = 0,
      timer = null,
      go = function (n) {
        slides[i].classList.remove("on");
        if (dots[i]) dots[i].classList.remove("on");
        i = (n + slides.length) % slides.length;
        slides[i].classList.add("on");
        if (dots[i]) dots[i].classList.add("on");
      },
      start = function () {
        timer = setInterval(function () { go(i + 1); }, 7000);
      },
      stop = function () {
        if (timer) { clearInterval(timer); timer = null; }
      };
    dots.forEach(function (d, n) {
      d.addEventListener("click", function () { stop(); go(n); start(); });
    });
    document.addEventListener("visibilitychange", function () {
      document.hidden ? stop() : start();
    });
    start();
  }

  /* 4 — menu tabs */
  var tabs = document.querySelectorAll(".menu-tabs button");
  if (tabs.length) {
    tabs.forEach(function (t) {
      t.addEventListener("click", function () {
        var id = t.getAttribute("data-tab");
        tabs.forEach(function (x) { x.classList.toggle("on", x === t); });
        document.querySelectorAll(".dish-panel").forEach(function (p) {
          p.classList.toggle("on", p.id === id);
        });
      });
    });
  }

  /* 5 — reveal */
  var rv = document.querySelectorAll(".rv");
  if (rv.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
      rv.forEach(function (el) { io.observe(el); });
    } else {
      rv.forEach(function (el) { el.classList.add("in"); });
    }
  }

  /* 6 — year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
