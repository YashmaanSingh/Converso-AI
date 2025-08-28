"use client";
import React, { useState } from "react";
import "./chat.css";

const contactsMock = [
  { id: 1, name: "Sarah Johnson", preview: "Hey, are we still meeti...", time: "10:30 AM", unread: true },
  { id: 2, name: "Alex Chen", preview: "I've sent you the files you...", time: "Yesterday", unread: false },
  { id: 3, name: "Design Team", preview: "Maria: Let's finalize the m...", time: "Wed", unread: false },
  { id: 4, name: "Michael Brown", preview: "Thanks for your help yeste...", time: "Mon", unread: false },
  { id: 5, name: "Emma Wilson", preview: "Can you review the latest...", time: "Feb 28", unread: false },
];

const chatMock = [
  { sender: "Sarah Johnson", text: "Hi there! How are you doing today?", time: "10:15 AM", type: "in" },
  { sender: "You", text: "I'm doing great! Just finishing up some work. How about you?", time: "10:17 AM", type: "out" },
  { sender: "Sarah Johnson", text: "I'm good too! Just wondering if we're still meeting today at 2 PM?", time: "10:20 AM", type: "in" },
  { sender: "You", text: "Yes, absolutely! I've prepared all the materials we'll need to discuss.", time: "10:22 AM", type: "out" },
  { sender: "Sarah Johnson", text: (
    <span>
      Great! Here's the document I mentioned yesterday:<br/>
      <span className="file-bubble">
        <span className="file-icon">📄</span> Project_Proposal.pdf <span className="file-size">(2.4 MB)</span>
      </span>
    </span>
  ), time: "10:30 AM", type: "in" }
];

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(chatMock);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([
      ...messages,
      { sender: "You", text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), type: "out" }
    ]);
    setInput("");
  };

  return (
    <div className="chatapp-wrapper" style={{ width: "100vw", maxWidth: "100vw", minHeight: "100vh", display: "flex" }}>
      {/* Sidebar */}
      <aside className="chat-sidebar">
        <header className="chat-sidebar-header">
          <span className="chatapp-logo">ChatApp</span>
        </header>
        <div className="chat-sidebar-search">
          <input placeholder="Search conversations…" />
        </div>
        <ul className="chat-list">
          {contactsMock.map(c => (
            <li key={c.id} className={c.unread ? "chat-list-active" : ""}>
              <div className="avatar-placeholder">{c.name[0]}</div>
              <div>
                <div className="chat-list-name">{c.name}</div>
                <div className="chat-list-preview">{c.preview}</div>
              </div>
              <div className="chat-list-meta">
                <span>{c.time}</span>
                {c.unread && <span className="chat-list-unread"></span>}
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Chat */}
      <main className="chat-main">
        <header className="chat-main-header">
          <div className="avatar-placeholder-lg">S</div>
          <div className="chat-main-header-info">
            <span className="chat-main-header-name">Sarah Johnson</span>
            <span className="chat-main-header-status">Online</span>
          </div>
          <div className="chat-main-header-actions">
            <button title="Call">📞</button>
            <button title="Video">🎥</button>
            <button title="More">⋯</button>
          </div>
        </header>
        <div className="chat-date-separator">Today, April 15, 2025</div>
        <div className="chat-thread">
          {messages.map((m, i) => (
            <div
              className={`chat-bubble ${m.type === "out" ? "chat-bubble-out" : "chat-bubble-in"}`}
              key={i}
            >
              <div className="chat-bubble-content">
                {m.text}
                <span className="chat-bubble-time">{m.time}</span>
              </div>
            </div>
          ))}
        </div>
        <form className="chat-input-form" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type a message…"
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{ color: "#111" }}
          />
          <button type="submit">➤</button>
        </form>
      </main>

      {/* Contact Info */}
      <aside className="chat-contact-info">
        <div className="avatar-large">S</div>
        <div className="contact-name">Sarah Johnson</div>
        <div className="contact-title">Product Designer</div>
        <div className="contact-actions">
          <a href="mailto:sarah.johnson@example.com">✉️</a>
          <a href="tel:+15551234567">📞</a>
        </div>
        <div className="contact-details">
          <div>Email: sarah.johnson@example.com</div>
          <div>Phone: +1 (555) 123-4567</div>
        </div>
      </aside>
    </div>
  );
}