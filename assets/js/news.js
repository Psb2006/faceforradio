// Reads /data/news.json and renders it into any element with [data-news-list].
// Add data-news-limit="3" on the element to show only the N most recent items
// (used on the homepage). Leave it off to show everything.
document.addEventListener("DOMContentLoaded", function () {
  var mount = document.querySelector("[data-news-list]");
  if (!mount) return;

  var limit = parseInt(mount.getAttribute("data-news-limit"), 10) || null;

  fetch("data/news.json")
    .then(function (res) {
      if (!res.ok) throw new Error("Could not load news.json (" + res.status + ")");
      return res.json();
    })
    .then(function (items) {
      renderNews(mount, items, limit);
    })
    .catch(function (err) {
      mount.innerHTML =
        '<p class="news-error">Couldn’t load the news right now (' +
        escapeHtml(err.message) +
        "). If you're viewing this file straight off disk, run it through a local server instead — see README.md.</p>";
    });
});

function renderNews(mount, items, limit) {
  if (!Array.isArray(items) || items.length === 0) {
    mount.innerHTML = '<p class="news-empty">No news posted yet — check back after the next show.</p>';
    return;
  }

  // Most recent first.
  var sorted = items.slice().sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  if (limit) sorted = sorted.slice(0, limit);

  var html = sorted
    .map(function (item) {
      return (
        '<li class="news-item">' +
        '<span class="news-date">' +
        escapeHtml(formatDate(item.date)) +
        "</span>" +
        "<h3>" +
        escapeHtml(item.headline) +
        "</h3>" +
        "<p>" +
        escapeHtml(item.body) +
        "</p>" +
        "</li>"
      );
    })
    .join("");

  mount.innerHTML = '<ul class="news-list">' + html + "</ul>";
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
