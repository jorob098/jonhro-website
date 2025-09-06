// src/components/Chatbox.jsx
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import useChat from "../../hooks/useChat";
import { sendMessageToSupabaseAndTelegram } from "../../services/api";
import { supabase } from "../../services/supabaseClient";

// helper: create or reuse a unique user id for this browser
function getOrCreateUserId() {
  let id = localStorage.getItem("chatUserId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("chatUserId", id);
  }
  return id;
}

export default function Chatbox() {
  const userId = getOrCreateUserId(); // 🔑 unique per browser
  const { messages, addMessage } = useChat(userId); // pass userId into hook

  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [tempName, setTempName] = useState("");
  const [error, setError] = useState("");

  const [username, setUsername] = useState(
    localStorage.getItem("chatUsername") || ""
  );
  const [selectedAvatar, setSelectedAvatar] = useState(
    () => localStorage.getItem("chatAvatar") || null
  );

  const hostName = "Hoot";
  const hostAvatar = "/avatars/Hoot.png";
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const avatarOptions = [
    "/avatars/boy.png",
    "/avatars/girl.png",
    "/avatars/owl.png",
  ];

  // Scroll to bottom when messages update
  useLayoutEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages, open]);

  // Save username to localStorage
  useEffect(() => {
    if (username) localStorage.setItem("chatUsername", username);
  }, [username]);

  useEffect(() => {
  if (messages.length === 0) {
    const welcomeMessage = {
      sender: hostName,
      message: "Hello! Welcome to the chat.",
      source: "host",
      avatar: hostAvatar,
      user_id: userId, // 🔑 store by user
      created_at: new Date().toISOString(),
      id: Date.now(),
    };
    addMessage(welcomeMessage);

    (async () => {
      const { error } = await supabase.from("messages").insert([welcomeMessage]);
      if (error) {
        console.error("Supabase insert error:", error.message);
      }
    })();
  }
}, [messages, addMessage, userId]);

  useEffect(() => {
  const channel = supabase
    .channel("public:messages")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      (payload) => {
        const newMessage = payload.new;

        // add host or telegram messages for this user
        if (
        (newMessage.sender === hostName || newMessage.source === "telegram") &&
        (newMessage.user_id === userId || newMessage.user_id === "unknown")
        ) {
        addMessage({
        ...newMessage,
        id: newMessage.id || Date.now(),
          });
        }
      }
    )
    .subscribe();

    return () => {
    supabase.removeChannel(channel);
    };
    }, [userId, addMessage]);

  // Handle user sending message
  async function handleSend(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = {
      sender: username || "visitor",
      message: trimmed,
      source: "website",
      avatar: selectedAvatar,
      user_id: userId, // 🔑 link to this session
      created_at: new Date().toISOString(),
      id: Date.now(),
    };
    addMessage(userMessage);
    setInput("");

    try {
      const responseFromHost = await sendMessageToSupabaseAndTelegram(
        username || "visitor",
        trimmed,
        selectedAvatar,
        userId // 🔑 pass it through
      );

      if (responseFromHost) {
        addMessage({
          sender: hostName,
          message: responseFromHost.message || responseFromHost,
          source: "host",
          avatar: hostAvatar,
          user_id: userId,
          created_at: new Date().toISOString(),
          id: Date.now(),
        });
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  }

  return (
    <div className="chat-container">
      {/* Floating Widget */}
      {!open && (
        <>
          <div className="chat-widget-label">Need Help?</div>
          <div className="chat-widget-button" onClick={() => setOpen(true)}>
            <div className="owl">
              <div className="ear left"></div>
              <div className="ear right"></div>
              <div className="eye left">
                <div className="pupil"></div>
              </div>
              <div className="eye right">
                <div className="pupil"></div>
              </div>
              <div className="beak"></div>
            </div>
          </div>
        </>
      )}

      {/* Chatbox */}
      {open && (
        <div className="chatbox">
          <div className="chatbox-close" onClick={() => setOpen(false)}>
            ×
          </div>

          {!username ? (
            <div className="chat-username-overlay">
              <div
                className="chat-username-close"
                onClick={() => setOpen(false)}
              >
                ×
              </div>

              <div className="owl-greeting">
                <div className="owl-animate">
                  <div className="ear left"></div>
                  <div className="ear right"></div>
                  <div className="eye left">
                    <div className="pupil"></div>
                  </div>
                  <div className="eye right">
                    <div className="pupil"></div>
                  </div>
                  <div className="beak"></div>
                </div>
                <span className="greeting-text">Hi there!</span>
              </div>

              <p>What’s your name?</p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!tempName.trim()) {
                    setError("⚠️ Please enter your name.");
                    return;
                  }
                  if (!selectedAvatar) {
                    setError("⚠️ Please select an avatar.");
                    return;
                  }

                  setUsername(tempName.trim());
                  localStorage.setItem("chatUsername", tempName.trim());

                  setSelectedAvatar(selectedAvatar);
                  localStorage.setItem("chatAvatar", selectedAvatar);

                  setTempName("");
                  setError("");
                }}
              >
                <input
                  type="text"
                  placeholder="Enter your name..."
                  value={tempName}
                  onChange={(e) => {
                    setTempName(e.target.value);
                    if (error) setError("");
                  }}
                />
                <p className="avatar-instruction">Choose your Avatar</p>
                <div className="avatar-selection">
                  {avatarOptions.map((avatar, index) => (
                    <div
                      key={index}
                      className={`avatar-option ${
                        selectedAvatar === avatar ? "selected" : ""
                      }`}
                      onClick={() => {
                        setSelectedAvatar(avatar);
                        localStorage.setItem("chatAvatar", avatar);
                      }}
                    >
                      <img src={avatar} alt={`avatar ${index}`} />
                    </div>
                  ))}
                </div>

                {error && <p className="error-message">{error}</p>}
                <button type="submit">Save</button>
              </form>
            </div>
          ) : (
            <>
              {/* User header */}
              <div className="chatbox-header">
                <img
                  src={hostAvatar}
                  alt={hostName}
                  className="chatbox-avatar"
                />
                <strong>{hostName}</strong>
              </div>

              <div className="chatbox-messages-wrapper">
                <div className="chatbox-messages">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`chatbox-message ${msg.source}`}>
                      <div className="message-wrapper">
                        {msg.avatar && (
                          <img
                            src={msg.avatar}
                            alt={`${msg.sender} avatar`}
                            className="chatbox-avatar"
                          />
                        )}
                        <div className="message-content">
                          <span>{msg.message}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {isTyping && (
                  <div className="chatbox-typing">
                    <div className="typing-bubble">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSend} className="chatbox-input">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                />
                <button type="submit">Send</button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
