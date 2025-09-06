// src/services/api.js
import { supabase } from "./supabaseClient";

/**
 * Send a message from the website to Supabase and Telegram.
 * Requires a valid username and avatar.
 * @param {string} sender - The username of the sender (cannot be empty)
 * @param {string} message - The message text
 * @param {string} avatar - The selected avatar URL (cannot be empty)
 * @param {string} userId - Unique user ID
 */
export async function sendMessage(sender, message, avatar, userId) {
  if (!sender || !avatar) {
    throw new Error("Username and avatar are required to send a message.");
  }

  try {
    // 1️⃣ Save message in Supabase
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          sender,
          message,
          avatar,
          source: "website",
          user_id: userId,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Supabase insert error:", error.message);
      throw error;
    }

    // 2️⃣ Send message to Telegram via Supabase Edge Function
    const res = await fetch(import.meta.env.VITE_SUPABASE_FUNCTION_SEND_TELEGRAM, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        sender,
        avatar,
        message,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Failed to send message to Telegram:", errText);
    }

    return data?.[0]; // return inserted message
  } catch (err) {
    console.error("sendMessage failed:", err);
    throw err;
  }
}
