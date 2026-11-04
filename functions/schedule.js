/* Proxy jadwal untuk browser.
   Sumber jadwal situs ini ada dua (lihat FEED_SOURCES di assets/app.js):

     /schedule                 -> https://sportsonline.st/  (HTML teks polos)
     /schedule?src=oneball     -> https://oneball.to/list.json  (JSON)

   Keduanya dibaca lewat fungsi ini supaya tidak bergantung pada header
   CORS milik sumber: sportsonline tidak mengirimnya sama sekali, dan
   oneball dulu mengirimnya terbuka tetapi tidak bisa dijamin selamanya.
   Hasilnya diteruskan apa adanya dengan CORS terbuka.

   Respons di-cache di edge Cloudflare selama 60 detik supaya sumbernya
   tidak dibanjiri permintaan ketika banyak pengunjung membuka Home. */

const SOURCES = {
  sportsonline: { url: "https://sportsonline.st/", type: "text/html,application/xhtml+xml" },
  oneball: { url: "https://oneball.to/list.json", type: "application/json" }
};
const DEFAULT_SOURCE = "sportsonline";
const EDGE_TTL = 60;

export async function onRequest(context) {
  const asked = new URL(context.request.url).searchParams.get("src") || DEFAULT_SOURCE;
  const source = SOURCES[asked];

  /* Hanya dua alamat di atas yang boleh dipanggil — parameter src tidak
     dipakai untuk membuka URL sembarang. */
  if (!source) {
    return new Response("Sumber jadwal tidak dikenal", {
      status: 400,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }

  const headers = new Headers();
  headers.set("User-Agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36");
  headers.set("Accept", source.type);
  headers.set("Accept-Language", "en-US,en;q=0.9");

  let upstream;
  try {
    upstream = await fetch(source.url, { headers, cf: { cacheTtl: EDGE_TTL } });
  } catch (err) {
    return new Response("Jadwal tidak bisa dihubungi", { status: 502 });
  }

  if (!upstream.ok) {
    return new Response("Jadwal membalas " + upstream.status, {
      status: 502,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }

  const text = await upstream.text();

  return new Response(text, {
    headers: {
      "Content-Type": asked === "oneball"
        ? "application/json; charset=utf-8"
        : "text/plain; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=60, s-maxage=60"
    }
  });
}
