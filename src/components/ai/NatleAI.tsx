"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  X,
  Send,
  RotateCcw,
  ArrowUpRight,
  Bot,
  User,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import NatleLogo from "@/components/NatleLogo";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  quickActions?: { label: string; href?: string }[];
  timestamp: string;
}

const SUGGESTED_PROMPTS = [
  "What does NADSCA build?",
  "Show me your capabilities",
  "What technologies do you use?",
  "Tell me about your projects",
  "How fast can you ship an MVP?",
  "How do I start a project?",
];

export default function NatleAI() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Autofocus input when opened & handle Escape key
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const sendMessage = React.useCallback(
    async (textToSend?: string) => {
      const query = (textToSend || input).trim();
      if (!query || isLoading) return;

      setHasInteracted(true);
      setInput("");

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: query,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => {
        const newHistory = [...prev, userMessage];
        setIsLoading(true);

        fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
            currentPath: pathname,
          }),
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to reach Awora AI service.");
            return res.json();
          })
          .then((data) => {
            const assistantMessage: Message = {
              id: `ai-${Date.now()}`,
              role: "assistant",
              content: data.reply || "I am currently processing requests. Please contact info@nadsca.dev.",
              quickActions: data.quickActions,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };
            setMessages((current) => [...current, assistantMessage]);
          })
          .catch(() => {
            setMessages((current) => [
              ...current,
              {
                id: `ai-err-${Date.now()}`,
                role: "assistant",
                content:
                  "I could not reach the intelligence service right now. You can reach the NADSCA team directly at info@nadsca.dev or call +94 11 250 7601.",
                quickActions: [{ label: "Contact NADSCA", href: "/contact" }],
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              },
            ]);
          })
          .finally(() => {
            setIsLoading(false);
          });

        return newHistory;
      });
    },
    [input, isLoading, pathname]
  );

  // Listen for global custom event to trigger AI from any CTA button
  useEffect(() => {
    const handleOpenEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ prompt?: string }>;
      setIsOpen(true);
      if (customEvent.detail?.prompt) {
        sendMessage(customEvent.detail.prompt);
      }
    };

    window.addEventListener("open-natle-ai", handleOpenEvent);
    window.addEventListener("open-nadsca-ai", handleOpenEvent);
    return () => {
      window.removeEventListener("open-natle-ai", handleOpenEvent);
      window.removeEventListener("open-nadsca-ai", handleOpenEvent);
    };
  }, [sendMessage]);

  const clearChat = () => {
    setMessages([]);
    setHasInteracted(false);
  };

  return (
    <>
      {/* ─── FLOATING TRIGGER BUTTON ─── */}
      <div className="fixed bottom-6 right-6 z-[90]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-3 p-3.5 sm:px-4 sm:py-3 rounded-full bg-black/80 hover:bg-black border border-white/20 hover:border-cyan-400/50 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-all duration-300 hover:scale-105 active:scale-95 outline-none"
          aria-label={isOpen ? "Close Awora AI" : "Open Awora AI"}
          data-cursor="ask"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-azure/30 to-teal/30 blur-md opacity-40 group-hover:opacity-100 transition-opacity" />

          {/* Icon */}
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 text-black shadow-inner transition-transform duration-500 group-hover:rotate-12">
            <Sparkles className="w-4 h-4 fill-current" />
          </div>

          {/* Label (Desktop) */}
          <span className="relative hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider uppercase text-white group-hover:text-cyan-200 transition-colors">
            <span>Awora</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </span>
        </button>
      </div>

      {/* ─── FLOATING AI ASSISTANT PANEL ─── */}
      <div
        className={`fixed z-[95] transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        } inset-x-0 bottom-0 sm:inset-x-auto sm:right-6 sm:bottom-24 w-full sm:w-[460px] h-[92vh] sm:h-[620px] max-h-[92vh] sm:max-h-[85vh] flex flex-col rounded-t-3xl sm:rounded-3xl bg-black/95 sm:bg-black/90 border border-white/15 backdrop-blur-3xl shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)] overflow-hidden`}
      >
        {/* Panel Header */}
        <div className="p-4 sm:px-6 sm:py-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 p-[1px] shadow-sm">
              <div className="w-full h-full rounded-[11px] bg-black flex items-center justify-center text-cyan-300">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm font-bold text-white tracking-tight">
                  AWORA // NADSCA AI
                </h3>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
              </div>
              <p className="text-[11px] font-mono text-white/50">
                Context: {pathname === "/" ? "Home" : pathname}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                title="Restart conversation"
                aria-label="Restart conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Panel Message Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-sm">
          {/* Welcome Screen when no interaction */}
          {!hasInteracted && messages.length === 0 && (
            <div className="py-4 space-y-6 animate-fadeIn">
              <div className="space-y-3">
                <div className="inline-block p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Bot className="w-6 h-6" />
                </div>
                <h4 className="font-display text-xl font-bold text-white tracking-tight">
                  Hi, I&apos;m Awora.
                </h4>
                <p className="text-white/70 leading-relaxed text-sm">
                  I&apos;m NADSCA&apos;s intelligent AI assistant. I can help you explore our software engineering practices, review verified client case studies, examine our technology standards, or start your next software project.
                </p>
              </div>

              {/* Prompt Suggestions */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 block mb-3">
                  SUGGESTED INQUIRIES
                </span>
                <div className="flex flex-col gap-2">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="text-left px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-cyan-400/40 hover:bg-white/[0.06] text-xs text-white/80 hover:text-white transition-all duration-200 flex items-center justify-between group"
                    >
                      <span>{prompt}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-cyan-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Chat Messages */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-6 h-6 rounded-full bg-cyan-400/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-white text-black font-medium rounded-tr-sm shadow-md"
                    : "bg-white/[0.05] border border-white/10 text-white/90 rounded-tl-sm"
                }`}
              >
                <div className="whitespace-pre-line">{msg.content}</div>

                {/* Quick Navigation Action Buttons */}
                {msg.quickActions && msg.quickActions.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                    {msg.quickActions.map((action) => (
                      <Link
                        key={action.label}
                        href={action.href || "/contact"}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/20 transition-colors"
                      >
                        <span>{action.label}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                )}

                <div
                  className={`text-[9px] font-mono mt-1 text-right ${
                    msg.role === "user" ? "text-black/50" : "text-white/35"
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {/* Streaming Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start animate-fadeIn">
              <div className="w-6 h-6 rounded-full bg-cyan-400/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                <Sparkles className="w-3 h-3" />
              </div>
              <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-white/[0.05] border border-white/10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Panel Input Area */}
        <div className="p-3.5 sm:p-4 border-t border-white/10 bg-white/[0.02]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about capabilities, projects, stack..."
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-white/40 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/[0.09] transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-white text-black font-semibold text-xs disabled:opacity-40 disabled:pointer-events-none hover:bg-slate-100 transition-all flex items-center justify-center shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-2 text-center text-[10px] font-mono text-white/35">
            Verified knowledge engine • Press ESC to exit
          </div>
        </div>
      </div>
    </>
  );
}
