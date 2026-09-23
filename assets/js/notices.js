// Reads /data/notices.json and renders it into any element with
// [data-notices-list]. Each entry can optionally include an "image" —
// leave it as "" to show a text-only notice. Images are shown as a fixed
// square thumbnail, cropped to fit — click one to see it full-size in a
// lightbox, so the source photo's own aspect ratio never has to be fixed
// up before adding it.
document.addEventListener("DOMContentLoaded", function () {
  var mount = document.querySelector("[data-notices-list]");
  if (!mount) return;

  fetch("data/notices.json")
    .then(function (res) {
      if (!res.ok) throw new Error("Could not load notices.json (" + res.status + ")");
      return res.json();
    })
    .then(function (items) {
      renderNotices(mount, items);
    })
    .catch(function (err) {
      mount.innerHTML =
        '<p class="news-error">Couldn’t load the notices right now (' +
        escapeHtml(err.message) +
        "). If you're viewing this file straight off disk, run it through a local server instead — see README.md.</p>";
    });

  mount.addEventListener("click", function (e) {
    var btn = e.target.closest(".notice-photo-btn");
    if (btn) openLightbox(btn.getAttribute("data-full"), btn.getAttribute("data-caption"));
  });
});

function renderNotices(mount, items) {
  if (!Array.isArray(items) || items.length === 0) {
    mount.innerHTML = '<p class="news-empty">No notices right now — check back before the next show.</p>';
    return;
  }

  // Most recent first.
  var sorted = items.slice().sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  var html = sorted
    .map(function (item) {
      var hasImage = !!item.image;
      return (
        '<li class="notice-item' + (hasImage ? " has-image" : "") + '">' +
        (hasImage
          ? '<div class="notice-item-photo">' +
            '<button type="button" class="notice-photo-btn" data-full="' +
            escapeHtml(item.image) +
            '" data-caption="' +
            escapeHtml(item.title || "") +
            '" aria-label="View full image">' +
            '<img src="' +
            escapeHtml(item.image) +
            '" alt="' +
            escapeHtml(item.title || "") +
            '">' +
            '<span class="notice-photo-zoom" aria-hidden="true">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><circle cx="10" cy="10" r="6"/><line x1="14.5" y1="14.5" x2="20" y2="20"/><line x1="10" y1="7.5" x2="10" y2="12.5"/><line x1="7.5" y1="10" x2="12.5" y2="10"/></svg>' +
            "</span>" +
            "</button>" +
            "</div>"
          : "") +
        '<div class="notice-item-text">' +
        '<span class="news-date">' +
        escapeHtml(formatDate(item.date)) +
        "</span>" +
        "<h3>" +
        escapeHtml(item.title) +
        "</h3>" +
        "<p>" +
        escapeHtml(item.body) +
        "</p>" +
        "</div>" +
        "</li>"
      );
    })
    .join("");

  mount.innerHTML = '<ul class="notice-list">' + html + "</ul>";
}

var lightboxEl = null;

function ensureLightbox() {
  if (lightboxEl) return lightboxEl;

  lightboxEl = document.createElement("div");
  lightboxEl.className = "lightbox";
  lightboxEl.setAttribute("role", "dialog");
  lightboxEl.setAttribute("aria-modal", "true");
  lightboxEl.innerHTML =
    '<button type="button" class="lightbox-close" aria-label="Close">&times;</button>' +
    '<figure class="lightbox-figure">' +
    '<img class="lightbox-img" src="" alt="">' +
    '<figcaption class="lightbox-caption"></figcaption>' +
    "</figure>";
  document.body.appendChild(lightboxEl);

  lightboxEl.addEventListener("click", function (e) {
    if (e.target === lightboxEl) closeLightbox();
  });
  lightboxEl.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  return lightboxEl;
}

function openLightbox(src, caption) {
  var el = ensureLightbox();
  var img = el.querySelector(".lightbox-img");
  img.src = src;
  img.alt = caption || "";
  el.querySelector(".lightbox-caption").textContent = caption || "";
  el.classList.add("is-open");
}

function closeLightbox() {
  if (lightboxEl) lightboxEl.classList.remove("is-open");
}

function formatDate(dateStr) {
  var d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
