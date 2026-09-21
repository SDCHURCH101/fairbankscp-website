/* ===== FCP language + currency bar (added by the local copy, not part of the original site) ===== */
(function () {
  "use strict";
  if (window.__fcpIntl) return; window.__fcpIntl = true;

  var LANGS = [
["en","English","English"],["es","Spanish","Español"],["zh-CN","Chinese (Simplified)","简体中文"],
["zh-TW","Chinese (Traditional)","繁體中文"],["hi","Hindi","हिन्दी"],["ar","Arabic","العربية"],
["pt","Portuguese","Português"],["bn","Bengali","বাংলা"],["ru","Russian","Русский"],
["ja","Japanese","日本語"],["pa","Punjabi","ਪੰਜਾਬੀ"],["de","German","Deutsch"],
["ko","Korean","한국어"],["fr","French","Français"],["tr","Turkish","Türkçe"],
["vi","Vietnamese","Tiếng Việt"],["it","Italian","Italiano"],["ta","Tamil","தமிழ்"],
["ur","Urdu","اردو"],["fa","Persian","فارسی"],["pl","Polish","Polski"],
["uk","Ukrainian","Українська"],["ro","Romanian","Română"],["nl","Dutch","Nederlands"],
["th","Thai","ไทย"],["id","Indonesian","Bahasa Indonesia"],["ms","Malay","Bahasa Melayu"],
["tl","Filipino","Filipino"],["sw","Swahili","Kiswahili"],["he","Hebrew","עברית"],
["el","Greek","Ελληνικά"],["cs","Czech","Čeština"],["sv","Swedish","Svenska"],
["hu","Hungarian","Magyar"],["fi","Finnish","Suomi"],["da","Danish","Dansk"],
["no","Norwegian","Norsk"],["sk","Slovak","Slovenčina"],["bg","Bulgarian","Български"],
["hr","Croatian","Hrvatski"],["sr","Serbian","Српски"],["sl","Slovenian","Slovenščina"],
["lt","Lithuanian","Lietuvių"],["lv","Latvian","Latviešu"],["et","Estonian","Eesti"],
["te","Telugu","తెలుగు"],["mr","Marathi","मराठी"],["gu","Gujarati","ગુજરાતી"],
["kn","Kannada","ಕನ್ನಡ"],["ml","Malayalam","മലയാളം"],["si","Sinhala","සිංහල"],
["ne","Nepali","नेपाली"],["my","Burmese","မြန်မာ"],["km","Khmer","ខ្មែរ"],
["lo","Lao","ລາວ"],["am","Amharic","አማርኛ"],["ha","Hausa","Hausa"],
["yo","Yoruba","Yorùbá"],["ig","Igbo","Igbo"],["zu","Zulu","isiZulu"],
["xh","Xhosa","isiXhosa"],["af","Afrikaans","Afrikaans"],["so","Somali","Soomaali"],
["rw","Kinyarwanda","Kinyarwanda"],["ny","Chichewa","Chichewa"],["st","Sesotho","Sesotho"],
["sn","Shona","chiShona"],["az","Azerbaijani","Azərbaycan"],["kk","Kazakh","Қазақ"],
["uz","Uzbek","Oʻzbek"],["ky","Kyrgyz","Кыргызча"],["tg","Tajik","Тоҷикӣ"],
["tk","Turkmen","Türkmen"],["mn","Mongolian","Монгол"],["ka","Georgian","ქართული"],
["hy","Armenian","Հայերեն"],["sq","Albanian","Shqip"],["mk","Macedonian","Македонски"],
["bs","Bosnian","Bosanski"],["is","Icelandic","Íslenska"],["ga","Irish","Gaeilge"],
["cy","Welsh","Cymraeg"],["gl","Galician","Galego"],["ca","Catalan","Català"],
["eu","Basque","Euskara"],["mt","Maltese","Malti"],["lb","Luxembourgish","Lëtzebuergesch"],
["be","Belarusian","Беларуская"],["ps","Pashto","پښتو"],["sd","Sindhi","سنڌي"],
["ku","Kurdish","Kurdî"],["yi","Yiddish","ייִדיש"],["haw","Hawaiian","ʻŌlelo Hawaiʻi"],
["mi","Maori","Te Reo Māori"],["sm","Samoan","Gagana Samoa"],["jv","Javanese","Basa Jawa"],
["su","Sundanese","Basa Sunda"],["ceb","Cebuano","Cebuano"],["la","Latin","Latina"],
["eo","Esperanto","Esperanto"]
  ];

  /* Indicative USD reference rates. Edit FCP_RATES_AS_OF + values to refresh. */
  var RATES_AS_OF = "September 2026";
  var CURR = [
["USD","US Dollar","$",1],["EUR","Euro","€",0.92],["GBP","British Pound","£",0.78],
["CAD","Canadian Dollar","C$",1.36],["AUD","Australian Dollar","A$",1.50],
["JPY","Japanese Yen","¥",147],["CNY","Chinese Yuan","¥",7.12],["CHF","Swiss Franc","CHF",0.86],
["HKD","Hong Kong Dollar","HK$",7.80],["SGD","Singapore Dollar","S$",1.29],
["NZD","New Zealand Dollar","NZ$",1.63],["INR","Indian Rupee","₹",83.5],
["KRW","South Korean Won","₩",1340],["MXN","Mexican Peso","MX$",18.6],
["BRL","Brazilian Real","R$",5.45],["ZAR","South African Rand","R",18.2],
["SEK","Swedish Krona","kr",10.5],["NOK","Norwegian Krone","kr",10.7],
["DKK","Danish Krone","kr",6.85],["PLN","Polish Zloty","zł",3.95],
["CZK","Czech Koruna","Kč",23.2],["HUF","Hungarian Forint","Ft",360],
["RON","Romanian Leu","lei",4.58],["TRY","Turkish Lira","₺",34.0],
["RUB","Russian Ruble","₽",92],["UAH","Ukrainian Hryvnia","₴",41],
["ILS","Israeli Shekel","₪",3.72],["AED","UAE Dirham","AED",3.67],
["SAR","Saudi Riyal","SAR",3.75],["QAR","Qatari Riyal","QAR",3.64],
["KWD","Kuwaiti Dinar","KD",0.31],["BHD","Bahraini Dinar","BD",0.38],
["OMR","Omani Rial","OMR",0.38],["JOD","Jordanian Dinar","JD",0.71],
["EGP","Egyptian Pound","E£",48],["NGN","Nigerian Naira","₦",1580],
["KES","Kenyan Shilling","KSh",129],["GHS","Ghanaian Cedi","₵",15.6],
["MAD","Moroccan Dirham","MAD",9.85],["TND","Tunisian Dinar","DT",3.05],
["THB","Thai Baht","฿",33.5],["VND","Vietnamese Dong","₫",24800],
["IDR","Indonesian Rupiah","Rp",15600],["MYR","Malaysian Ringgit","RM",4.35],
["PHP","Philippine Peso","₱",56.5],["PKR","Pakistani Rupee","₨",278],
["BDT","Bangladeshi Taka","৳",119],["LKR","Sri Lankan Rupee","Rs",296],
["NPR","Nepalese Rupee","NRs",133],["TWD","Taiwan Dollar","NT$",32.0],
["CLP","Chilean Peso","CLP$",945],["COP","Colombian Peso","COL$",4100],
["ARS","Argentine Peso","AR$",960],["PEN","Peruvian Sol","S/",3.75],
["UYU","Uruguayan Peso","$U",40.5],["ISK","Icelandic Krona","kr",137],
["KZT","Kazakhstani Tenge","₸",478],["GEL","Georgian Lari","₾",2.70],
["RSD","Serbian Dinar","RSD",108],["BGN","Bulgarian Lev","лв",1.80],
["HRK","Croatian Kuna","kn",6.93],["ETB","Ethiopian Birr","Br",116]
  ];

  /* Extra search terms: endonyms, common alternate names, and the countries people
     actually type when hunting for a currency. */
  var ALIAS={
    "zh-CN":"mandarin putonghua chinese china simplified hanyu zhongwen",
    "zh-TW":"mandarin taiwanese traditional taiwan hongkong cantonese",
    "fa":"farsi persian iran dari","ar":"arabic egypt saudi uae gulf masri",
    "es":"castellano espanol spain mexico latino","pt":"portugues brazil brasil portugal",
    "de":"deutsch german germany austria swiss","fr":"francais france quebec belgium",
    "it":"italiano italy","nl":"nederlands dutch holland netherlands flemish",
    "ja":"nihongo japanese japan","ko":"hangul korean korea",
    "ru":"russkiy russian russia","uk":"ukrainian ukraine",
    "he":"hebrew ivrit israel","hi":"hindi india","ur":"urdu pakistan",
    "pa":"punjabi panjabi","bn":"bangla bengali bangladesh",
    "tl":"tagalog filipino philippines","id":"bahasa indonesia",
    "ms":"bahasa melayu malaysia","vi":"vietnamese vietnam",
    "th":"thai thailand","tr":"turkce turkish turkey","el":"greek greece ellinika",
    "pl":"polski poland","sv":"svenska sweden","no":"norsk norway bokmal",
    "da":"dansk denmark","fi":"suomi finland","cs":"cestina czech",
    "sk":"slovak slovakia","hu":"magyar hungary","ro":"romanian romania",
    "bg":"bulgarian bulgaria","sr":"srpski serbia","hr":"hrvatski croatia",
    "sw":"kiswahili swahili kenya tanzania","am":"amharic ethiopia",
    "so":"somali somalia","ha":"hausa nigeria","yo":"yoruba nigeria",
    "ig":"igbo nigeria","zu":"zulu south africa","af":"afrikaans south africa",
    "USD":"dollar usa america united states us","EUR":"euro europe eurozone eu",
    "GBP":"pound sterling uk britain england","CAD":"dollar canada canadian",
    "AUD":"dollar australia australian","NZD":"dollar new zealand kiwi",
    "JPY":"yen japan","CNY":"yuan renminbi rmb china","HKD":"dollar hong kong",
    "SGD":"dollar singapore","CHF":"franc switzerland swiss",
    "INR":"rupee india","KRW":"won south korea","MXN":"peso mexico",
    "BRL":"real brazil brasil","ZAR":"rand south africa","SEK":"krona sweden",
    "NOK":"krone norway","DKK":"krone denmark","PLN":"zloty poland",
    "CZK":"koruna czech","HUF":"forint hungary","RON":"leu romania",
    "TRY":"lira turkey turkiye","RUB":"ruble rouble russia","UAH":"hryvnia ukraine",
    "ILS":"shekel israel","AED":"dirham uae dubai emirates","SAR":"riyal saudi arabia",
    "QAR":"riyal qatar","KWD":"dinar kuwait","BHD":"dinar bahrain","OMR":"rial oman",
    "JOD":"dinar jordan","EGP":"pound egypt","NGN":"naira nigeria",
    "KES":"shilling kenya","GHS":"cedi ghana","MAD":"dirham morocco",
    "TND":"dinar tunisia","THB":"baht thailand","VND":"dong vietnam",
    "IDR":"rupiah indonesia","MYR":"ringgit malaysia","PHP":"peso philippines",
    "PKR":"rupee pakistan","BDT":"taka bangladesh","LKR":"rupee sri lanka",
    "NPR":"rupee nepal","TWD":"dollar taiwan","CLP":"peso chile",
    "COP":"peso colombia","ARS":"peso argentina","PEN":"sol peru",
    "UYU":"peso uruguay","ISK":"krona iceland","KZT":"tenge kazakhstan",
    "GEL":"lari georgia","RSD":"dinar serbia","BGN":"lev bulgaria",
    "HRK":"kuna croatia","ETB":"birr ethiopia"
  };
  var LS_L="fcp.lang", LS_C="fcp.curr";
  function get(k,d){ try{ return localStorage.getItem(k)||d; }catch(e){ return d; } }
  function set(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
  function el(t,c,x){ var n=document.createElement(t); if(c)n.className=c; if(x!=null)n.textContent=x; return n; }

  var curLang=get(LS_L,"en"), curCurr=get(LS_C,"USD");
  function langOf(c){ for(var i=0;i<LANGS.length;i++) if(LANGS[i][0]===c) return LANGS[i]; return LANGS[0]; }
  function currOf(c){ for(var i=0;i<CURR.length;i++) if(CURR[i][0]===c) return CURR[i]; return CURR[0]; }

  /* ---------- bar ---------- */
  var bar=el("div","fcp-bar notranslate"); bar.setAttribute("role","region");
  bar.setAttribute("aria-label","Language and currency");
  bar.setAttribute("translate","no");
  var note=el("div","fcp-bar__spacer","Fairbanks Commercial Properties");
  bar.appendChild(note);

  function mkBtn(id,icoPath,label){
    var b=el("button","fcp-btn"); b.type="button"; b.id=id;
    b.setAttribute("aria-haspopup","listbox"); b.setAttribute("aria-expanded","false");
    b.setAttribute("aria-label",label);
    var svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
    svg.setAttribute("class","fcp-btn__ico"); svg.setAttribute("viewBox","0 0 24 24");
    svg.setAttribute("fill","none"); svg.setAttribute("stroke","currentColor");
    svg.setAttribute("stroke-width","2"); svg.setAttribute("aria-hidden","true");
    var p=document.createElementNS("http://www.w3.org/2000/svg","path");
    p.setAttribute("d",icoPath); p.setAttribute("stroke-linecap","round");
    p.setAttribute("stroke-linejoin","round"); svg.appendChild(p); b.appendChild(svg);
    var cap=el("span","fcp-btn__cap"); b.appendChild(cap);
    var car=document.createElementNS("http://www.w3.org/2000/svg","svg");
    car.setAttribute("class","fcp-btn__car"); car.setAttribute("viewBox","0 0 12 12");
    car.setAttribute("aria-hidden","true");
    var cp=document.createElementNS("http://www.w3.org/2000/svg","path");
    cp.setAttribute("d","M2 4l4 4 4-4"); cp.setAttribute("fill","none");
    cp.setAttribute("stroke","currentColor"); cp.setAttribute("stroke-width","2");
    cp.setAttribute("stroke-linecap","round"); cp.setAttribute("stroke-linejoin","round");
    car.appendChild(cp); b.appendChild(car);
    b._cap=cap; return b;
  }
  var GLOBE="M12 3a9 9 0 100 18 9 9 0 000-18zm0 0c2.5 2.6 2.5 15.4 0 18M3.6 9h16.8M3.6 15h16.8";
  var COIN ="M12 3v18M7.5 7.5h6.2a2.8 2.8 0 010 5.6H9a2.8 2.8 0 000 5.6h7";
  var bL=mkBtn("fcpLangBtn",GLOBE,"Choose language");
  var bC=mkBtn("fcpCurrBtn",COIN,"Choose currency");
  bar.appendChild(bL); bar.appendChild(bC);

  var scrim=el("div","fcp-scrim"); scrim.hidden=true;

  function mkPop(labelledby){
    var pop=el("div","fcp-pop notranslate"); pop.hidden=true;
    pop.setAttribute("translate","no");
    pop.setAttribute("role","dialog"); pop.setAttribute("aria-labelledby",labelledby);
    var sw=el("div","fcp-pop__search"); var inp=document.createElement("input");
    inp.type="search"; inp.autocomplete="off"; inp.setAttribute("aria-label","Search");
    sw.appendChild(inp); pop.appendChild(sw);
    var list=el("div","fcp-pop__list"); list.setAttribute("role","listbox"); pop.appendChild(list);
    pop._input=inp; pop._list=list; return pop;
  }
  var pL=mkPop("fcpLangBtn"), pC=mkPop("fcpCurrBtn");
  pL._input.placeholder="Search "+LANGS.length+" languages";
  pC._input.placeholder="Search "+CURR.length+" currencies";
  var cNote=el("div","fcp-pop__note",
    "Indicative conversion from USD, rates as of "+RATES_AS_OF+". Shown for guidance only. All agreements and payments are in US dollars.");
  pC.appendChild(cNote);

  function syncCaps(){
    var L=langOf(curLang), C=currOf(curCurr);
    bL._cap.textContent=L[2]; bL.setAttribute("aria-label","Language: "+L[1]);
    /* Several currencies use their code as the symbol (AED, SAR, CHF...), so don't print it twice. */
    bC._cap.textContent=(C[2]===C[0]) ? C[0] : (C[0]+" "+C[2]);
    bC.setAttribute("aria-label","Currency: "+C[1]);
  }

  /* Strip diacritics so "espanol" finds Español and "turkce" finds Türkçe. */
  function norm(x){
    x=String(x).toLowerCase();
    try{ x=x.normalize("NFD").replace(/[\u0300-\u036f]/g,""); }catch(e){}
    return x;
  }
  function render(pop,rows,sel,onPick){
    var list=pop._list, q=norm(pop._input.value.trim());
    list.innerHTML="";
    var hits=rows.filter(function(r){
      if(!q) return true;
      var hay=norm(r[0]+" "+r[1]+" "+r[2]+" "+(ALIAS[r[0]]||""));
      return hay.indexOf(q)!==-1;
    });
    if(!hits.length){ list.appendChild(el("div","fcp-pop__empty","No matches")); return; }
    hits.forEach(function(r){
      var o=el("button","fcp-opt"); o.type="button"; o.setAttribute("role","option");
      o.setAttribute("aria-selected", r[0]===sel ? "true":"false");
      var k=el("span","fcp-opt__k", r.length===4 ? r[0] : r[0].toUpperCase());
      var n=el("span","fcp-opt__n", r[1]);
      var s=el("span","fcp-opt__s", (r.length===4 && r[2]===r[0]) ? "" : r[2]);
      o.appendChild(k); o.appendChild(n); o.appendChild(s);
      o.addEventListener("click",function(){ onPick(r[0]); });
      list.appendChild(o);
    });
  }

  var openPop=null, openBtn=null;
  function place(pop,btn){
    if(window.innerWidth<=640) return;
    var r=btn.getBoundingClientRect(), w=288;
    pop.style.top=(r.bottom+8)+"px";
    pop.style.left=Math.max(8,Math.min(r.right-w, window.innerWidth-w-8))+"px";
  }
  function close(){
    if(!openPop) return;
    openPop.hidden=true; openBtn.setAttribute("aria-expanded","false");
    scrim.hidden=true; openPop=null; openBtn=null;
  }
  function open(pop,btn,draw){
    if(openPop===pop){ close(); return; }
    close(); pop._input.value=""; draw();
    pop.hidden=false; btn.setAttribute("aria-expanded","true");
    scrim.hidden=false; place(pop,btn); openPop=pop; openBtn=btn;
    setTimeout(function(){ if(window.innerWidth>640) pop._input.focus(); },30);
  }

  var drawL=function(){ render(pL,LANGS,curLang,function(c){ setLang(c); close(); }); };
  var drawC=function(){ render(pC,CURR,curCurr,function(c){ setCurr(c); close(); }); };
  bL.addEventListener("click",function(){ open(pL,bL,drawL); });
  bC.addEventListener("click",function(){ open(pC,bC,drawC); });
  pL._input.addEventListener("input",drawL);
  pC._input.addEventListener("input",drawC);
  scrim.addEventListener("click",close);
  document.addEventListener("keydown",function(e){ if(e.key==="Escape") close(); });
  document.addEventListener("click",function(e){
    if(!openPop) return;
    if(openPop.contains(e.target)||openBtn.contains(e.target)) return;
    close();
  },true);
  window.addEventListener("resize",function(){ if(openPop) place(openPop,openBtn); });

  [pL,pC].forEach(function(pop){
    pop.addEventListener("keydown",function(e){
      var opts=[].slice.call(pop._list.querySelectorAll(".fcp-opt"));
      if(!opts.length) return;
      var i=opts.indexOf(document.activeElement);
      if(e.key==="ArrowDown"){ e.preventDefault(); (opts[i+1]||opts[0]).focus(); }
      else if(e.key==="ArrowUp"){ e.preventDefault(); (opts[i-1]||opts[opts.length-1]).focus(); }
      else if(e.key==="Enter"&&i===-1){ e.preventDefault(); opts[0].click(); }
    });
  });

  /* ---------- currency ---------- */
  var MONEY=/\$\s?([0-9][0-9,]*(?:\.[0-9]+)?)\s?([KkMm])?\b/g;
  /* origins keeps each text node's ORIGINAL dollar text. A node is recorded once and
     never re-recorded, otherwise a re-scan would capture already-converted text as the
     original and switching back to USD could not restore it. */
  var origins=(typeof WeakMap!=="undefined")?new WeakMap():null;
  var tracked=[];
  function collect(){
    var skip=/^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|INPUT|SELECT)$/;
    var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{
      acceptNode:function(n){
        if(!n.nodeValue||n.nodeValue.indexOf("$")===-1) return NodeFilter.FILTER_REJECT;
        var p=n.parentNode;
        while(p&&p!==document.body){
          if(skip.test(p.nodeName)) return NodeFilter.FILTER_REJECT;
          if(p.classList&&(p.classList.contains("fcp-bar")||p.classList.contains("fcp-pop"))) return NodeFilter.FILTER_REJECT;
          p=p.parentNode;
        }
        return NodeFilter.FILTER_ACCEPT;
      }});
    var n;
    while((n=w.nextNode())){
      if(origins){ if(origins.has(n)) continue; origins.set(n,n.nodeValue); }
      else { var dup=false; for(var i=0;i<tracked.length;i++) if(tracked[i][0]===n){dup=true;break;} if(dup) continue; }
      tracked.push([n,n.nodeValue]);
    }
    /* drop nodes no longer in the document (Google Translate swaps them out) */
    tracked=tracked.filter(function(t){ return t[0].parentNode; });
  }
  /* "$1,800" reads fine tight; "AED6,606" does not. Space letter-style symbols. */
  function sym(C){ return /[A-Za-z]$/.test(C[2]) ? C[2]+"\u00a0" : C[2]; }
  /* Minor units per currency (yen/won/dong have none). Ask Intl, fall back sanely. */
  var DIGITS={};
  function digitsFor(code){
    if(code in DIGITS) return DIGITS[code];
    var d=2;
    try{ d=new Intl.NumberFormat("en",{style:"currency",currency:code}).resolvedOptions().maximumFractionDigits; }
    catch(e){ d=2; }
    DIGITS[code]=d; return d;
  }
  /* hadDecimals: whether the source figure was written with a decimal point.
     "$0" must not become "¥0.00", and "$1,800" should stay whole. */
  function fmt(v,C,hadDecimals){
    var d=digitsFor(C[0]);
    if(!hadDecimals || v===0 || Math.abs(v)>=1000) d=0;
    else d=Math.min(d,2);
    try{ return sym(C)+v.toLocaleString(undefined,{minimumFractionDigits:d,maximumFractionDigits:d}); }
    catch(e){ return sym(C)+v.toFixed(d); }
  }
  function applyCurr(){
    collect();
    var C=currOf(curCurr);
    tracked.forEach(function(p){
      var node=p[0];
      var orig=origins?origins.get(node):p[1];
      if(orig==null) orig=p[1];
      if(curCurr==="USD"){ if(node.nodeValue!==orig) node.nodeValue=orig; return; }
      var out=orig.replace(MONEY,function(m,num,suf){
        var v=parseFloat(num.replace(/,/g,"")); if(isNaN(v)) return m;
        var mult=suf?(/[Kk]/.test(suf)?1e3:1e6):1;
        var val=v*mult*C[3];
        if(suf){
          var UNITS=[["K",1e3],["M",1e6],["B",1e9],["T",1e12]];
          var ui=/[Kk]/.test(suf)?0:1;
          while(ui<UNITS.length-1 && Math.abs(val)/UNITS[ui][1]>=1000) ui++;
          var sv=val/UNITS[ui][1], sd=(sv===0||Math.abs(sv)>=100)?0:1;
          try{ return sym(C)+sv.toLocaleString(undefined,{maximumFractionDigits:sd})+UNITS[ui][0]; }
          catch(e){ return sym(C)+sv.toFixed(sd)+UNITS[ui][0]; }
        }
        return fmt(val,C,num.indexOf(".")!==-1);
      });
      if(node.nodeValue!==out) node.nodeValue=out;
    });
  }
  function setCurr(c){ curCurr=c; set(LS_C,c); syncCaps(); applyCurr(); }

  /* ---------- language (Google Translate, loaded only when needed) ---------- */
  function setCookie(v){
    var host=location.hostname, d=new Date(Date.now()+31536000000).toUTCString();
    document.cookie="googtrans="+v+";expires="+d+";path=/";
    if(host&&host.indexOf(".")>-1){
      document.cookie="googtrans="+v+";expires="+d+";path=/;domain=."+host;
      document.cookie="googtrans="+v+";expires="+d+";path=/;domain="+host;
    }
  }
  function loadGT(cb){
    if(window.google&&window.google.translate&&window.google.translate.TranslateElement){ cb&&cb(); return; }
    if(document.getElementById("fcp-gt-js")){ cb&&cb(); return; }
    var host=el("div"); host.id="google_translate_element";
    host.style.cssText="position:absolute;left:-9999px;top:-9999px;"; document.body.appendChild(host);
    window.fcpGTInit=function(){
      try{ new google.translate.TranslateElement({pageLanguage:"en",autoDisplay:false},"google_translate_element"); }catch(e){}
      cb&&cb();
    };
    var s=document.createElement("script"); s.id="fcp-gt-js"; s.async=true;
    s.src="https://translate.google.com/translate_a/element.js?cb=fcpGTInit";
    s.onerror=function(){ console.warn("[fcp] translate unavailable offline"); };
    document.body.appendChild(s);
  }
  function setLang(code){
    var prev=curLang;
    curLang=code; set(LS_L,code); syncCaps();
    setCookie(code==="en" ? "/en/en" : "/en/"+code);
    /* Going back to English needs a reload: the widget cannot cleanly un-translate. */
    if(code==="en"){ location.reload(); return; }
    loadGT(function(){
      if(!applyLang(code) && prev!==code){ setTimeout(function(){ applyLang(code); },600); }
    });
  }
  /* Re-apply the stored language on every page load. The googtrans cookie is
     path=/ so it already covers the whole site; Google Translate still has to be
     loaded on each page for it to act on that cookie. */
  /* Google's widget does not reliably act on the googtrans cookie by itself, so we
     also drive its hidden <select> once it exists. The select is injected async,
     hence the retry window. */
  function applyLang(code,tries){
    tries=tries||0;
    var sel=document.querySelector("select.goog-te-combo");
    if(sel){
      if(sel.value!==code){
        sel.value=code;
        sel.dispatchEvent(new Event("change",{bubbles:true}));
      }
      return true;
    }
    if(tries<40){ setTimeout(function(){ applyLang(code,tries+1); },250); }
    return false;
  }
  function restoreLang(){
    if(!curLang || curLang==="en") return;
    setCookie("/en/"+curLang);
    loadGT(function(){ applyLang(curLang); });
    setTimeout(function(){ applyLang(curLang); },1200);
  }

  /* ---------- mount + offset Tilda's fixed header ---------- */
  function offsetFixed(){
    var h=bar.offsetHeight||40;
    /* The stylesheet already reserves --fcp-bar-h on body, so only correct the
       variable if the measured bar differs. No second padding rule is injected. */
    var cur=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--fcp-bar-h"))||0;
    if(Math.abs(cur-h)>0.5) document.documentElement.style.setProperty("--fcp-bar-h",h+"px");
    [].forEach.call(document.querySelectorAll(".t396__artboard,.t-menu__wrapper,.tmenu-mobile,header"),function(n){
      var cs=getComputedStyle(n);
      if(cs.position==="fixed"&&(parseFloat(cs.top)||0)<h+2){ n.style.top=h+"px"; }
    });
  }
  function mount(){
    if(!document.body) return;
    document.body.appendChild(scrim);
    document.body.appendChild(bar);
    document.body.appendChild(pL);
    document.body.appendChild(pC);
    syncCaps(); applyCurr(); restoreLang(); offsetFixed();
    setTimeout(offsetFixed,600); setTimeout(offsetFixed,1800);
    /* Tilda and Google Translate both rewrite text after load; re-scan so prices
       stay in the chosen currency on every page. */
    var rescan=function(){ applyCurr(); };
    setTimeout(rescan,1200); setTimeout(rescan,3000); setTimeout(rescan,6000);
    if(window.MutationObserver){
      var t=null;
      new MutationObserver(function(){
        clearTimeout(t); t=setTimeout(function(){ applyCurr(); },700);
      }).observe(document.body,{childList:true,subtree:true});
    }
    window.addEventListener("resize",offsetFixed);
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",mount);
  else mount();
})();
