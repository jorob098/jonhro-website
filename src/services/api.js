// src/services/api.js
import { supabase } from "./supabaseClient";

/**
 * Send a message from the website to Supabase.
 * Requires a valid username and avatar.
 * @param {string} sender - The username of the sender (cannot be empty)
 * @param {string} message - The message text
 * @param {string} avatar - The selected avatar URL (cannot be empty)
 * @param {string} userId - Unique user ID
 * @returns {object} The inserted message record
 */
export async function sendMessage(sender, message, avatar, userId) {
  if (!sender || !avatar) {
    throw new Error("Username and avatar are required to send a message.");
  }

  try {
    // Save message in Supabase
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          sender,
          message,
          avatar,
          source: "website", // could be "admin" for admin messages
          user_id: userId,
          created_at: new Date().toISOString(),
        },
      ])
      .select(); // v2 returns { data, error }

    if (error) {
      console.error("Supabase insert error:", error.message);
      throw error;
    }

    return data?.[0]; // return the inserted message
  } catch (err) {
    console.error("sendMessage failed:", err);
    throw err;
  }
}

/**
 * Optional: Fetch messages from Supabase.
 * Admin can use this to load all messages.
 * @param {string} [userId] - Filter messages by userId if needed
 */
export async function fetchMessages(userId = null) {
  try {
    let query = supabase.from("messages").select("*").order("created_at", { ascending: true });
    if (userId) query = query.eq("user_id", userId);

    const { data, error } = await query;

    if (error) {
      console.error("Supabase fetch error:", error.message);
      throw error;
    }

    return data || [];
  } catch (err) {
    console.error("fetchMessages failed:", err);
    throw err;
  }
}
