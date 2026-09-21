/* ===== FCP post popup (local copy, NOT part of the original site) =====
   Insights cards open the post in a centred popup with a close cross, matching the
   live site. Closing: the cross, clicking the backdrop, Escape, or browser back. */
(function () {
  "use strict";
  if (window.__fcpPostPopup) return; window.__fcpPostPopup = true;

  var POST_RE = /(^|\/)tpost\//i;
  /* Resolve relative links against the page we started on. Using location.href
     would compound once the popup has pushed a /tpost/ URL, giving /tpost/tpost/. */
  var BASE = location.href;
  var scrim = null, box = null, bodyEl = null, lastFocus = null, openUrl = null;

  function svgCross(){
    return '<svg role="presentation" width="23" height="23" viewBox="0 0 23 23"'+
      ' xmlns="http://www.w3.org/2000/svg"><g stroke="none" stroke-width="1" fill="#fff"'+
      ' fill-rule="evenodd">'+
      '<rect transform="translate(11.313708,11.313708) rotate(-45)'+
      ' translate(-11.313708,-11.313708)" x="10.3137085" y="-3.6862915" width="2" height="30"></rect>'+
      '<rect transform="translate(11.313708,11.313708) rotate(-315)'+
      ' translate(-11.313708,-11.313708)" x="10.3137085" y="-3.6862915" width="2" height="30"></rect>'+
      '</g></svg>';
  }

  function build(){
    if (scrim) return;
    scrim = document.createElement("div");
    scrim.className = "fcp-pp"; scrim.hidden = true;
    scrim.setAttribute("role","dialog");
    scrim.setAttribute("aria-modal","true");
    scrim.setAttribute("aria-label","Article");

    box = document.createElement("div");
    box.className = "fcp-pp__box";

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "fcp-pp__close";
    btn.setAttribute("aria-label","Close article");
    btn.innerHTML = svgCross();
    btn.addEventListener("click", function(){ close(true); });

    bodyEl = document.createElement("div");
    bodyEl.className = "fcp-pp__body";

    box.appendChild(btn); box.appendChild(bodyEl);
    scrim.appendChild(box);
    /* click on the backdrop, not the panel, closes */
    scrim.addEventListener("mousedown", function(e){ if (e.target === scrim) close(true); });
    document.body.appendChild(scrim);
  }

  function onKey(e){ if (e.key === "Escape") close(true); }

  function open(href, push){
    build();
    lastFocus = document.activeElement;
    bodyEl.innerHTML = '<div class="fcp-pp__loading">Loading…</div>';
    scrim.hidden = false;
    document.body.classList.add("fcp-pp-open");
    /* Force a reflow, then reveal synchronously. requestAnimationFrame is throttled
       in hidden or backgrounded tabs and could leave the popup stuck at opacity 0,
       which reads to the user as the link doing nothing. */
    void scrim.offsetWidth;
    scrim.classList.add("is-open");
    setTimeout(function(){ if (scrim && !scrim.hidden) scrim.classList.add("is-open"); }, 60);
    document.addEventListener("keydown", onKey);
    openUrl = href;
    if (push) { try { history.pushState({fcpPost:href}, "", href); } catch(e){} }

    fetch(href).then(function(r){ return r.text(); }).then(function(html){
      var doc = new DOMParser().parseFromString(html, "text/html");
      /* The See also cards live in a template and are injected by script on the real
         page. A parsed document runs no script, so fill the list here first. */
      var saTpl = doc.querySelector("#fcp-seealso-tpl");
      var saUl  = doc.querySelector("ul.js-cms-container-seealso-cards");
      if (saTpl && saUl && !saUl.querySelector("li.t-cms__card")) saUl.innerHTML = saTpl.innerHTML;
      /* remaining templates hold unfilled Tilda placeholders - drop them */
      Array.prototype.forEach.call(doc.querySelectorAll("template"), function(t){ t.remove(); });
      var art = doc.querySelector("article.t-cms__page") || doc.querySelector("article");
      var also = doc.querySelector(".t-cms__seealso");
      if (!art) { bodyEl.innerHTML = '<div class="fcp-pp__loading">Could not load this article.</div>'; return; }
      bodyEl.innerHTML = "";
      bodyEl.appendChild(art);
      if (also) bodyEl.appendChild(also);
      /* make images inside the popup load immediately */
      Array.prototype.forEach.call(bodyEl.querySelectorAll("[data-original]"), function(n){
        var u = n.getAttribute("data-original");
        if (!u) return;
        if (n.tagName === "IMG") n.src = u; else n.style.backgroundImage = "url('"+u+"')";
      });
      var t = doc.querySelector("title");
      if (t) scrim.setAttribute("aria-label", t.textContent.trim());
      /* related cards swap the popup contents instead of navigating away */
      Array.prototype.forEach.call(bodyEl.querySelectorAll("a[href]"), function(a){
        var h = a.getAttribute("href") || "";
        if (!POST_RE.test(h) && !/\.html$/i.test(h)) return;
        if (!POST_RE.test(h) && h.indexOf("tpost") === -1) return;
        a.addEventListener("click", function(e){
          e.preventDefault();
          var abs = new URL(h, BASE).pathname;
          open(abs, true);
          bodyEl.scrollIntoView({block:"start"});
        });
      });
      var c = box.querySelector(".fcp-pp__close"); if (c) c.focus();
    }).catch(function(){
      bodyEl.innerHTML = '<div class="fcp-pp__loading">Could not load this article.</div>';
    });
  }

  function close(goBack){
    if (!scrim || scrim.hidden) return;
    scrim.classList.remove("is-open");
    document.removeEventListener("keydown", onKey);
    document.body.classList.remove("fcp-pp-open");
    setTimeout(function(){ if (scrim) { scrim.hidden = true; bodyEl.innerHTML = ""; } }, 180);
    if (goBack && history.state && history.state.fcpPost) { history.back(); }
    openUrl = null;
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch(e){} }
  }

  window.addEventListener("popstate", function(){
    if (history.state && history.state.fcpPost) open(history.state.fcpPost, false);
    else close(false);
  });

  /* intercept clicks on any link to a post */
  document.addEventListener("click", function(e){
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute("href") || "";
    if (!POST_RE.test(href)) return;
    if (a.target && a.target !== "_self") return;
    e.preventDefault();
    open(new URL(href, BASE).pathname, true);
  }, true);
})();
