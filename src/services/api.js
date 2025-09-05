// src/services/api.js
import { supabase } from "./supabaseClient";

export async function sendMessageToSupabaseAndTelegram(sender, message, avatar, userId) {
  try {
    // 1. Save in Supabase with userId
    const { data, error } = await supabase
      .from("messages")
      .insert([{ sender, message, avatar, source: "website", user_id: userId }])
      .select();

    if (error) {
      console.error("Supabase insert error:", error.message);
      throw error;
    }

    // 2. Forward to Telegram ✅ FIXED
    const res = await fetch(import.meta.env.VITE_SUPABASE_FUNCTION_SEND_TELEGRAM, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `${sender} (${userId}): ${message}`, // formatted text
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Failed to send message to Telegram:", errorText);
    }

    return data?.[0]; // return inserted message
  } catch (err) {
    console.error("sendMessageToSupabaseAndTelegram failed:", err);
    throw err;
  }
}
