// supabase/functions/receiveFromTelegram/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Supabase service role key (needed to write messages)
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  try {
    const data = await req.json();

    // Telegram payload parsing
    const telegramMessage = data.message?.text;
    const telegramUser = data.message?.from?.username || "TelegramUser";

    // Optional: extract userId if you included it in message, e.g. "[userId] actual message"
    let userId: string | null = null;
    let messageText = telegramMessage;

    if (telegramMessage?.startsWith("[")) {
      const match = telegramMessage.match(/^\[(.+?)\]\s*(.*)$/);
      if (match) {
        userId = match[1];         // extracted userId
        messageText = match[2];    // actual message
      }
    }

    if (!messageText) {
      return new Response("No message text", { status: 400 });
    }

    // Insert into Supabase with user_id
    const { error } = await supabase.from("messages").insert([
      {
        sender: telegramUser,
        message: messageText,
        source: "telegram",
        avatar: "/avatars/Hoot.png", // you can customize
        user_id: userId || "unknown", // ensures website can pick it up
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error.message);
      return new Response(`DB Error: ${error.message}`, { status: 500 });
    }

    return new Response("Message saved", { status: 200 });
  } catch (err) {
    console.error("Failed to process Telegram message:", err);
    return new Response("Server error", { status: 500 });
  }
});
