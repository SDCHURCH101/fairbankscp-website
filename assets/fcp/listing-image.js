/* ===== FCP listing image =====
   Tilda's catalog script normally fills the product image area and fades it in.
   That script was removed because it is domain-locked and fought the static
   content, which left .js-product-img reserving 4:3 of blank space at opacity 0
   above every listing title. Each page still carries its photo in
   <meta itemprop="image">, so use that. Where there is no usable image the area
   collapses instead of sitting empty. */
(function () {
  "use strict";
  if (window.__fcpListingImg) return; window.__fcpListingImg = true;

  function apply() {
    var box = document.querySelector(".js-product-img");
    if (!box || box.dataset.fcpDone) return;

    var meta = document.querySelector('meta[itemprop="image"]');
    var src = meta && meta.getAttribute("content");

    if (!src) {                       /* nothing to show: do not reserve the space */
      var slider = box.closest(".t-catalog__prod-popup__slider") || box;
      slider.style.display = "none";
      box.dataset.fcpDone = "1";
      return;
    }

    var probe = new Image();
    probe.onload = function () {
      box.style.backgroundImage = "url('" + src + "')";
      box.style.backgroundPosition = "center";
      box.style.backgroundRepeat = "no-repeat";
      box.style.backgroundSize = "cover";
      box.style.borderRadius = "12px";
      box.style.transition = "opacity .35s ease";
      box.style.opacity = "1";
      box.setAttribute("role", "img");
      var name = document.querySelector("h1");
      box.setAttribute("aria-label", name ? name.textContent.trim() : "Property photograph");
      box.dataset.fcpDone = "1";
    };
    probe.onerror = function () {      /* broken path: collapse rather than leave a gap */
      var s = box.closest(".t-catalog__prod-popup__slider") || box;
      s.style.display = "none";
      box.dataset.fcpDone = "1";
    };
    probe.src = src;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply);
  else apply();
  window.addEventListener("load", apply);
  [300, 1000, 2500].forEach(function (ms) { setTimeout(apply, ms); });
})();
