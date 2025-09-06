import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { supabase } from "../../services/supabaseClient";
import { sendMessage } from "../../services/api";

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
  const [selectedAvatar, setSelectedAvatar] = useState(localStorage.getItem("chatAvatar") || "");
  const [tempName, setTempName] = useState("");
  const [tempAvatar, setTempAvatar] = useState("");
  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);

  const hostName = "Hoot";
  const hostAvatar = "/avatars/Hoot.png";
  const avatarOptions = ["/avatars/boy.png", "/avatars/girl.png", "/avatars/owl.png"];

  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages, open]);

  // Initial welcome message
  useEffect(() => {
    const welcomeKey = `welcomeMessageSent-${userId}`;
    if (!localStorage.getItem(welcomeKey) && open) {
      const welcomeMessage = {
        sender: hostName,
        message: "Hello! Welcome to the chat.",
        source: "host",
        avatar: hostAvatar,
        user_id: userId,
        created_at: new Date().toISOString(),
        id: Date.now(),
      };
      setMessages([welcomeMessage]);
      sendMessage(hostName, welcomeMessage.message, hostAvatar, userId)
        .then(() => localStorage.setItem(welcomeKey, "true"))
        .catch(console.error);
    }
  }, [userId, open]);

  // Real-time listener
  useEffect(() => {
    const channel = supabase
      .channel(`messages-user-${userId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `user_id=eq.${userId}` },
        (payload) => setMessages((prev) => [...prev, payload.new])
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [userId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!username || !selectedAvatar) {
      setError("Please enter your name and select an avatar.");
      return;
    }
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = {
      sender: username,
      message: trimmed,
      source: "website",
      avatar: selectedAvatar,
      user_id: userId,
      created_at: new Date().toISOString(),
      id: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      await sendMessage(userMessage.sender, userMessage.message, userMessage.avatar, userId);
    } catch (err) {
      console.error("Failed to send message:", err.message);
    }
  };

  return (
    <div className="chat-container">
      {!open ? (
        <div className="chat-widget" onClick={() => setOpen(true)}>Need Help?</div>
      ) : (
        <div className="chatbox">
          {!username || !selectedAvatar ? (
            <div className="chat-username-overlay">
              <h3>Enter name and select avatar:</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!tempName.trim() || !tempAvatar) {
                    setError("⚠️ Both name and avatar are required.");
                    return;
                  }
                  setUsername(tempName.trim());
                  setSelectedAvatar(tempAvatar);
                  localStorage.setItem("chatUsername", tempName.trim());
                  localStorage.setItem("chatAvatar", tempAvatar);
                  setTempName("");
                  setTempAvatar("");
                  setError("");
                }}
              >
                <input value={tempName} onChange={(e) => setTempName(e.target.value)} placeholder="Name" />
                <div className="avatar-selection">
                  {avatarOptions.map((avatar) => (
                    <div key={avatar} className={`avatar-option ${tempAvatar === avatar ? "selected" : ""}`}
                         onClick={() => setTempAvatar(avatar)}>
                      <img src={avatar} alt="avatar" />
                    </div>
                  ))}
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Save</button>
              </form>
            </div>
          ) : (
            <>
              <div className="chatbox-messages-wrapper">
                {messages.map((msg) => (
                  <div key={msg.id} className={`chatbox-message ${msg.source}`}>
                    {msg.avatar && <img src={msg.avatar} alt={msg.sender} />}
                    <span>{msg.message}</span>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <form onSubmit={handleSend}>
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
                <button type="submit">Send</button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
