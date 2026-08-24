// Reads /data/notice.json and shows a banner on the Listen page if the show
// isn't on as usual this week (reading week, holidays, etc.).
// To use it: edit data/notice.json — set "active" to true and write a message.
document.addEventListener("DOMContentLoaded", function () {
  var banner = document.querySelector("[data-notice-banner]");
  if (!banner) return;

  fetch("data/notice.json")
    .then(function (res) {
      if (!res.ok) throw new Error("no notice file");
      return res.json();
    })
    .then(function (notice) {
      if (notice && notice.active && notice.message) {
        banner.textContent = notice.message;
        banner.classList.add("is-active");
      }
    })
    .catch(function () {
      // No notice file, or it failed to load — just stay hidden.
    });
});
