// Reads /data/notices.json and renders it into any element with
// [data-notices-list]. Each entry can optionally include an "image" —
// leave it as "" to show a text-only notice.
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
          ? '<div class="notice-item-photo"><img src="' +
            escapeHtml(item.image) +
            '" alt="' +
            escapeHtml(item.title || "") +
            '"></div>'
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
