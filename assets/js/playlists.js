// Reads /data/playlists.json and renders it into any element with
// [data-playlist-list]. Add data-playlist-limit="1" to show only the N most
// recent playlists (used for the homepage teaser), and
// data-playlist-mode="teaser" to render the shortened homepage card instead
// of the full archive card.
document.addEventListener("DOMContentLoaded", function () {
  var mounts = document.querySelectorAll("[data-playlist-list]");
  if (!mounts.length) return;

  fetch("data/playlists.json")
    .then(function (res) {
      if (!res.ok) throw new Error("Could not load playlists.json (" + res.status + ")");
      return res.json();
    })
    .then(function (items) {
      mounts.forEach(function (mount) { renderPlaylists(mount, items); });
    })
    .catch(function (err) {
      mounts.forEach(function (mount) {
        mount.innerHTML =
          '<p class="news-error">Couldn’t load the playlists right now (' +
          escapeHtml(err.message) +
          "). If you're viewing this file straight off disk, run it through a local server instead — see README.md.</p>";
      });
    });
});

function renderPlaylists(mount, items) {
  if (!Array.isArray(items) || items.length === 0) {
    mount.innerHTML = '<p class="news-empty">No playlists posted yet — check back after the next show.</p>';
    return;
  }

  // Most recent first.
  var sorted = items.slice().sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  var limit = parseInt(mount.getAttribute("data-playlist-limit"), 10) || null;
  if (limit) sorted = sorted.slice(0, limit);

  var mode = mount.getAttribute("data-playlist-mode") || "full";
  var wrap = mode === "teaser" ? "" : '"playlist-grid"';

  var html = sorted.map(function (pl) { return renderCard(pl, mode); }).join("");
  mount.innerHTML = mode === "teaser" ? html : '<div class="playlist-grid">' + html + "</div>";
}

function renderCard(pl, mode) {
  var tracks = Array.isArray(pl.tracks) ? pl.tracks : [];
  var tracksToShow = mode === "teaser" ? tracks.slice(0, 4) : tracks;
  var moreCount = tracks.length - tracksToShow.length;

  var trackItems = tracksToShow
    .map(function (t) { return "<li>" + escapeHtml(t) + "</li>"; })
    .join("");

  var links = "";
  if (pl.spotifyUrl) {
    links +=
      '<a class="btn-stream btn-stream-spotify" href="' + escapeHtml(pl.spotifyUrl) + '" target="_blank" rel="noopener">' +
      '<svg class="btn-stream-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round"><path d="M6.5 15.7c3-1 6.8-.7 9.5.9"/><path d="M6 12.3c3.6-1.1 8.1-.8 11.2 1"/><path d="M6.3 8.8c4.1-.9 9.2-.6 12.6 1.4"/></svg>' +
      "Listen on Spotify</a>";
  }
  if (pl.appleMusicUrl) {
    links +=
      '<a class="btn-stream btn-stream-apple" href="' + escapeHtml(pl.appleMusicUrl) + '" target="_blank" rel="noopener">' +
      '<svg class="btn-stream-icon" aria-hidden="true" viewBox="0 0 24 24" fill="white"><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/><path d="M9 18V6.3L19 4v11.7" fill="none" stroke="white" stroke-width="1.6"/></svg>' +
      "Apple Music</a>";
  }

  var titleHtml =
    '<h3 class="playlist-title">Playlist #' + escapeHtml(String(pl.number)) +
    ' <span class="playlist-date">' + escapeHtml(formatDate(pl.date)) + "</span></h3>";

  var moreHtml = moreCount > 0
    ? '<p class="playlist-more">+' + moreCount + " more track" + (moreCount === 1 ? "" : "s") + "</p>"
    : "";

  if (mode === "teaser") {
    return (
      '<div class="playlist-card playlist-card-teaser">' +
      titleHtml +
      '<ol class="playlist-tracks">' + trackItems + "</ol>" +
      moreHtml +
      '<div class="playlist-actions">' +
      links +
      '<a class="btn btn-secondary" href="playlists.html">See the full playlist →</a>' +
      "</div>" +
      "</div>"
    );
  }

  return (
    '<article class="playlist-card" id="playlist-' + escapeHtml(String(pl.number)) + '">' +
    titleHtml +
    '<ol class="playlist-tracks">' + trackItems + "</ol>" +
    (links ? '<div class="playlist-links">' + links + "</div>" : "") +
    "</article>"
  );
}

function formatDate(dateStr) {
  var d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
