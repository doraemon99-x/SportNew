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
      slug: "football/football", name: "Football Live", icon: "📡", group: "Sepak Bola",
      featured: true, type: "live", channels: []
    },
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

  /* ------------------------------------------------------------
     LIVE FEED (oneball)
     Sumber: https://oneball.to/list.json — CORS terbuka (ACAO *).
     Format waktu "YYYY-MM-DD HH:MM:SS" dalam WIB (+7).
     Hanya pertandingan yang punya signals[] yang bisa ditonton.
     ------------------------------------------------------------ */
  var FEED_URL = "https://oneball.to/list.json";
  var FEED_TTL = 90 * 1000;          // cache 90 detik
  var MATCH_WINDOW_AFTER = 3 * 60;   // menit: masih dianggap live 3 jam setelah kickoff
  var LIVE_FOOTBALL_SLUG = "football/football";

  var FOOTBALL_OK = [
    "league", "liga", "serie", "bundesliga", "eredivisie", "ligue", "premier",
    "champions", "europa", "conference", "copa", "cup", "uefa", "afc", "caf",
    "conmebol", "concacaf", "fifa", "qualif", "ekstraklasa", "superliga",
    "allsvenskan", "superettan", "veikkausliiga", "division", "divisjon",
    "primera", "segunda", "prva liga", "1.liga", "super lig", "soccer",
    "football", "eerste divisie", "super division", "mls", "youth league",
    "j2 league", "j3 league", "pro league", "a-league"
  ];
  /* Dicek lebih dulu supaya "College Football"/"NFL" tidak ikut lolos. */
  var FOOTBALL_NOT = [
    "basketball", "basketbol", "basket", "nba", "nhl", "nfl",
    "college football", "canadian football", "wrestling", "vtb united",
    "adriatic basketball", "ncaa", "national collegiate", "fiba",
    "novo basquete", "basquete", "baloncesto", "korean basketball",
    "philippine basketball", "women's national basketball", "ncaa"
  ];

  var feedState = { at: 0, promise: null, matches: null, error: null };

  function ch(list) {
    return list.map(function (item) { return { label: item[0], url: item[1] }; });
  }

  function cardMeta(cat) {
    if (cat.type === "live") return "jadwal & stream live";
    return cat.channels.length + " channel";
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
     LIVE FEED — ambil, saring, dan ubah ke bentuk channel
     ------------------------------------------------------------ */
  function isFootball(league) {
    var n = String(league || "").toLowerCase();
    for (var i = 0; i < FOOTBALL_NOT.length; i++) {
      if (n.indexOf(FOOTBALL_NOT[i]) !== -1) return false;
    }
    for (var j = 0; j < FOOTBALL_OK.length; j++) {
      if (n.indexOf(FOOTBALL_OK[j]) !== -1) return true;
    }
    return false;
  }

  /* "2026-11-02 19:30:00" adalah jam dinding WIB, bukan UTC. */
  function parseMatchTime(value) {
    var m = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?/.exec(String(value || ""));
    if (!m) return null;
    var iso = m[1] + "-" + m[2] + "-" + m[3] + "T" + m[4] + ":" + m[5] + ":" + (m[6] || "00") + "+07:00";
    var d = new Date(iso);
    return isNaN(d.getTime()) ? null : d;
  }

  function matchStatus(match, now) {
    var start = match.start;
    if (!start) return { state: "unknown", label: "Jadwal" };
    var diffMin = (start.getTime() - now.getTime()) / 60000;
    if (diffMin > MATCH_WINDOW_AFTER) {
      return { state: "later", label: "Belum mulai" };
    }
    if (diffMin > 0) {
      return { state: "soon", label: "Mulai " + clockText(start) };
    }
    /* Masih dianggap live sampai MATCH_WINDOW_AFTER menit setelah kickoff. */
    if (-diffMin <= MATCH_WINDOW_AFTER) {
      return { state: "live", label: "LIVE" };
    }
    return { state: "ended", label: "Selesai" };
  }

  /* Semua jam ditampilkan dalam WIB walau perangkat pengunjung di zona lain. */
  var WIB_FMT = null;
  try {
    WIB_FMT = new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", hour12: false
    });
  } catch (e) { WIB_FMT = null; }

  var WIB_DAY_FMT = null;
  try {
    WIB_DAY_FMT = new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta", year: "numeric", month: "2-digit", day: "2-digit"
    });
  } catch (e) { WIB_DAY_FMT = null; }

  function clockText(date) {
    if (!date) return "";
    if (WIB_FMT) {
      var parts = WIB_FMT.formatToParts(date);
      var hh = "", mm = "";
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].type === "hour") hh = parts[i].value;
        if (parts[i].type === "minute") mm = parts[i].value;
      }
      if (hh) return hh + ":" + mm;
    }
    /* fallback: geser ke +7 dari UTC */
    var w = new Date(date.getTime() + 7 * 3600000);
    return String(w.getUTCHours()).padStart(2, "0") + ":" + String(w.getUTCMinutes()).padStart(2, "0");
  }

  /* Selisih hari kalender WIB antara tanggal dan "sekarang". */
  function wibDayIndex(date) {
    if (WIB_DAY_FMT) {
      var p = WIB_DAY_FMT.formatToParts(date), y = 0, m = 0, d = 0;
      for (var i = 0; i < p.length; i++) {
        if (p[i].type === "year") y = Number(p[i].value);
        if (p[i].type === "month") m = Number(p[i].value);
        if (p[i].type === "day") d = Number(p[i].value);
      }
      return Date.UTC(y, m - 1, d) / 86400000;
    }
    return Math.floor((date.getTime() + 7 * 3600000) / 86400000);
  }

  function dayText(date, now) {
    if (!date) return "";
    var days = wibDayIndex(date) - wibDayIndex(now || new Date());
    if (days === 0) return "Hari ini";
    if (days === 1) return "Besok";
    if (days === -1) return "Kemarin";
    var names = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    /* nama hari & tanggal dalam WIB */
    var shifted = new Date(date.getTime() + 7 * 3600000);
    return names[shifted.getUTCDay()] + ", " + shifted.getUTCDate() + "/" + (shifted.getUTCMonth() + 1);
  }

  function loadFeed() {
    var now = Date.now();
    if (feedState.matches && now - feedState.at < FEED_TTL) {
      return Promise.resolve(feedState.matches);
    }
    if (feedState.promise) return feedState.promise;

    feedState.promise = fetch(FEED_URL, { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (rows) {
        if (!Array.isArray(rows)) throw new Error("Format feed tidak dikenal");
        var matches = [];
        rows.forEach(function (row) {
          if (!row || !isFootball(row.league_name)) return;
          var signals = Array.isArray(row.signals) ? row.signals : [];
          if (!signals.length) return;               /* belum ada stream */
          var urls = signals
            .filter(function (s) { return s && s.url; })
            .map(function (s, i) {
              return { label: s.label || ("CH " + (i + 1)), url: s.url };
            });
          if (!urls.length) return;
          matches.push({
            id: String(row.nami_id || ""),
            league: String(row.league_name || ""),
            home: String(row.home_team || ""),
            away: String(row.away_team || ""),
            rawTime: String(row.match_time || ""),
            start: parseMatchTime(row.match_time),
            channels: urls
          });
        });
        matches.sort(function (a, b) {
          return (a.start ? a.start.getTime() : 0) - (b.start ? b.start.getTime() : 0);
        });
        feedState.matches = matches;
        feedState.at = Date.now();
        feedState.error = null;
        feedState.promise = null;
        return matches;
      })
      .catch(function (err) {
        feedState.error = err;
        feedState.promise = null;
        throw err;
      });

    return feedState.promise;
  }

  function leagueSlug(league) {
    return String(league || "").toLowerCase().trim();
  }

  function matchHref(match) {
    return "/" + LIVE_FOOTBALL_SLUG + "?m=" + encodeURIComponent(match.id);
  }

  /* Pertandingan -> daftar channel (satu channel per signal). */
  function channelsFromMatches(matches, now) {
    var list = [];
    matches.forEach(function (match) {
      var status = matchStatus(match, now || new Date());
      match.channels.forEach(function (signal, i) {
        var prefix = i === 0 ? "" : " · " + signal.label;
        list.push({
          label: match.home + " vs " + match.away + prefix,
          url: "/hls.html?url=" + encodeURIComponent(signal.url),
          match: match,
          status: status,
          isLive: status.state === "live"
        });
      });
    });
    return list;
  }

  /* ------------------------------------------------------------
     CLOCK (WIB)
     ------------------------------------------------------------ */
  function startClock() {
    var el = $("#clock");
    if (!el) return;
    /* clockText() sudah mengunci tampilan ke WIB, apa pun zona waktu perangkat. */
    function tick() {
      el.textContent = clockText(new Date()) + " WIB";
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
     Fokus utama: papan pertandingan dari feed. Daftar kategori
     diringkas jadi satu blok lipat di bagian bawah.
     ------------------------------------------------------------ */
  var HOME_FILTERS = [
    { key: "live", label: "● Live" },
    { key: "today", label: "Hari ini" },
    { key: "tomorrow", label: "Besok" },
    { key: "all", label: "Semua jadwal" }
  ];

  /* Chip liga mengikuti isi feed; liga langka tetap tampil lewat scroll. */
  var LEAGUE_CHIP_MAX = 40;

  function renderHome() {
    renderHomeBoard();
    renderHomeCategories();
  }

  function sortMatches(matches, now) {
    return matches.slice().sort(function (a, b) {
      var sa = matchStatus(a, now), sb = matchStatus(b, now);
      if (sa.state !== sb.state) return STATUS_ORDER[sa.state] - STATUS_ORDER[sb.state];
      return (a.start ? a.start.getTime() : 0) - (b.start ? b.start.getTime() : 0);
    });
  }

  function setStat(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function renderHomeBoard() {
    var board = $("#matchBoard");
    if (!board) return;

    var filterBar = $("#matchFilters");
    var leagueBar = $("#leagueFilters");
    var searchEl = $("#matchSearch");
    var active = "all";
    var league = "";               /* "" = semua liga */
    var leagueSig = "";
    var term = "";

    function setActive(key) {
      active = key;
      if (!filterBar) return;
      $$("[data-mfilter]", filterBar).forEach(function (b) {
        b.classList.toggle("is-active", b.getAttribute("data-mfilter") === active);
      });
    }

    if (filterBar) {
      filterBar.innerHTML = HOME_FILTERS.map(function (f) {
        return '<button type="button" class="chip' + (f.key === active ? " is-active" : "") +
          '" data-mfilter="' + f.key + '">' + f.label + "</button>";
      }).join("");

      filterBar.addEventListener("click", function (event) {
        var btn = event.target.closest("[data-mfilter]");
        if (!btn) return;
        setActive(btn.getAttribute("data-mfilter"));
        paint();
      });
    }

    if (leagueBar) {
      leagueBar.addEventListener("click", function (event) {
        var btn = event.target.closest("[data-league]");
        if (!btn) return;
        var picked = btn.getAttribute("data-league");
        league = picked === league ? "" : picked;   /* klik lagi = lepas filter */
        if (league) setActive("all");               /* tampilkan semua jadwal liga itu */
        paint();
      });
    }

    if (searchEl) {
      searchEl.addEventListener("input", function () {
        term = searchEl.value.trim().toLowerCase();
        paint();
      });
    }

    function matchesFilter(match, now) {
      if (!match.start) return active === "all";
      var state = matchStatus(match, now).state;
      if (active === "live") return state === "live";
      if (active === "today") return wibDayIndex(match.start) === wibDayIndex(now);
      if (active === "tomorrow") return wibDayIndex(match.start) === wibDayIndex(now) + 1;
      return true;
    }

    function inLeague(match) {
      return !league || match.league === league;
    }

    function matchesTerm(match) {
      if (!term) return true;
      return (match.home + " " + match.away + " " + match.league).toLowerCase().indexOf(term) !== -1;
    }

    function emptyText() {
      if (term) return "Tidak ada pertandingan yang cocok dengan pencarian.";
      if (league) {
        var inLeagueCount = (feedState.matches || []).filter(function (m) {
          return inLeague(m) && matchesFilter(m, new Date());
        }).length;
        if (!inLeagueCount) {
          if (active === "live") return "Belum ada pertandingan live di " + league + ". Coba filter Semua.";
          if (active === "today") return "Tidak ada jadwal " + league + " hari ini.";
          if (active === "tomorrow") return "Tidak ada jadwal " + league + " besok.";
          return "Belum ada pertandingan di " + league + ".";
        }
      }
      if (active === "live") return "Belum ada pertandingan live saat ini. Coba filter Hari ini.";
      if (active === "tomorrow") return "Belum ada jadwal untuk besok.";
      if (active === "today") return "Tidak ada pertandingan hari ini.";
      return "Belum ada pertandingan dengan link streaming.";
    }

    /* Chip liga dibuat dari isi feed (liga terbanyak lebih dulu). */
    function paintLeagues(all, now) {
      if (!leagueBar) return;
      var byLeague = {};
      var order = [];
      all.forEach(function (m) {
        var name = m.league || "Lainnya";
        if (!byLeague[name]) { byLeague[name] = { total: 0, live: 0 }; order.push(name); }
        byLeague[name].total++;
        if (matchStatus(m, now).state === "live") byLeague[name].live++;
      });
      order.sort(function (a, b) {
        if (byLeague[a].live !== byLeague[b].live) return byLeague[b].live - byLeague[a].live;
        if (byLeague[a].total !== byLeague[b].total) return byLeague[b].total - byLeague[a].total;
        return a.localeCompare(b);
      });

      /* Liga pilihan hilang dari feed (rotasi stream) -> kembalikan ke semua liga. */
      if (league && !byLeague[league]) league = "";

      var names = order.slice(0, LEAGUE_CHIP_MAX);
      /* Liga yang sedang dipilih tetap tampil walau di luar batas. */
      if (league && names.indexOf(league) === -1) names.unshift(league);

      var sig = names.join("|") + "#" +
        names.map(function (n) { return byLeague[n].live + "/" + byLeague[n].total; }).join("|");

      /* Daftar chip tidak berubah -> cukup tukar kelas aktif. Render ulang
         innerHTML akan mengembalikan posisi geser bar ke awal. */
      if (sig === leagueSig) {
        $$("[data-league]", leagueBar).forEach(function (b) {
          b.classList.toggle("is-active", b.getAttribute("data-league") === league);
        });
        return;
      }
      leagueSig = sig;

      leagueBar.innerHTML =
        '<button type="button" class="chip chip--all' + (league ? "" : " is-active") +
          '" data-league="">Semua liga<span class="chip__count">' + all.length + "</span></button>" +
        names.map(function (name) {
          var info = byLeague[name];
          return '<button type="button" class="chip' + (name === league ? " is-active" : "") +
            '" data-league="' + esc(name) + '" title="' + esc(name) + '">' +
            (info.live ? '<span class="chip__dot" aria-hidden="true"></span>' : "") +
            esc(name) + '<span class="chip__count">' + info.total + "</span>" +
          "</button>";
        }).join("");
    }

    function paint() {
      var now = new Date();
      var all = feedState.matches || [];

      var liveCount = all.filter(function (m) { return matchStatus(m, now).state === "live"; }).length;
      var todayCount = all.filter(function (m) {
        return m.start && wibDayIndex(m.start) === wibDayIndex(now);
      }).length;

      setStat("statLive", liveCount);
      setStat("statToday", todayCount);
      setStat("statTotal", all.length);

      paintLeagues(all, now);

      var list = all.filter(function (match) {
        return inLeague(match) && matchesFilter(match, now) && matchesTerm(match);
      });

      var totalEl = $("#matchTotal");
      if (totalEl) totalEl.textContent = list.length;

      if (!list.length) {
        board.innerHTML = '<div class="empty-state empty-state--sm">' + esc(emptyText()) + "</div>";
        return;
      }

      board.innerHTML = '<div class="match-grid">' +
        sortMatches(list, now).map(function (match) { return matchCardHtml(match, now); }).join("") +
        "</div>";
    }

    board.innerHTML = '<div class="empty-state empty-state--sm">Memuat pertandingan…</div>';

    loadFeed().then(paint).catch(function () {
      board.innerHTML = '<div class="empty-state empty-state--sm">Feed pertandingan sedang tidak tersedia. ' +
        '<a href="/' + LIVE_FOOTBALL_SLUG + '">Buka halaman Football Live &rarr;</a></div>';
    });

    /* Segarkan status setiap menit; loadFeed() otomatis ambil ulang setelah TTL. */
    setInterval(function () { loadFeed().then(paint).catch(function () {}); }, 60000);
  }

  /* Daftar kategori ringkas di dalam <details>. */
  function renderHomeCategories() {
    var sectionsEl = $("#categorySections");
    if (!sectionsEl) return;

    sectionsEl.innerHTML = '<div class="category-grid">' +
      CATEGORIES.map(function (c) {
        return '<a class="cat-card" href="' + pageUrl(c.slug) + '">' +
          '<span class="cat-card__icon" aria-hidden="true">' + c.icon + "</span>" +
          '<span class="cat-card__body">' +
            '<span class="cat-card__name">' + esc(c.name) + "</span>" +
            '<span class="cat-card__meta">' + esc(cardMeta(c)) + "</span>" +
          "</span>" +
          '<span class="cat-card__arrow" aria-hidden="true">' + arrowIcon() + "</span>" +
        "</a>";
      }).join("") + "</div>";

    var totalEl = $("#homeTotal");
    if (totalEl) totalEl.textContent = CATEGORIES.length;
  }

  /* ------------------------------------------------------------
     PLAYER WIRING (dipakai halaman kategori & feed live)
     ------------------------------------------------------------ */
  function wirePlayer(slug, channels, labels) {
    labels = labels || {};
    var listEl = $("#chList");
    var player = $("#player");
    var loader = $("#playerLoader");
    var nowEl = $("#nowPlaying");
    var openBtn = $("#btnOpen");
    var reloadBtn = $("#btnReload");
    var fullBtn = $("#btnFull");
    var categoryName = labels.categoryName || slug;
    if (!listEl) return null;

    if (!channels.length) {
      listEl.innerHTML = '<div class="ch-list--empty">Belum ada channel untuk kategori ini.</div>';
      if (loader) loader.classList.add("is-hidden");
      return null;
    }

    listEl.innerHTML = channels.map(function (channel, index) {
      var tag = channel.tag || streamType(channel.url);
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

    /* ?m=<nami_id> — dipakai kartu pertandingan dari feed. */
    try {
      var matchId = new URLSearchParams(location.search).get("m");
      if (matchId) {
        for (var mi = 0; mi < channels.length; mi++) {
          if (channels[mi].match && channels[mi].match.id === matchId) { saved = mi; break; }
        }
      }
    } catch (e) { /* ignore */ }

    selectChannel(saved);
    return { select: selectChannel };
  }

  /* ------------------------------------------------------------
     CATEGORY / WATCH PAGE
     ------------------------------------------------------------ */
  function mountCategory(slug) {
    var cat = findBySlug(slug);
    var listEl = $("#chList");
    var loader = $("#playerLoader");
    var categoryName = cat ? cat.name : slug;
    var channels = cat ? cat.channels : [];

    document.title = categoryName + " — Live Streaming | TipiStream";
    $$("[data-category-name]").forEach(function (el) { el.textContent = categoryName; });

    if (!listEl) return;

    if (cat && cat.type === "live") {
      mountLiveCategory(cat, listEl, loader, categoryName);
      return;
    }

    var countEl = $("#chCount");
    if (countEl) countEl.textContent = channels.length;
    var countSide = $("#chCountSide");
    if (countSide) countSide.textContent = channels.length + " ch";

    wirePlayer(slug, channels, { categoryName: categoryName });
  }

  /* ------------------------------------------------------------
     LIVE CATEGORY (feed oneball)
     ------------------------------------------------------------ */
  function mountLiveCategory(cat, listEl, loader, categoryName) {
    var statusEl = $("#feedStatus");

    function paint() {
      var now = new Date();
      var channels = channelsFromMatches(feedState.matches || [], now);

      var countEl = $("#chCount");
      if (countEl) countEl.textContent = channels.length;
      var countSide = $("#chCountSide");
      if (countSide) countSide.textContent = channels.length + " ch";

      if (statusEl) {
        var liveCount = channels.filter(function (c) { return c.isLive; }).length;
        statusEl.textContent = liveCount + " live · " + channels.length + " stream";
      }

      if (!channels.length) {
        listEl.innerHTML = '<div class="ch-list--empty">Belum ada pertandingan football yang punya link streaming.</div>';
        if (loader) loader.classList.add("is-hidden");
        return;
      }

      wirePlayer(cat.slug, channels, { categoryName: categoryName });
    }

    if (feedState.matches) {
      renderMatchBoard($("#matchBoard"), feedState.matches, categoryName);
      paint();
      return;
    }

    renderMatchBoard($("#matchBoard"), null, categoryName);
    listEl.innerHTML = '<div class="ch-list--empty">Memuat jadwal pertandingan…</div>';
    loadFeed().then(function () {
      renderMatchBoard($("#matchBoard"), feedState.matches, categoryName);
      paint();
    }).catch(function () {
      renderMatchBoard($("#matchBoard"), null, categoryName, true);
      listEl.innerHTML = '<div class="ch-list--empty">Gagal memuat feed. Coba muat ulang halaman.</div>';
      if (loader) loader.classList.add("is-hidden");
      if (statusEl) statusEl.textContent = "feed offline";
    });
  }

  /* ------------------------------------------------------------------
     Kartu pertandingan (Football Live & Home)
     ------------------------------------------------------------------ */
  var STATUS_ORDER = { live: 0, soon: 1, later: 2, ended: 3, unknown: 4 };

  function renderMatchBoard(boardEl, matches, categoryName, failed) {
    if (!boardEl) return;
    var now = new Date();

    if (failed) {
      boardEl.innerHTML = '<div class="empty-state empty-state--sm">Feed pertandingan tidak bisa dimuat saat ini.</div>';
      return;
    }
    if (!matches) {
      boardEl.innerHTML = '<div class="empty-state empty-state--sm">Memuat jadwal pertandingan…</div>';
      return;
    }
    if (!matches.length) {
      boardEl.innerHTML = '<div class="empty-state empty-state--sm">Belum ada pertandingan football dengan link streaming.</div>';
      return;
    }

    var sorted = matches.slice().sort(function (a, b) {
      var sa = matchStatus(a, now), sb = matchStatus(b, now);
      if (sa.state !== sb.state) return STATUS_ORDER[sa.state] - STATUS_ORDER[sb.state];
      return (a.start ? a.start.getTime() : 0) - (b.start ? b.start.getTime() : 0);
    });

    boardEl.innerHTML = '<div class="match-grid">' +
      sorted.slice(0, 24).map(function (match) { return matchCardHtml(match, now); }).join("") +
      "</div>";
  }

  /* Satu kartu pertandingan — dipakai Home dan halaman Football Live. */
  function matchCardHtml(match, now) {
    var status = matchStatus(match, now);
    var when = match.start ? dayText(match.start, now) + " · " + clockText(match.start) : "–";
    var cta = status.state === "ended" ? "Tonton ulang" : "Tonton";
    return '<a class="match-card is-' + status.state + '" href="' + matchHref(match) + '">' +
      '<span class="match-card__top">' +
        '<span class="match-card__league">' + esc(match.league) + "</span>" +
        '<span class="match-status is-' + status.state + '">' + esc(status.label) + "</span>" +
      "</span>" +
      '<span class="match-card__teams">' + esc(match.home) +
        '<span class="match-card__vs">vs</span>' + esc(match.away) + "</span>" +
      '<span class="match-card__foot">' +
        "<span>" + esc(when) + " WIB</span>" +
        '<span class="match-card__cta">' + playIcon() + " " + cta + "</span>" +
      "</span>" +
    "</a>";
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
    loadFeed: loadFeed,
    channelFromUrl: channelsFromMatches,
    chatUrl: CHAT_URL,
    chatSandbox: CHAT_SANDBOX,
    donateUrl: DONATE_URL,
    topSupporterUrl: TOP_SUPPORTER_URL
  };
})();
