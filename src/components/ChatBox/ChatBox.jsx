// src/components/Chatbox.jsx
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import { sendMessageToTelegramAnon } from "../services/api";

// Helper: create/reuse unique user ID per browser
function getOrCreateUserId() {
  let id = localStorage.getItem("chatUserId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("chatUserId", id);
  }
  return id;
}

export default function Chatbox() {
  const userId = getOrCreateUserId();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem("chatUsername") || "");
  const [selectedAvatar, setSelectedAvatar] = useState(localStorage.getItem("chatAvatar") || null);
  const [tempName, setTempName] = useState("");
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);
  const hostName = "Hoot";
  const hostAvatar = "/avatars/Hoot.png";
  const avatarOptions = ["/avatars/boy.png", "/avatars/girl.png", "/avatars/owl.png"];

  // Scroll to bottom
  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  // Save username/avatar in localStorage
  useEffect(() => {
    if (username) localStorage.setItem("chatUsername", username);
    if (selectedAvatar) localStorage.setItem("chatAvatar", selectedAvatar);
  }, [username, selectedAvatar]);

  // Load welcome message once
  useEffect(() => {
    if (messages.length === 0) {
      const welcome = {
        sender: hostName,
        message: "Hello! Welcome to the chat.",
        source: "host",
        avatar: hostAvatar,
        user_id: userId,
        created_at: new Date().toISOString(),
        id: Date.now(),
      };
      setMessages([welcome]);
      supabase.from("messages").insert([welcome]).catch(console.error);
    }
  }, [messages, userId]);

  // Subscribe to new messages in Supabase
  useEffect(() => {
    const channel = supabase
      .channel("public:messages")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
        const newMsg = payload.new;
        // show messages for this user or host/telegram
        if (newMsg.user_id === userId || newMsg.source !== "website") {
          setMessages((prev) => [...prev, { ...newMsg, id: newMsg.id || Date.now() }]);
        }
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [userId]);

  // Handle sending a message
  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = {
      sender: username || "visitor",
      message: trimmed,
      source: "website",
      avatar: selectedAvatar,
      user_id: userId,
      created_at: new Date().toISOString(),
      id: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      await sendMessageToTelegramAnon(username || "visitor", trimmed, selectedAvatar, userId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chat-container">
      {!open && (
        <>
          <div className="chat-widget-label">Need Help?</div>
          <div className="chat-widget-button" onClick={() => setOpen(true)}>💬</div>
        </>
      )}

      {open && (
        <div className="chatbox">
          <div className="chatbox-close" onClick={() => setOpen(false)}>×</div>

          {!username ? (
            <div className="chat-username-overlay">
              <p>What’s your name?</p>
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!tempName.trim()) return setError("Enter your name");
                if (!selectedAvatar) return setError("Select an avatar");
                setUsername(tempName.trim());
                setError("");
              }}>
                <input type="text" placeholder="Enter your name..." value={tempName} onChange={(e) => setTempName(e.target.value)} />
                <p>Choose your avatar</p>
                <div className="avatar-selection">
                  {avatarOptions.map((av, i) => (
                    <div key={i} className={`avatar-option ${selectedAvatar===av?"selected":""}`} onClick={() => setSelectedAvatar(av)}>
                      <img src={av} alt={`avatar ${i}`} />
                    </div>
                  ))}
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Save</button>
              </form>
            </div>
          ) : (
            <>
              <div className="chatbox-messages-wrapper">
                <div className="chatbox-messages">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`chatbox-message ${msg.source}`}>
                      {msg.avatar && <img src={msg.avatar} alt="" className="chatbox-avatar" />}
                      <span>{msg.message}</span>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <form onSubmit={handleSend} className="chatbox-input">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
                <button type="submit">Send</button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
