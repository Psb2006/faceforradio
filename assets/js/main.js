// Shared site behaviour: mobile nav toggle, sticky header shrink on scroll,
// back-to-top button, and scroll-triggered reveal animations.
document.addEventListener("DOMContentLoaded", function () {

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Sticky header shrink + back-to-top visibility, on scroll
  var header = document.querySelector(".site-header");
  var backToTop = document.querySelector(".back-to-top");
  var ticking = false;

  function updateOnScroll() {
    var scrolled = window.scrollY > 10;
    if (header) header.classList.toggle("is-scrolled", scrolled);
    if (backToTop) backToTop.classList.toggle("is-visible", window.scrollY > 500);
    ticking = false;
  }

  if (header || backToTop) {
    updateOnScroll();
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    });
  }

  // Scroll-triggered reveal animations
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );
      revealEls.forEach(function (el) { observer.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }
});
