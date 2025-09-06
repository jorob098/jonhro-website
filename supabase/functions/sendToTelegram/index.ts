// supabase/functions/sendToTelegram/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  // Handle preflight (CORS) requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  try {
    const { message, userId } = await req.json();

    if (!message) {
      return new Response("Missing message", {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    if (!userId) {
      return new Response("Missing userId", {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    const telegramToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const chatId = Deno.env.get("TELEGRAM_CHAT_ID");

    if (!telegramToken || !chatId) {
      return new Response("Missing config", {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    // include userId in message for receiveFromTelegram to parse
    const messageWithId = `[${userId}] ${message}`;

    const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
    const res = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: messageWithId }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(`Telegram API error: ${errText}`, {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    return new Response("Message sent to Telegram ✅", {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (err) {
    return new Response(`Server error: ${err.message}`, {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }
});
