/* ============================================================
   TipiStream — shared app logic
   Data kategori & channel terpusat di sini.
   ============================================================ */
(function () {
  "use strict";

  var GROUPS = ["Sepak Bola", "Basket", "Voli", "Motorsport", "Lainnya"];

  var TICKER_MESSAGES = [
    "Selamat datang di TipiStream — live streaming olahraga 24/7",
    "Dukung kami di Trakteer: trakteer.id/Tipistream",
    "Donasi via DANA 085157286617",
    "#StopJudi — Jangan Judi Teros Bang",
    "Pilih kategori lalu pilih channel favoritmu",
    "Jika channel tidak tampil, coba channel lain atau muat ulang player"
  ];

  var CHAT_URL = "https://www5.cbox.ws/box/?boxid=940426&boxtag=rSDm0Y";
  var CHAT_SANDBOX = "allow-same-origin allow-scripts allow-popups allow-pointer-lock allow-forms";
  var DONATE_URL = "https://trakteer.id/Tipistream";
  var TOP_SUPPORTER_URL =
    "https://stream.trakteer.id/top-supporter/index.html?ts_theme=default&ts_sortby=nominal&ts_interval=90&key=trstream-yvOAUf9Z6t5e7jt9qBUw&page_url=trakteer.id/Tipistream&mod=3&hash=zb8r4zrrg6v569an";

  /* ------------------------------------------------------------
     KATEGORI + CHANNEL
     ------------------------------------------------------------ */
  var CATEGORIES = [
    {
      slug: "fdm/bri", name: "Timnas Indonesia", icon: "🔴", group: "Sepak Bola", featured: true,
      channels: ch([
        ["CH 1", "/op/bri/flv1"], ["CH 2", "/op/bri/flv2"], ["CH 3", "/op/bri/flv3"],
        ["CH 4", "/op/bri/flv4"], ["CH 5", "/op/ep/crt1.html"]
      ])
    },
    {
      slug: "fdm/wrc", name: "World Cup", icon: "🏆", group: "Sepak Bola",
      channels: ch([
        ["CH 1", "/op/bri/flv1"], ["CH 2", "/op/bri/flv2"], ["CH 3", "/op/bri/flv3"],
        ["CH 4", "/op/bri/flv4"], ["HD Auto 1", "/op/ep/mpd1"]
      ])
    },
    {
      slug: "wc/wc", name: "Piala Dunia U17", icon: "🌍", group: "Sepak Bola", featured: true,
      channels: ch([
        ["CH 1", "/op/wc/crt1"], ["CH 2", "/op/wc/crt2"],
        ["CH 3", "/op/wc/crt3"], ["CH 4", "/op/wc/crt4"]
      ])
    },
    {
      slug: "wcf/wcf", name: "FIFA Club World Cup", icon: "🌐", group: "Sepak Bola",
      channels: ch([
        ["MAIN 1", "/op/wcf/crt4"], ["MAIN 2", "/op/wcf/crt6"],
        ["MAIN 3", "/op/wcf/crt1"], ["MAIN 4", "/op/wcf/crt2"],
        ["MAIN 5", "/op/wcf/crt3"], ["MAIN 6", "/op/wcf/crt5"]
      ])
    },
    {
      slug: "ep/ep", name: "Premier League", icon: "🦁", group: "Sepak Bola", featured: true,
      channels: ch([
        ["CH 1", "/op/ep/flv1.html"], ["CH 2", "/op/ep/flv2.html"],
        ["CH 3", "/op/ep/flv3.html"], ["CH 4", "/op/ep/flv4.html"],
        ["CH 5", "/op/ep/crt1.html"]
      ])
    },
    {
      slug: "uc/uc", name: "Champions League", icon: "⭐", group: "Sepak Bola", featured: true,
      channels: ch([
        ["AUTO", "/op/ep/mpd2.html"], ["CH 1", "/op/ep/flv1.html"],
        ["CH 2", "/op/ep/flv2.html"], ["CH 3", "/op/ep/flv3.html"],
        ["CH 4", "/op/ep/flv4.html"], ["CH 5", "/op/ep/crt1.html"],
        ["CH 6", "/op/ep/crt2.html"]
      ])
    },
    {
      slug: "uel/uel", name: "Europa League", icon: "🟠", group: "Sepak Bola",
      channels: ch([
        ["MAIN 1", "https://today.tipiku.biz.id/embed.php?url=https%3A%2F%2Ftopembed.pw%2Fchannel%2FTNTSports1%5BUK%5D"],
        ["MAIN 2", "https://wc.tipiku.biz.id/wikiepl"],
        ["CH 1", "/op/eu/crt1"], ["CH 2", "/op/eu/crt2"], ["CH 3", "/op/eu/crt3"]
      ])
    },
    {
      slug: "eu/eu", name: "Nations League & Euro Qualifier", icon: "🏆", group: "Sepak Bola",
      channels: ch([
        ["CH 1", "/op/eu/crt1"], ["CH 2", "/op/eu/crt2"], ["CH 3", "/op/eu/crt3"],
        ["CH 4", "/op/eu/crt4"], ["CH 5", "/op/eu/crt5"], ["CH 6", "/op/eu/crt6"],
        ["CH 7", "/op/eu/crt7"], ["CH 8", "/op/eu/crt8"], ["CH 9", "/op/eu/crt9"],
        ["CH 10", "/op/eu/crt10"]
      ])
    },
    {
      slug: "bri/bri", name: "Liga 1 Indonesia", icon: "🔵", group: "Sepak Bola", featured: true,
      channels: ch([
        ["CH 1", "/op/bri/flv1"], ["CH 2", "/op/bri/flv2"], ["CH 3", "/op/bri/flv3"],
        ["CH 4", "/op/bri/flv4"], ["CH 5", "/op/ep/crt1.html"]
      ])
    },
    {
      slug: "bds/bds", name: "Bundesliga", icon: "⚫", group: "Sepak Bola",
      channels: ch([
        ["MAIN 1", "/op/bds/ina6"], ["CH 1", "/op/bds/ina"], ["CH 2", "/op/bds/ina2"],
        ["CH 3", "/op/bds/ina3"], ["CH 4", "/op/bds/ina4"], ["CH 5", "/op/bds/ina5"]
      ])
    },
    {
      slug: "it/it", name: "Serie A", icon: "🟩", group: "Sepak Bola",
      channels: ch([
        ["MAIN 1", "https://wc.tipiku.biz.id/wikiseria"], ["CH 1", "/op/it/crt1"],
        ["CH 2", "/op/it/crt2"], ["CH 3", "/op/it/crt3"], ["CH 4", "/op/it/crt4"],
        ["CH 5", "/op/it/crt5"]
      ])
    },
    {
      slug: "sp/sp", name: "LaLiga", icon: "🟨", group: "Sepak Bola",
      channels: ch([
        ["CH 1", "/op/sp/crt1"], ["CH 2", "/op/sp/crt2"],
        ["CH 3", "/op/sp/crt3"], ["CH 4", "/op/sp/crt4"]
      ])
    },
    {
      slug: "spl/spl", name: "Saudi Pro League", icon: "🟩", group: "Sepak Bola",
      channels: ch([
        ["CH 1", "/op/spl/ina"], ["CH 2", "/op/spl/ina2"], ["CH 3", "/op/spl/ina3"]
      ])
    },
    {
      slug: "mas/mas", name: "Malaysia Super League", icon: "🟦", group: "Sepak Bola",
      channels: ch([
        ["CH 1", "/op/fdm/ina"], ["CH 2", "/op/fdm/ina2"], ["CH 3", "/op/fdm/ina3"],
        ["CH 4", "/op/fdm/ina4"], ["CH 5", "/op/fdm/ina5"]
      ])
    },
    {
      slug: "gvid/gvid", name: "Liga 2 Indonesia", icon: "🟢", group: "Sepak Bola",
      channels: ch([
        ["MAIN 1", "/op/vid/17870"], ["CH 1", "/op/gvid/crt1"], ["CH 2", "/op/gvid/crt2"]
      ])
    },
    {
      slug: "cn/cn", name: "Conmebol Qualifiers", icon: "🌎", group: "Sepak Bola",
      channels: ch([
        ["CH 1", "/op/cn/crt1"], ["CH 2", "/op/cn/crt2"], ["CH 3", "/op/cn/crt3"],
        ["CH 4", "/op/cn/crt4"], ["CH 5", "/op/cn/crt5"], ["CH 6", "/op/cn/crt6"],
        ["CH 7", "/op/cn/crt7"], ["CH 8", "/op/cn/crt8"], ["CH 9", "/op/cn/crt9"]
      ])
    },
    {
      slug: "af/af", name: "AFF Futsal", icon: "🥅", group: "Sepak Bola",
      channels: ch([
        ["CH 1", "/op/af/ina"], ["CH 2", "/op/af/ina2"], ["CH 3", "/op/af/ina3"]
      ])
    },
    {
      slug: "afc/afc", name: "AFC Asian Cup Qual.", icon: "🏅", group: "Sepak Bola",
      channels: ch([
        ["CH TEST", "https://wc.tipiku.biz.id/wikiwcafc"],
        ["CH 1", "/op/afc/crt1"], ["CH 2", "/op/afc/crt2"], ["CH 3", "/op/afc/crt3"],
        ["CH 4", "/op/afc/crt4"], ["CH 5", "/op/afc/crt5"], ["CH 6", "/op/afc/crt6"]
      ])
    },
    {
      slug: "fdm/fdm", name: "ACL", icon: "🥇", group: "Sepak Bola",
      channels: ch([
        ["CH 1", "/op/fdm/flv1"], ["CH 2", "/op/fdm/crt2"],
        ["CH 3", "/op/fdm/flv3"], ["CH 4", "/op/fdm/flv4"]
      ])
    },
    {
      slug: "fm/fm", name: "Friendly Match", icon: "🤝", group: "Sepak Bola",
      channels: ch([["CH 1", "/op/fdm/ina"], ["CH 2", "/op/fdm/ina2"]])
    },
    {
      slug: "futs/futs", name: "Timnas Matchday", icon: "📅", group: "Sepak Bola",
      channels: ch([["CH 1", "/op/ev/crt1"]])
    },
    {
      slug: "ev/ev", name: "Timnas Day", icon: "🦅", group: "Sepak Bola",
      channels: ch([
        ["CH 1", "https://wikisport.cc/play?token=H5YIXq1AJaKf55uUwy2UOGpHU04rNUZla0czUTFhaXhCdFFiNXlia3JiR0JnZGZpMHp4SGMxY2tsaFE1M3NBQ3dQaVdmOTI5WDNhMnI1bzE0MUh3SmFBdjJweTk"],
        ["CH 2", "https://demo.crunchyrolll.xyz/?url=https%3A%2F%2Fhotlivezz179536519.akainu.xyz%2Flive%2FZ3HD.flv%3Fexpire%3D1765558214%26sign%3Dd768af3efc7f022c9f744f274c0cefba&df=https%3A%2F%2Fhotlivezz179266008.akainu.xyz%2FkZSMxeU6sPjzoyRSQG0XaQ%2FFv2lucGIbhPi2caWYvF5Lg%2F1765558214532%2Flive%2FZ3HD%2Fplaylist.m3u8&n=c7350e10bbcd8ca&id=23xmvkh60v9wqg8&t=br&autoplay=1&siteid=tc"],
        ["CH 3", "https://demo.crunchyrolll.xyz/?url=https%3A%2F%2Fhotlivezz179266008.akainu.xyz%2FkZSMxeU6sPjzoyRSQG0XaQ%2FFv2lucGIbhPi2caWYvF5Lg%2F1765558214532%2Flive%2FZ3HD%2Fplaylist.m3u8&df=https%3A%2F%2Fhotlivezz179266008.akainu.xyz%2FkZSMxeU6sPjzoyRSQG0XaQ%2FFv2lucGIbhPi2caWYvF5Lg%2F1765558214532%2Flive%2FZ3HD%2Fplaylist.m3u8&n=a8e72024714c868&id=23xmvkh60v9wqg8&t=br&autoplay=1&siteid=tc"],
        ["CH 4", "https://hsif.btyff.com/video4.html?h5=1&autoplay=0&url=https://hls.suanzsd6.com/sd-6MvYLyM5qYMNhe8K5h.m3u8?txSecret=4aba65e736484e2f2a31e7eb114fda68&txTime=693D4FDB"]
      ])
    },
    {
      slug: "event/event", name: "Football Live", icon: "📡", group: "Sepak Bola",
      channels: ch([
        ["CH 1", "/op/wc/crt1"], ["CH 2", "/op/wc/crt2"], ["CH 3", "/op/wc/crt3"],
        ["CH 4", "/op/wc/crt4"], ["CH 5", "/op/wc/crt5"], ["CH 6", "/op/wc/crt6"],
        ["CH 7", "/op/wc/crt7"], ["CH 8", "/op/wc/crt8"], ["CH 9", "/op/wc/crt9"]
      ])
    },
    {
      slug: "evw/evw", name: "ASEAN U-23 Championship", icon: "🌏", group: "Sepak Bola",
      channels: ch([
        ["CH 1", "/op/evw/crt1"], ["CH 2", "/op/evw/crt2"],
        ["CH 3", "https://wc.tipiku.biz.id/jalafinal"]
      ])
    },
    {
      slug: "tc/tc", name: "Timnas Putri", icon: "👩", group: "Sepak Bola",
      channels: ch([
        ["YT 1", "/yt/aff1"], ["MAIN 1", "/op/wc/gcdn"], ["MAIN 2", "/op/wc/gcdnb"]
      ])
    },
    {
      slug: "nba/nba", name: "NBA", icon: "🏀", group: "Basket", featured: true,
      channels: ch([["MAIN 1", "/op/nba/ina"], ["MAIN 2", "/op/nba/ina2"]])
    },
    {
      slug: "fiba/fiba", name: "FIBA Asia Cup", icon: "🏀", group: "Basket",
      channels: ch([["CH 1", "/op/fiba/ina"], ["CH 2", "/op/fiba/ina2"]])
    },
    {
      slug: "pro/pro", name: "ProLiga Voli", icon: "🏐", group: "Voli",
      channels: ch([["CH 1", "/op/kv/ina3"]])
    },
    {
      slug: "kovo/kovo", name: "Korea Volleyball", icon: "🏐", group: "Voli",
      channels: ch([
        ["CH 1", "/op/kv/ina"], ["CH 2", "/op/kv/ina2"], ["CH 3", "/op/kv/ina3"]
      ])
    },
    {
      slug: "fone/fone", name: "F1", icon: "🏎️", group: "Motorsport",
      channels: ch([
        ["MAIN 1", "/op/fone/crt1"], ["MAIN 2", "https://wc.tipiku.biz.id/wikif"]
      ])
    },
    {
      slug: "motogp/mgp", name: "MotoGP", icon: "🏍️", group: "Motorsport",
      channels: ch([
        ["CH 1", "/op/mgp/crt1"], ["CH 2", "/op/mgp/crt2"], ["CH 3", "/op/mgp/crt3"]
      ])
    },
    {
      slug: "bd/bd", name: "Badminton", icon: "🏸", group: "Lainnya",
      channels: ch([
        ["CH 1", "/op/bd/crt1"], ["CH 2", "/op/bd/crt2"],
        ["CH 3", "/op/bd/crt3"], ["CH 4", "/op/bd/crt4"]
      ])
    },
    {
      slug: "ufc/ufc", name: "UFC", icon: "🥊", group: "Lainnya",
      channels: ch([
        ["CH 1", "/op/ufc/crt1"], ["CH 2", "/op/ufc/crt2"], ["CH 3", "/op/ufc/crt3"]
      ])
    },
    {
      slug: "wwe/wwe", name: "WWE", icon: "🤼", group: "Lainnya", featured: true,
      channels: ch([["MAIN 1", "/op/wwe/ina"], ["MAIN 2", "/op/wwe/ina2"]])
    }
  ];

  function ch(list) {
    return list.map(function (item) { return { label: item[0], url: item[1] }; });
  }

  /* ------------------------------------------------------------
     HELPERS
     ------------------------------------------------------------ */
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function findBySlug(slug) {
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].slug === slug) return CATEGORIES[i];
    }
    return null;
  }

  function pageUrl(slug) {
    return "/" + slug;
  }

  function store(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }
  function read(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }

  /* ------------------------------------------------------------
     CLOCK (WIB)
     ------------------------------------------------------------ */
  function startClock() {
    var el = $("#clock");
    if (!el) return;
    var fmt;
    try {
      fmt = new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", hour12: false
      });
    } catch (e) { fmt = null; }
    function tick() {
      var now = new Date();
      if (fmt) {
        el.textContent = fmt.format(now) + " WIB";
      } else {
        el.textContent = now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0") + " WIB";
      }
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ------------------------------------------------------------
     TICKER (running text)
     ------------------------------------------------------------ */
  function buildTicker() {
    $$("[data-ticker]").forEach(function (track) {
      var item = TICKER_MESSAGES.map(function (msg) {
        return '<span class="ticker__item">' + esc(msg) + "</span>";
      }).join("");
      track.innerHTML = item + item;
    });
  }

  /* ------------------------------------------------------------
     HOME
     ------------------------------------------------------------ */
  function renderHome() {
    var sectionsEl = $("#categorySections");
    if (!sectionsEl) return;

    var totalChannels = CATEGORIES.reduce(function (sum, c) { return sum + c.channels.length; }, 0);
    var statCats = $("#statCats");
    var statChannels = $("#statChannels");
    if (statCats) statCats.textContent = CATEGORIES.length;
    if (statChannels) statChannels.textContent = totalChannels;

    var html = "";
    GROUPS.forEach(function (group) {
      var items = CATEGORIES.filter(function (c) { return c.group === group; });
      if (!items.length) return;
      html += '<section class="section" data-group="' + esc(group) + '">' +
        '<div class="section__head"><h2>' + esc(group) + "</h2>" +
        '<span class="count-pill">' + items.length + "</span></div>" +
        '<div class="category-grid">' +
        items.map(function (c) {
          return '<a class="cat-card" href="' + pageUrl(c.slug) + '" data-name="' +
            esc(c.name.toLowerCase()) + '" data-group="' + esc(group) + '">' +
            '<span class="cat-card__icon" aria-hidden="true">' + c.icon + "</span>" +
            '<span class="cat-card__body">' +
              '<span class="cat-card__name">' + esc(c.name) + "</span>" +
              '<span class="cat-card__meta">' + c.channels.length + " channel</span>" +
            "</span>" +
            '<span class="cat-card__arrow" aria-hidden="true">' + arrowIcon() + "</span>" +
          "</a>";
        }).join("") +
        "</div></section>";
    });
    sectionsEl.innerHTML = html;

    renderFeatured();
    setupFilters();

    var listEl = $("#homeTotal");
    if (listEl) listEl.textContent = totalChannels;
  }

  function renderFeatured() {
    var el = $("#featuredRow");
    if (!el) return;
    el.innerHTML = CATEGORIES.filter(function (c) { return c.featured; })
      .map(function (c) {
        return '<a class="chip" href="' + pageUrl(c.slug) + '">' + c.icon + " " + esc(c.name) + "</a>";
      }).join("");
  }

  function setupFilters() {
    var searchEl = $("#catSearch");
    var chips = $$("[data-filter]");
    var activeGroup = "all";

    function apply() {
      var term = (searchEl && searchEl.value ? searchEl.value : "").trim().toLowerCase();
      var anyVisible = false;

      $$(".section", $("#categorySections")).forEach(function (section) {
        var groupMatch = activeGroup === "all" || section.getAttribute("data-group") === activeGroup;
        var visibleInSection = 0;
        $$(".cat-card", section).forEach(function (card) {
          var nameMatch = !term || card.getAttribute("data-name").indexOf(term) !== -1;
          var show = groupMatch && nameMatch;
          card.style.display = show ? "" : "none";
          if (show) visibleInSection++;
        });
        section.style.display = visibleInSection ? "" : "none";
        if (visibleInSection) anyVisible = true;
      });

      var empty = $("#catEmpty");
      if (empty) empty.style.display = anyVisible ? "none" : "";
    }

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("is-active"); });
        chip.classList.add("is-active");
        activeGroup = chip.getAttribute("data-filter");
        apply();
      });
    });

    if (searchEl) searchEl.addEventListener("input", apply);
    apply();
  }

  /* ------------------------------------------------------------
     CATEGORY / WATCH PAGE
     ------------------------------------------------------------ */
  function mountCategory(slug) {
    var cat = findBySlug(slug);
    var listEl = $("#chList");
    var player = $("#player");
    var loader = $("#playerLoader");
    var nowEl = $("#nowPlaying");
    var openBtn = $("#btnOpen");
    var reloadBtn = $("#btnReload");
    var fullBtn = $("#btnFull");
    var categoryName = cat ? cat.name : slug;
    var channels = cat ? cat.channels : [];

    document.title = categoryName + " — Live Streaming | TipiStream";
    $$("[data-category-name]").forEach(function (el) { el.textContent = categoryName; });

    var countEl = $("#chCount");
    if (countEl) countEl.textContent = channels.length;
    var countSide = $("#chCountSide");
    if (countSide) countSide.textContent = channels.length + " ch";

    if (!listEl) return;

    if (!channels.length) {
      listEl.innerHTML = '<div class="ch-list--empty">Belum ada channel untuk kategori ini.</div>';
      if (loader) loader.classList.add("is-hidden");
      return;
    }

    listEl.innerHTML = channels.map(function (channel, index) {
      var tag = streamType(channel.url);
      return '<div class="ch-item" role="button" tabindex="0" data-index="' + index + '">' +
        '<span class="ch-item__num">' + (index + 1) + "</span>" +
        '<span class="ch-item__body">' +
          '<span class="ch-item__label">' + esc(channel.label) + "</span>" +
          '<span class="ch-item__tag">' + tag + "</span>" +
        "</span>" +
        '<span class="ch-item__play">' + playIcon() + " Tonton</span>" +
        "</div>";
    }).join("");

    var items = $$(".ch-item", listEl);
    var currentIndex = -1;

    function selectChannel(index, options) {
      var channel = channels[index];
      if (!channel) return;
      options = options || {};

      items.forEach(function (item, i) {
        var active = i === index;
        item.classList.toggle("is-active", active);
        if (active) item.setAttribute("aria-current", "true");
        else item.removeAttribute("aria-current");
      });

      nowEl.textContent = channel.label + " · " + categoryName;
      if (openBtn) openBtn.setAttribute("href", channel.url);

      if (loader) loader.classList.remove("is-hidden");

      try { player.src = channel.url; } catch (e) { /* ignore */ }

      currentIndex = index;
      store("tipi:last:" + slug, String(index));

      if (options.scroll) {
        var el = items[index];
        if (el && el.scrollIntoView) el.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }

    if (player) {
      player.addEventListener("load", function () {
        setTimeout(function () { if (loader) loader.classList.add("is-hidden"); }, 350);
      });
    }

    items.forEach(function (item) {
      item.addEventListener("click", function () {
        selectChannel(Number(item.getAttribute("data-index")), { scroll: true });
      });
      item.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectChannel(Number(item.getAttribute("data-index")), { scroll: true });
        }
      });
    });

    if (reloadBtn) {
      reloadBtn.addEventListener("click", function () {
        if (currentIndex < 0) return;
        var url = channels[currentIndex].url;
        if (loader) loader.classList.remove("is-hidden");
        player.src = "about:blank";
        setTimeout(function () { player.src = url; }, 120);
      });
    }

    if (fullBtn) {
      fullBtn.addEventListener("click", function () {
        var shell = $(".player-shell");
        if (!shell) return;
        if (document.fullscreenElement) {
          if (document.exitFullscreen) document.exitFullscreen();
        } else if (shell.requestFullscreen) {
          shell.requestFullscreen().catch(function () {});
        }
      });
    }

    var copyBtn = $("#btnCopy");
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        if (currentIndex < 0) return;
        var channel = channels[currentIndex];
        var link = location.origin + pageUrl(slug) + "?ch=" + (currentIndex + 1);
        var done = function () { toast("Link channel disalin"); };
        var fail = function () { toast("Gagal menyalin link"); };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(link).then(done).catch(fail);
        } else {
          try {
            var helper = document.createElement("textarea");
            helper.value = link;
            helper.style.position = "fixed";
            helper.style.opacity = "0";
            document.body.appendChild(helper);
            helper.select();
            document.execCommand("copy");
            document.body.removeChild(helper);
            done();
          } catch (e) { fail(); }
        }
      });
    }

    var saved = parseInt(read("tipi:last:" + slug) || "0", 10);
    if (isNaN(saved) || saved < 0 || saved >= channels.length) saved = 0;

    var fromUrl = 0;
    try {
      var param = new URLSearchParams(location.search).get("ch");
      if (param) {
        fromUrl = parseInt(param, 10) - 1;
      }
    } catch (e) { /* ignore */ }
    if (!isNaN(fromUrl) && fromUrl >= 0 && fromUrl < channels.length) saved = fromUrl;

    selectChannel(saved);
  }

  function toast(message) {
    var el = document.getElementById("tipiToast");
    if (!el) {
      el = document.createElement("div");
      el.id = "tipiToast";
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add("is-visible");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function () {
      el.classList.remove("is-visible");
    }, 1800);
  }

  /* ------------------------------------------------------------
     ICONS
     ------------------------------------------------------------ */
  function streamType(url) {
    if (/\.m3u8(\?|$)/i.test(url)) return "HLS";
    if (/\.flv(\?|$)/i.test(url)) return "FLV";
    if (/\.mpd(\?|$)/i.test(url)) return "DASH";
    if (/^https?:\/\//i.test(url)) return "EMBED";
    return "HTML";
  }

  function arrowIcon() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';
  }
  function playIcon() {
    return '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
  }

  /* ------------------------------------------------------------
     BOOT
     ------------------------------------------------------------ */
  function boot() {
    startClock();
    buildTicker();

    var body = document.body;
    var page = body.getAttribute("data-page");

    if (page === "home") {
      renderHome();
    } else if (page === "category") {
      mountCategory(body.getAttribute("data-category") || "");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.TipiStream = {
    mountCategory: mountCategory,
    renderHome: renderHome,
    categories: CATEGORIES,
    chatUrl: CHAT_URL,
    chatSandbox: CHAT_SANDBOX,
    donateUrl: DONATE_URL,
    topSupporterUrl: TOP_SUPPORTER_URL
  };
})();
