export async function onRequest(context) {
  const { request } = context
  const reqUrl = new URL(request.url)
  const videoUrl = reqUrl.searchParams.get("url")
  if (!videoUrl) return new Response("Missing url", { status: 400 })

  const originBase = new URL(videoUrl).origin

  const headers = new Headers()
  headers.set("User-Agent", "Mozilla/5.0")
  headers.set("Origin", "https://wikisport.cc")

  // forward cookies kalau ada
  const cookie = request.headers.get("Cookie")
  if (cookie) headers.set("Cookie", cookie)

  const response = await fetch(videoUrl, { headers })

  const contentType = response.headers.get("content-type") || ""

  // ===== PLAYLIST HANDLER =====
  if (contentType.includes("mpegurl") || videoUrl.endsWith(".m3u8")) {
    let text = await response.text()

    text = text.split("\n").map(line => {
      line = line.trim()
      if (line.startsWith("#") || line === "") return line
      if (line.startsWith("http"))
        return `/hls?url=${encodeURIComponent(line)}`
      return `/hls?url=${encodeURIComponent(originBase + "/" + line)}`
    }).join("\n")

    return new Response(text, {
      headers: {
        "Content-Type": "application/vnd.apple.mpegurl",
        "Access-Control-Allow-Origin": "https://wikisport.cc",
        "Access-Control-Allow-Credentials": "true"
      }
    })
  }

  // ===== SEGMENT HANDLER =====
  return new Response(response.body, {
    headers: {
      "Content-Type": "video/mp2t",
      "Access-Control-Allow-Origin": "https://wikisport.cc",
      "Access-Control-Allow-Credentials": "true"
    }
  })
}
