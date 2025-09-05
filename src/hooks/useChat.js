// src/hooks/useChat.js
import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

export default function useChat(userId) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!userId) return;

    fetchMessages(userId);

    const channel = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `user_id=eq.${userId}`, // 🔑 only listen to my userId
        },
        (payload) => setMessages((prev) => [...prev, payload.new])
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [userId]);

  async function fetchMessages(userId) {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", userId) // 🔑 fetch only my messages
      .order("created_at", { ascending: true });

    if (error) console.error("Fetch error:", error.message);
    setMessages(data || []);
  }

  function addMessage(msg) {
    setMessages((prev) => [...prev, msg]);
  }

  return { messages, addMessage };
}
