
import { useState, useRef, useEffect } from "react";

function RailPulseChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! 👋 I'm RailPulse AI, your railway passenger assistant.\n\nI can help you check train status, delays, arrival estimates and alternative trains.\n\nWhat would you like to know?"
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, loading]);

  const sendMessage = async (text = input) => {
    if (!text.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: text.trim()
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages.map((msg) => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.reply || "Sorry, I couldn't generate a response."
        }
      ]);

    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "I'm unable to connect to the RailPulse server. Please check whether the backend is running."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "Check train 12627 status",
    "Show alternative trains for 12628",
    "How does RailPulse AI work?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100]">

      {/* Floating Chat Button */}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-16 w-16 items-center justify-center rounded-full border border-[#2FE0C7]/40 bg-[#0B1929] text-3xl shadow-[0_0_25px_rgba(47,224,199,0.3)] transition hover:scale-110"
          aria-label="Open RailPulse AI chatbot"
        >
          💬
        </button>
      )}

      {/* Chat Window */}

      {isOpen && (
        <div className="flex h-[560px] w-[360px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-2xl border border-[#20344D] bg-[#080F1B] shadow-2xl">

          {/* Header */}

          <div className="flex items-center justify-between border-b border-[#20344D] bg-[#101F35] p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2FE0C7]/10 text-2xl">
                🚆
              </div>

              <div>
                <h3 className="font-semibold text-[#E8EEF7]">
                  RailPulse AI
                </h3>

                <div className="flex items-center gap-2 text-xs text-[#2FE0C7]">
                  <span className="h-2 w-2 rounded-full bg-[#2FE0C7]"></span>
                  Passenger Assistant
                </div>
              </div>

            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-xl text-[#8FA3C0] transition hover:text-white"
              aria-label="Close chatbot"
            >
              ✕
            </button>

          </div>

          {/* Messages */}

          <div className="flex-1 space-y-4 overflow-y-auto p-4">

            {messages.map((message, index) => (

              <div
                key={index}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "rounded-br-sm bg-[#147F79] text-white"
                      : "rounded-bl-sm border border-[#20344D] bg-[#101F35] text-[#D5E0EF]"
                  }`}
                >
                  {message.content}
                </div>

              </div>

            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-xl border border-[#20344D] bg-[#101F35] px-4 py-3 text-sm text-[#2FE0C7]">
                  RailPulse AI is thinking...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />

          </div>

          {/* Suggested Questions */}

          {messages.length === 1 && (
            <div className="space-y-2 px-4 pb-3">

              <p className="text-xs text-[#71839C]">
                Try asking:
              </p>

              {suggestions.map((suggestion, index) => (

                <button
                  key={index}
                  onClick={() => sendMessage(suggestion)}
                  disabled={loading}
                  className="block w-full rounded-lg border border-[#20344D] px-3 py-2 text-left text-xs text-[#8FA3C0] transition hover:border-[#2FE0C7] hover:text-[#2FE0C7]"
                >
                  {suggestion}
                </button>

              ))}

            </div>
          )}

          {/* Input */}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex gap-2 border-t border-[#20344D] bg-[#0B1422] p-3"
          >

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your train..."
              disabled={loading}
              className="min-w-0 flex-1 rounded-lg border border-[#20344D] bg-[#101F35] px-3 py-3 text-sm text-white outline-none placeholder:text-[#60738D] focus:border-[#2FE0C7]"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-lg bg-[#147F79] px-4 text-white transition hover:bg-[#199B91] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ➤
            </button>

          </form>

          <div className="bg-[#0B1422] pb-2 text-center text-[10px] text-[#71839C]">
            Demo mode · Simulated railway data
          </div>

        </div>
      )}

    </div>
  );
}

export default RailPulseChatbot;