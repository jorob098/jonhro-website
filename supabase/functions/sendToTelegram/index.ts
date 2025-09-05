import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  try {
    const { message } = await req.json()
    if (!message) return new Response("Missing message", { status: 400 })

    const telegramToken = Deno.env.get("TELEGRAM_BOT_TOKEN")
    const chatId = Deno.env.get("TELEGRAM_CHAT_ID")

    if (!telegramToken || !chatId) {
      return new Response("Missing config", { status: 500 })
    }

    const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`

    const res = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `📩 New Website Message: ${message}`
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error("Telegram API error:", errText)
      return new Response(`Telegram error: ${errText}`, { status: 500 })
    }

    return new Response("Message sent to Telegram ✅", { status: 200 })
  } catch (err) {
    console.error("Function crashed:", err)
    return new Response("Internal Server Error", { status: 500 })
  }
})
