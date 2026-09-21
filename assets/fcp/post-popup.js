/* ===== FCP post popup =====
   Insights cards open the post in a centred overlay with a close cross, matching
   the behaviour the Tilda CMS popup had. Content is read from the post page's
   BlogPosting JSON-LD, so the layout and typography are owned here rather than
   inherited from the CMS fragment. Closes via the cross, the backdrop, Escape,
   or browser back. */
(function () {
  "use strict";
  if (window.__fcpPostPopup) return; window.__fcpPostPopup = true;

  var POST_RE = /(^|\/)tpost\//i;
  /* Resolve relative links against the page we opened from; location.href would
     compound once a /tpost/ URL has been pushed. */
  var BASE = location.href;
  var scrim = null, box = null, bodyEl = null, lastFocus = null;
  var cache = {};

  function esc(s){
    return String(s == null ? "" : s)
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;");
  }
  /* Teasers in the feed are truncated and end in a bare "...." stub, which reads
     as broken. Normalise to a single ellipsis. */
  function tidy(s){
    return String(s || "").replace(/\s*\.{3,}\s*$/, "…").trim();
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
    btn.type = "button"; btn.className = "fcp-pp__close";
    btn.setAttribute("aria-label","Close article");
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none"'+
      ' stroke="currentColor" stroke-width="2.2" stroke-linecap="round">'+
      '<path d="M5 5l14 14M19 5L5 19"/></svg>';
    btn.addEventListener("click", function(){ close(true); });

    bodyEl = document.createElement("div");

    box.appendChild(btn); box.appendChild(bodyEl);
    scrim.appendChild(box);
    scrim.addEventListener("mousedown", function(e){ if (e.target === scrim) close(true); });
    document.body.appendChild(scrim);
  }

  function onKey(e){ if (e.key === "Escape") close(true); }

  /* pull the post's own structured data + its related cards out of the fetched page */
  function readPost(doc){
    var post = null;
    var nodes = doc.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < nodes.length; i++){
      var data; try { data = JSON.parse(nodes[i].textContent); } catch(e){ continue; }
      var graph = data["@graph"] || [data];
      for (var j = 0; j < graph.length; j++){
        if (graph[j]["@type"] === "BlogPosting") { post = graph[j]; break; }
      }
      if (post) break;
    }
    if (!post) return null;

    /* related cards live in a template on the post page */
    var rel = [], tpl = doc.querySelector("#fcp-seealso-tpl");
    if (tpl){
      var holder = doc.createElement("div");
      holder.innerHTML = tpl.innerHTML;
      var seen = {};
      Array.prototype.forEach.call(holder.querySelectorAll("li"), function(li){
        var a = li.querySelector("a[href]");
        var img = li.querySelector(".t-cms__card__image");
        var txt = li.querySelectorAll(".t-cms__card__text");
        var href = a ? a.getAttribute("href") : "";
        if (!href || seen[href]) return;           /* the feed publishes duplicates */
        seen[href] = 1;
        rel.push({
          href: href,
          img: img ? (img.getAttribute("data-original") || "") : "",
          tag: txt[0] ? txt[0].textContent.trim() : "",
          title: txt[1] ? txt[1].textContent.trim() : ""
        });
      });
    }
    return { post: post, related: rel.slice(0,3) };
  }

  function render(d){
    var p = d.post;
    var html = "";
    if (p.image) html += '<div class="fcp-pp__hero"><img src="'+esc(p.image)+'" alt="'+esc(p.headline)+'"></div>';
    html += '<div class="fcp-pp__body">';
    if (p.articleSection) html += '<div class="fcp-pp__eyebrow">'+esc(p.articleSection)+'</div>';
    html += '<h2 class="fcp-pp__title">'+esc(p.headline)+'</h2>';
    if (p.description) html += '<p class="fcp-pp__standfirst">'+esc(tidy(p.description))+'</p>';
    if (d.related.length){
      html += '<hr class="fcp-pp__rule"><div class="fcp-pp__morehead">More insights</div>';
      html += '<ul class="fcp-pp__more">';
      d.related.forEach(function(r){
        html += '<li><a class="fcp-pp__card" href="'+esc(r.href)+'">'+
          (r.img ? '<div class="fcp-pp__thumb"><img src="'+esc(r.img)+'" alt="" loading="lazy"></div>' : '')+
          '<div class="fcp-pp__ctext">'+
            (r.tag ? '<div class="fcp-pp__ctag">'+esc(r.tag)+'</div>' : '')+
            '<div class="fcp-pp__ctitle">'+esc(r.title)+'</div>'+
          '</div></a></li>';
      });
      html += '</ul>';
    }
    html += '</div>';
    bodyEl.innerHTML = html;

    /* related cards swap the popup rather than navigating away */
    Array.prototype.forEach.call(bodyEl.querySelectorAll("a.fcp-pp__card"), function(a){
      a.addEventListener("click", function(e){
        e.preventDefault();
        open(new URL(a.getAttribute("href"), BASE).pathname, true);
        if (scrim) scrim.scrollTop = 0;
      });
    });
    var t = box.querySelector(".fcp-pp__close"); if (t) t.focus();
  }

  function open(href, push){
    build();
    lastFocus = document.activeElement;
    bodyEl.innerHTML = '<div class="fcp-pp__loading">Loading…</div>';
    scrim.hidden = false;
    document.body.classList.add("fcp-pp-open");
    /* reveal synchronously - requestAnimationFrame is throttled in hidden or
       non-compositing tabs and would leave this stuck at opacity 0 */
    void scrim.offsetWidth;
    scrim.classList.add("is-open");
    setTimeout(function(){ if (scrim && !scrim.hidden) scrim.classList.add("is-open"); }, 60);
    document.addEventListener("keydown", onKey);
    if (push) { try { history.pushState({fcpPost:href}, "", href); } catch(e){} }

    if (cache[href]) { render(cache[href]); return; }
    fetch(href).then(function(r){ return r.text(); }).then(function(html){
      var doc = new DOMParser().parseFromString(html, "text/html");
      var d = readPost(doc);
      if (!d){ bodyEl.innerHTML = '<div class="fcp-pp__loading">Could not load this article.</div>'; return; }
      cache[href] = d;
      scrim.setAttribute("aria-label", d.post.headline || "Article");
      render(d);
    }).catch(function(){
      bodyEl.innerHTML = '<div class="fcp-pp__loading">Could not load this article.</div>';
    });
  }

  function close(goBack){
    if (!scrim || scrim.hidden) return;
    scrim.classList.remove("is-open");
    document.removeEventListener("keydown", onKey);
    document.body.classList.remove("fcp-pp-open");
    setTimeout(function(){ if (scrim) { scrim.hidden = true; bodyEl.innerHTML = ""; } }, 200);
    if (goBack && history.state && history.state.fcpPost) history.back();
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch(e){} }
  }

  window.addEventListener("popstate", function(){
    if (history.state && history.state.fcpPost) open(history.state.fcpPost, false);
    else close(false);
  });

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
