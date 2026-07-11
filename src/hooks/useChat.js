import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";

export default function useChat({ userId, isAdmin }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    if (!userId) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Fetch messages error:", error.message);
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      setMessages([]);
      return;
    }

    fetchHistory();

    const channel = supabase
      .channel(`messages-${userId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `user_id=eq.${userId}` },
        (payload) => {
          setMessages((prev) => {
            if (prev.some((m) => m.id === payload.new.id)) return prev;
            return [...prev, payload.new];
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages", filter: `user_id=eq.${userId}` },
        (payload) => {
          setMessages((prev) =>
            prev.map((m) => (m.id === payload.new.id ? payload.new : m))
          );
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [userId, fetchHistory]);

  const send = async (text) => {
    if (!text.trim() || !userId) return;

    const { error } = await supabase.from("messages").insert({
      user_id: userId,
      sender: isAdmin ? "admin" : "visitor",
      message: text.trim(),
      source: isAdmin ? "admin" : "website",
      read: false,
    });

    if (error) console.error("Send message error:", error.message);
  };

  const markAsRead = async () => {
    if (!userId) return;
    const otherSender = isAdmin ? "visitor" : "admin";

    const { error } = await supabase
      .from("messages")
      .update({ read: true })
      .eq("user_id", userId)
      .eq("sender", otherSender)
      .eq("read", false);

    if (error) console.error("Mark as read error:", error.message);
  };

  return { messages, loading, send, markAsRead };
}