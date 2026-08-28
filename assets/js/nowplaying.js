// Reads /data/nowplaying.json and fills in the "what I've been listening to"
// phone widget. Edit that file to change the song, artist, or album cover —
// no need to touch this script or the HTML.
document.addEventListener("DOMContentLoaded", function () {
  var widget = document.querySelector("[data-now-playing]");
  if (!widget) return;

  var cover = widget.querySelector("[data-np-cover]");
  var songEl = widget.querySelector("[data-np-song]");
  var artistEl = widget.querySelector("[data-np-artist]");

  fetch("data/nowplaying.json")
    .then(function (res) {
      if (!res.ok) throw new Error("Could not load nowplaying.json (" + res.status + ")");
      return res.json();
    })
    .then(function (track) {
      if (track.albumCover) {
        cover.src = track.albumCover;
        cover.alt = track.song ? "Album cover for " + track.song : "Album cover";
      }
      if (songEl) songEl.textContent = track.song || "";
      if (artistEl) artistEl.textContent = track.artist || "";
    })
    .catch(function () {
      // Leave the placeholder content in place if the file fails to load.
    });
});
