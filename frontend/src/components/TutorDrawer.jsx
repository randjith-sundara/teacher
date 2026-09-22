import React, { useState, useRef, useEffect } from 'react';
import MathView from './MathView';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  HelpCircle,
  BookOpen
} from 'lucide-react';

export default function TutorDrawer({ isOpen, onClose, context = '', courseTitle = '' }) {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      content:
        "Bonjour ! Je suis votre professeur particulier de mathématiques. Que vous ayez un doute sur une notion, une méthode ou un calcul, posez-moi vos questions. Comment puis-je vous aider aujourd'hui ?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const newMessages = [...messages, { role: 'user', content: query }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          context: `${courseTitle ? `Cours : ${courseTitle}. ` : ''}${context || ''}`,
        }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'model', content: data.reply }]);
    } catch (e) {
      setMessages([
        ...newMessages,
        {
          role: 'model',
          content: "Désolé, une erreur est survenue lors de la communication avec le professeur.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        role: 'model',
        content: "Conversation réinitialisée. N'hésitez pas à me poser une nouvelle question !",
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* En-tête */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Professeur IA</h3>
              <span className="text-[11px] text-slate-400">Tuteur mathématique interactif</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleClear}
              title="Effacer la conversation"
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contexte actif si présent */}
        {context && (
          <div className="bg-indigo-950/40 border-b border-indigo-900/50 px-4 py-2 text-[11px] text-indigo-300 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="truncate">Contexte : {context}</span>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 text-xs leading-relaxed ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.role === 'model' && (
                <div className="w-6 h-6 rounded-full bg-indigo-900/80 border border-indigo-700/60 flex items-center justify-center text-indigo-300 shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 shadow-xs ${
                  m.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-slate-950/80 border border-slate-800/80 text-slate-200 rounded-bl-none'
                }`}
              >
                <MathView text={m.content} />
              </div>
              {m.role === 'user' && (
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-indigo-400" />
              <span>Le professeur prépare son explication...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions rapides */}
        <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/40 flex flex-wrap gap-1.5">
          {[
            'Explique-moi ce concept simplement',
            'Donne-moi une analogie concrète',
            'Quelle méthode privilégier ?',
          ].map((promptText, i) => (
            <button
              key={i}
              onClick={() => handleSend(promptText)}
              className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700/60 transition-colors"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Saisie de message */}
        <div className="p-3 border-t border-slate-800 bg-slate-950">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez une question sur le cours ou un calcul..."
              className="flex-1 bg-slate-900 border border-slate-700 focus:border-indigo-500 focus:outline-none rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white p-2.5 rounded-xl transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
