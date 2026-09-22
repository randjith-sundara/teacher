import React, { useState, useRef, useEffect } from 'react';
import MathView from './MathView';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  BookOpen
} from 'lucide-react';

export default function TutorDrawer({ isOpen, onClose, context = '', courseTitle = '' }) {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      content:
        "Bonjour ! Je suis ton professeur de mathématiques. Que tu aies un doute sur une notion, une formule ou un calcul, pose-moi tes questions simplement. Comment puis-je t'aider ?",
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
          content: "Désolé, une petite erreur est survenue lors de la communication avec le professeur.",
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
        content: "Conversation réinitialisée. Pose-moi une nouvelle question quand tu veux !",
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-2xs transition-opacity">
      <div className="w-full max-w-md bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* En-tête */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Professeur Particulier IA</h3>
              <span className="text-[11px] text-slate-500">Explications claires pas-à-pas</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleClear}
              title="Effacer la discussion"
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contexte actif */}
        {context && (
          <div className="bg-indigo-50/70 border-b border-indigo-100 px-4 py-2 text-[11px] text-indigo-800 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="truncate">{context}</span>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 text-xs leading-relaxed ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.role === 'model' && (
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 shadow-2xs ${
                  m.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-xs'
                    : 'bg-white border border-slate-200 text-slate-900 rounded-bl-xs'
                }`}
              >
                <MathView text={m.content} />
              </div>

              {m.role === 'user' && (
                <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic bg-white p-3 rounded-xl border border-slate-200 w-fit">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-indigo-600" />
              <span>Le professeur prépare son explication...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions rapides */}
        <div className="px-3 py-2 border-t border-slate-200 bg-white flex flex-wrap gap-1.5">
          {[
            'Explique-moi comme si j\'avais 12 ans',
            'Donne-moi un exemple concret',
            'Où est mon erreur ?',
          ].map((promptText, i) => (
            <button
              key={i}
              onClick={() => handleSend(promptText)}
              className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200 transition-colors cursor-pointer"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Champ de saisie */}
        <div className="p-3 border-t border-slate-200 bg-white">
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
              placeholder="Pose ta question au professeur..."
              className="flex-1 bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white focus:outline-none rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white p-2.5 rounded-xl transition-colors shrink-0 shadow-2xs cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
