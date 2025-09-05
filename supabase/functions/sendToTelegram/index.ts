import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { message } = await req.json();

  if (!message) return new Response("Missing message", { status: 400 });

  const telegramToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
  const chatId = Deno.env.get("TELEGRAM_CHAT_ID");

  if (!telegramToken || !chatId) return new Response("Missing config", { status: 500 });

  const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
  const res = await fetch(telegramUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: message }),
  });

  if (!res.ok) return new Response(`Telegram API error`, { status: 500 });

  return new Response("OK", { status: 200 });
});
