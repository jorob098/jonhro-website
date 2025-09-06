// src/services/api.js
import { supabase } from "./supabaseClient";

// Send a message from website to Supabase and Telegram (anonymous)
export async function sendMessageToTelegramAnon(sender, message, avatar, userId) {
  try {
    // 1️⃣ Save message in Supabase
    const { data, error } = await supabase
      .from("messages")
      .insert([{ sender, message, avatar, source: "website", user_id: userId }])
      .select();

    if (error) {
      console.error("Supabase insert error:", error.message);
      throw error;
    }

    // 2️⃣ Send to Telegram via Supabase Edge Function
    const res = await fetch(import.meta.env.VITE_SUPABASE_FUNCTION_SEND_TELEGRAM, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `[${userId}] ${message}`,
        userId,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Failed to send message to Telegram:", errText);
    }

    return data?.[0]; // return inserted message
  } catch (err) {
    console.error("sendMessageToTelegramAnon failed:", err);
    throw err;
  }
}
