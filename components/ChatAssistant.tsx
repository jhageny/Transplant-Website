import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Info, Sparkles } from 'lucide-react';
import { generateCoordinatorResponse } from '../services/geminiService';
import { Message, LoadingState } from '../types';

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Welcome! I'm your AI Transplant Mentor. I can explain the complexities of organ allocation, the emotional aspects of donor family care, or the educational requirements for this career. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || status === LoadingState.LOADING) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setStatus(LoadingState.LOADING);

    try {
      const history = messages.map(m => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

      const responseText = await generateCoordinatorResponse(userMsg.text, history);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setStatus(LoadingState.IDLE);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'model',
          text: "My connection to the clinical database is currently unstable. Please try again shortly!",
          timestamp: new Date(),
        },
      ]);
      setStatus(LoadingState.ERROR);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col h-full w-full transition-all">
      {/* Dynamic Header */}
      <div className="bg-gradient-to-r from-medical-700 via-vibrant-purple to-vibrant-indigo p-6 text-white relative">
        <div className="absolute top-0 right-0 p-2 opacity-20">
          <Sparkles className="w-20 h-20" />
        </div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 backdrop-blur rounded-2xl shadow-inner border border-white/20">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-black text-xl tracking-tight">Coordinator Mentor AI</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <p className="text-medical-100 text-xs font-bold uppercase tracking-widest">Online & Clinical</p>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-3 text-white/90 text-sm bg-black/10 px-4 py-2 rounded-2xl border border-white/10">
            <Info className="w-4 h-4" />
            <span className="font-medium italic">Ask about the "Golden Hour" or "UNOS match runs"</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/50 dark:bg-slate-950/30">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end gap-3`}>
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-2xl shadow-lg flex items-center justify-center transform transition-transform hover:scale-110 ${
                  msg.role === 'user' ? 'bg-vibrant-indigo' : 'bg-medical-600'
                }`}
              >
                {msg.role === 'user' ? (
                  <User className="w-6 h-6 text-white" />
                ) : (
                  <Bot className="w-6 h-6 text-white" />
                )}
              </div>
              <div
                className={`p-5 rounded-3xl shadow-sm text-base leading-relaxed font-medium ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-vibrant-indigo to-indigo-700 text-white rounded-br-none'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700 rounded-bl-none shadow-xl'
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {status === LoadingState.LOADING && (
          <div className="flex justify-start w-full">
            <div className="flex flex-row items-end gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-medical-600 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl rounded-bl-none border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="flex space-x-2">
                  <div className="w-2.5 h-2.5 bg-medical-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2.5 h-2.5 bg-vibrant-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2.5 h-2.5 bg-vibrant-indigo rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Formatted Input */}
      <form onSubmit={handleSendMessage} className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question here..."
              className="w-full p-4 pr-12 border-2 border-slate-100 dark:border-slate-800 dark:bg-slate-950 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-medical-500/10 focus:border-medical-500 transition-all font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600"
              disabled={status === LoadingState.LOADING}
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || status === LoadingState.LOADING}
            className="p-4 bg-gradient-to-r from-medical-600 to-vibrant-indigo text-white rounded-[1.5rem] hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-medical-500/40"
          >
            {status === LoadingState.LOADING ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Send className="w-6 h-6" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatAssistant;