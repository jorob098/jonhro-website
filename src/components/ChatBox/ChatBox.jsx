import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useAnonAuth from "../../hooks/useAnonAuth";
import useChat from "../../hooks/useChat";
import KiteIcon from "./KiteIcon";
import "./Chatbox.css";

function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function readSavedName() {
  try {
    return localStorage.getItem("chat_display_name") || "";
  } catch {
    return "";
  }
}

export default function Chatbox() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { userId, loading: authLoading } = useAnonAuth(open);
  const { messages, send, markAsRead } = useChat({ userId, isAdmin: false });
  const [input, setInput] = useState("");
  const [displayName, setDisplayName] = useState(readSavedName);
  const [nameInput, setNameInput] = useState("");

  const unreadCount = messages.filter((m) => m.sender === "admin" && !m.read).length;

  useEffect(() => {
    if (open) markAsRead();
  }, [open, messages.length, markAsRead]);

  const handleSaveName = (e) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    try {
      localStorage.setItem("chat_display_name", trimmed);
    } catch {
      /* storage unavailable: keep the name for this visit only */
    }
    setDisplayName(trimmed);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || !userId) return;
    setInput("");
    await send(trimmed, displayName);
  };

  return (
    <div className="chat-container">
      {!open && (
        <button
          type="button"
          className="chat-widget-wrapper"
          onClick={() => setOpen(true)}
          aria-label={t("chat.Open chat")}
        >
          <span className="chat-widget-label">{t("chat.Chat with us")}</span>
          <span className="chat-widget-button">
            <KiteIcon size={26} color="#fff" strokeWidth={2} />
            <span className="chat-widget-dot"></span>
            {unreadCount > 0 && <span className="unread-badge widget-badge">{unreadCount}</span>}
          </span>
        </button>
      )}

      <div
        className={`chatbox ${open ? "chatbox-open" : "chatbox-closed"}`}
        role="dialog"
        aria-label={t("chat.Chat with us")}
        aria-hidden={!open}
      >
        <div className="chatbox-header">
          <div>
            <p className="chatbox-header-title">Jonhro Robles</p>
            <p className="chatbox-header-status">{t("chat.status")}</p>
          </div>
          <button
            type="button"
            className="chatbox-close"
            onClick={() => setOpen(false)}
            aria-label={t("chat.Close chat")}
            tabIndex={open ? 0 : -1}
          >
            ×
          </button>
        </div>

        {open && !displayName ? (
          <form onSubmit={handleSaveName} className="chatbox-name-form">
            <label htmlFor="chat-name">{t("chat.What's your name?")}</label>
            <input
              id="chat-name"
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder={t("chat.Your name")}
              autoComplete="given-name"
              autoFocus
            />
            <button type="submit">{t("chat.Continue")}</button>
          </form>
        ) : open ? (
          <>
            <div className="chatbox-messages" aria-live="polite">
              {authLoading && <p className="chatbox-empty">{t("chat.Connecting...")}</p>}
              {!authLoading && messages.length === 0 && <p className="chatbox-empty">{t("chat.empty")}</p>}
              {messages.map((msg) => (
                <div key={msg.id} className={`chatbox-message-row ${msg.sender}`}>
                  <div className={`chatbox-message ${msg.sender}`}>{msg.message}</div>
                  <span className="chatbox-time">{formatTime(msg.created_at)}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="chatbox-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("chat.Type a message...")}
                aria-label={t("chat.Type a message...")}
              />
              <button type="submit" disabled={!userId}>{t("chat.Send")}</button>
            </form>
          </>
        ) : null}
      </div>
    </div>
  );
}
