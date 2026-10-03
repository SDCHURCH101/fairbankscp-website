/* ===== FCP listing back link =====
   Tilda's own "More products" link is inside its popup-close wrapper, which only
   appeared when a listing opened as a popup inside the catalog. On a standalone
   listing page it renders 0x0, so there was no way back to the portfolio. It also
   still pointed at the old absolute URL. This adds a visible back link at the top
   of the content, and repairs that stale href in case it is ever shown. */
(function () {
  "use strict";
  if (window.__fcpListingBack) return; window.__fcpListingBack = true;

  var TARGET = "/portfolio/";
  var LABEL  = "All properties";

  function build() {
    if (document.querySelector(".fcp-back-link")) return;
    var host = document.querySelector(".t-catalog__prod-popup__slider")
            || document.querySelector(".js-product-img");
    if (host) host = host.closest(".t-container") || host.parentElement;
    if (!host) return;

    var a = document.createElement("a");
    a.className = "fcp-back-link";
    a.href = TARGET;
    a.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true" width="15" height="15" fill="none"' +
      ' stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M15 19l-7-7 7-7"/></svg><span>' + LABEL + "</span>";
    host.insertBefore(a, host.firstChild);
  }

  /* Tilda's hidden link still carried https://fairbankscp.com/portfolio */
  function repair() {
    Array.prototype.forEach.call(document.querySelectorAll('a[href*="fairbankscp.com/portfolio"]'),
      function (a) { a.setAttribute("href", TARGET); });
  }

  function run() { try { build(); repair(); } catch (e) {} }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
  window.addEventListener("load", run);
  [300, 1200, 2600].forEach(function (ms) { setTimeout(run, ms); });
})();
