// src/hooks/useChat.js
import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

export default function useChat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => setMessages((prev) => [...prev, payload.new])
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  async function fetchMessages() {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: true });
    setMessages(data || []);
  }

  // Allows optimistic updates from the UI
  function addMessage(msg) {
    setMessages((prev) => [...prev, msg]);
  }

  return { messages, addMessage };
}
