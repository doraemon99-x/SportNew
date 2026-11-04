/* Proxy jadwal sportsonline untuk browser.
   sportsonline.st tidak mengirim header CORS, jadi fetch dari halaman
   akan diblokir. Fungsi ini mengambil halaman jadwal dan meneruskannya
   sebagai teks polos dengan CORS terbuka (sama seperti oneball dulu).

   Respons di-cache di edge Cloudflare selama 60 detik supaya sumbernya
   tidak dibanjiri permintaan ketika banyak pengunjung membuka Home. */

const UPSTREAM = "https://sportsonline.st/";
const EDGE_TTL = 60;

export async function onRequest() {
  const headers = new Headers();
  headers.set("User-Agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36");
  headers.set("Accept", "text/html,application/xhtml+xml");
  headers.set("Accept-Language", "en-US,en;q=0.9");

  let upstream;
  try {
    upstream = await fetch(UPSTREAM, { headers, cf: { cacheTtl: EDGE_TTL } });
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
      "Content-Type": "text/plain; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=60, s-maxage=60"
    }
  });
}
