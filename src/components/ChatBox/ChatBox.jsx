// src/components/Chatbox.jsx
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import useChat from "../../hooks/useChat";
import { sendMessage } from "../../services/api";

// Helper: create or retrieve unique user ID for this browser session
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
  const { messages, addMessage } = useChat(userId);

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

  const avatarOptions = [
    "/avatars/boy.png",
    "/avatars/girl.png",
    "/avatars/owl.png",
  ];

  // Scroll to bottom when messages update
  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages, open]);

  // Initial welcome message from host (only once per session)
  useEffect(() => {
    const welcomeKey = `welcomeMessageSent-${userId}`;
    const alreadySent = localStorage.getItem(welcomeKey);

    if (!alreadySent && open) {
      const welcomeMessage = {
        sender: hostName,
        message: "Hello! Welcome to the chat.",
        source: "host",
        avatar: hostAvatar,
        user_id: userId,
        created_at: new Date().toISOString(),
        id: Date.now(),
      };
      addMessage(welcomeMessage);

      const insertWelcomeMessage = async () => {
        try {
          await sendMessage(
            welcomeMessage.sender,
            welcomeMessage.message,
            welcomeMessage.avatar,
            welcomeMessage.user_id
          );
          localStorage.setItem(welcomeKey, "true"); // mark as sent
        } catch (err) {
          console.error("Failed to insert welcome message:", err.message);
        }
      };

      insertWelcomeMessage();
    }
  }, [addMessage, open, userId]);

  // Real-time Supabase listener for all messages
  useEffect(() => {
    const channel = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const newMessage = payload.new;
          addMessage({ ...newMessage, id: newMessage.id || Date.now() });
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [addMessage]);

  // Handle sending a user message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!username || !selectedAvatar) {
      setError("Please enter your name and select an avatar before sending messages.");
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

    addMessage(userMessage);
    setInput("");

    try {
      await sendMessage(userMessage.sender, userMessage.message, userMessage.avatar, userMessage.user_id);
    } catch (err) {
      console.error("Failed to send message:", err.message);
    }
  };

  return (
    <div className="chat-container">
      {!open && (
        <>
          <div className="chat-widget-label">Need Help?</div>
          <div className="chat-widget-button" onClick={() => setOpen(true)}>
            <div className="owl">
              <div className="ear left"></div>
              <div className="ear right"></div>
              <div className="eye left"><div className="pupil"></div></div>
              <div className="eye right"><div className="pupil"></div></div>
              <div className="beak"></div>
            </div>
          </div>
        </>
      )}

      {open && (
        <div className="chatbox">
          <div className="chatbox-close" onClick={() => setOpen(false)}>×</div>

          {!username || !selectedAvatar ? (
            <div className="chat-username-overlay">
              <h3>Hi there! Please enter your name and select an avatar:</h3>
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
                <input
                  type="text"
                  placeholder="Enter your name..."
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                />
                <p>Select your avatar:</p>
                <div className="avatar-selection">
                  {avatarOptions.map((avatar) => (
                    <div
                      key={avatar}
                      className={`avatar-option ${tempAvatar === avatar ? "selected" : ""}`}
                      onClick={() => setTempAvatar(avatar)}
                    >
                      <img src={avatar} alt="avatar" />
                    </div>
                  ))}
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Save</button>
              </form>
            </div>
          ) : (
            <>
              <div className="chatbox-header">
                <img src={hostAvatar} alt={hostName} className="chatbox-avatar" />
                <strong>{hostName}</strong>
              </div>

              <div className="chatbox-messages-wrapper">
                <div className="chatbox-messages">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`chatbox-message ${msg.source}`}>
                      <div className="message-wrapper">
                        {msg.avatar && <img src={msg.avatar} alt={msg.sender} className="chatbox-avatar" />}
                        <div className="message-content">{msg.message}</div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <form onSubmit={handleSend} className="chatbox-input">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                />
                <button type="submit" disabled={!username || !selectedAvatar}>
                  Send
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
