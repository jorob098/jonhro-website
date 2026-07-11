import { useState, useEffect } from "react";
import useAnonAuth from "../../hooks/useAnonAuth";
import useChat from "../../hooks/useChat";
import KiteIcon from "./KiteIcon";
import "./Chatbox.css";

function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function Chatbox() {
  const { userId, loading: authLoading } = useAnonAuth();
  const { messages, send, markAsRead } = useChat({ userId, isAdmin: false });
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const unreadCount = messages.filter((m) => m.sender === "admin" && !m.read).length;

  useEffect(() => {
    if (open) markAsRead();
  }, [open, messages.length]);

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput("");
    await send(trimmed);
  };

  if (authLoading) return null;

  return (
    <div className="chat-container">
      {!open && (
        <div className="chat-widget-wrapper" onClick={() => setOpen(true)}>
          <span className="chat-widget-label">Chat with us</span>
          <div className="chat-widget-button">
            <KiteIcon size={26} color="#fff" strokeWidth={2} />
            <span className="chat-widget-dot"></span>
            {unreadCount > 0 && <span className="unread-badge widget-badge">{unreadCount}</span>}
          </div>
        </div>
      )}

      <div className={`chatbox ${open ? "chatbox-open" : "chatbox-closed"}`}>
        <div className="chatbox-header">
          <div>
            <p className="chatbox-header-title">Jonhro Robles</p>
            <p className="chatbox-header-status"><span className="status-dot"></span> Online</p>
          </div>
          <div className="chatbox-close" onClick={() => setOpen(false)}>×</div>
        </div>

        <div className="chatbox-messages">
          {messages.length === 0 && <p className="chatbox-empty">Send us a message, we usually reply fast.</p>}
          {messages.map((msg) => (
            <div key={msg.id} className={`chatbox-message-row ${msg.sender}`}>
              <div className={`chatbox-message ${msg.sender}`}>{msg.message}</div>
              <span className="chatbox-time">{formatTime(msg.created_at)}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="chatbox-input">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}