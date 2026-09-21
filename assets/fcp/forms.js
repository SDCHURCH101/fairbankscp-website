/* ===== FCP form handler =====
   Tilda builds its contact form at runtime and points it at forms.tildacdn.com,
   which no longer serves this domain, so submissions were lost. Static rewriting
   could not reach that form because it does not exist in the HTML. This repoints
   any such form to FormSubmit after Tilda has built it.

   The form node is CLONED before being repointed: cloning drops every event
   listener Tilda bound, which is the only reliable way to stop its AJAX handler
   hijacking the submit. */
(function () {
  "use strict";
  if (window.__fcpForms) return; window.__fcpForms = true;

  var ENDPOINT = "https://formsubmit.co/maiia@fairbankscp.com";
  var NEXT     = "https://www.fairbankscp.com/thanks.html";
  var SUBJECT  = "New enquiry from fairbankscp.com";

  function needsFixing(f) {
    var a = (f.getAttribute("action") || "").toLowerCase();
    if (a.indexOf("formsubmit.co") !== -1) return false;      /* already ours */
    return a.indexOf("tilda") !== -1 || a === "" || f.className.indexOf("js-form-proccess") !== -1;
  }

  /* Tilda names fields Input, Input_2, Textarea... which read badly in an email.
     Use the placeholder or label text where we can find it. */
  function friendlyName(input) {
    var n = input.getAttribute("name") || "";
    if (/^(Name|Email|Phone|Message|Company)$/i.test(n)) return n;
    var hint = input.getAttribute("placeholder") || "";
    if (!hint) {
      var id = input.getAttribute("id");
      var lab = id && document.querySelector('label[for="' + id + '"]');
      if (lab) hint = lab.textContent || "";
    }
    hint = hint.trim();
    if (!hint) return n;
    /* check first/last before the generic name test, or both collapse to "Name" */
    if (/first\s*name/i.test(hint)) return "First_Name";
    if (/last\s*name|surname/i.test(hint)) return "Last_Name";
    if (/mail/i.test(hint)) return "Email";
    if (/phone|tel/i.test(hint)) return "Phone";
    if (/message|comment|tell us/i.test(hint)) return "Message";
    if (/company|business/i.test(hint)) return "Company";
    if (/name/i.test(hint)) return "Name";
    return hint.replace(/[^A-Za-z0-9 ]/g, "").replace(/\s+/g, "_").slice(0, 40) || n;
  }

  function hidden(form, name, value) {
    if (form.querySelector('input[name="' + name + '"]')) return;
    var i = document.createElement("input");
    i.type = "hidden"; i.name = name; i.value = value;
    form.appendChild(i);
  }

  function fix(form) {
    if (!needsFixing(form) || form.dataset.fcpFixed) return false;

    /* clone to shed Tilda's bound submit handler, then swap it in */
    var clone = form.cloneNode(true);
    clone.setAttribute("action", ENDPOINT);
    clone.setAttribute("method", "POST");
    clone.removeAttribute("data-formactiontype");
    clone.removeAttribute("data-success-callback");
    clone.className = clone.className.replace(/js-form-proccess/g, "fcp-form");
    clone.dataset.fcpFixed = "1";

    var used = {};
    Array.prototype.forEach.call(clone.querySelectorAll("input,textarea,select"), function (el) {
      var n = el.getAttribute("name") || "";
      if (n.indexOf("tildaspec") === 0 || n === "form-spec-comments") { el.remove(); return; }
      if (n.charAt(0) === "_") return;                       /* our own control fields */
      var fn = friendlyName(el) || n;
      if (used[fn]) { used[fn]++; fn = fn + "_" + used[fn]; }  /* never duplicate a name */
      else used[fn] = 1;
      if (fn !== n) el.setAttribute("name", fn);
    });

    hidden(clone, "_subject", SUBJECT);
    hidden(clone, "_next", NEXT);
    hidden(clone, "_captcha", "false");
    hidden(clone, "_template", "table");
    if (!clone.querySelector('input[name="_honey"]')) {
      var h = document.createElement("input");
      h.type = "text"; h.name = "_honey"; h.tabIndex = -1;
      h.setAttribute("autocomplete", "off"); h.setAttribute("aria-hidden", "true");
      h.style.cssText = "position:absolute;left:-9999px;width:1px;height:1px;";
      clone.appendChild(h);
    }

    if (form.parentNode) form.parentNode.replaceChild(clone, form);
    return true;
  }

  function sweep() {
    var n = 0;
    Array.prototype.forEach.call(document.querySelectorAll("form"), function (f) {
      try { if (fix(f)) n++; } catch (e) {}
    });
    return n;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", sweep);
  else sweep();
  window.addEventListener("load", sweep);
  [400, 1200, 2500, 5000].forEach(function (ms) { setTimeout(sweep, ms); });

  /* Tilda can rebuild a form later; catch it when it does */
  if (window.MutationObserver) {
    var t = null;
    new MutationObserver(function () {
      clearTimeout(t); t = setTimeout(sweep, 250);
    }).observe(document.documentElement, { childList: true, subtree: true });
  }
})();
