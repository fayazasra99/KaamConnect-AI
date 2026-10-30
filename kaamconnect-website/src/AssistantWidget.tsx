import { FormEvent, useEffect, useState } from 'react';
import { ArrowRight, Bot, Sparkles, X } from 'lucide-react';

type Message = { role: 'user' | 'assistant'; content: string };

export default function AssistantWidget({ api }: { api: string }) {
  const [open, setOpen] = useState(false);
  const [configured, setConfigured] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: 'Hi! I can help you find jobs and use KaamConnect.' }]);

  useEffect(() => {
    fetch(`${api}/assistant/status`).then(r => r.ok ? r.json() : null).then(d => setConfigured(Boolean(d?.configured))).catch(() => setConfigured(false));
  }, [api]);

  const send = async (event: FormEvent) => {
    event.preventDefault();
    const question = input.trim();
    if (!question || busy) return;
    const history = messages.slice(-8);
    setMessages(prev => [...prev, { role: 'user', content: question }]);
    setInput(''); setBusy(true);
    try {
      const response = await fetch(`${api}/assistant`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: question, history }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'The assistant could not reply.');
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (error: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: error.message || 'The assistant is unavailable right now.' }]);
    } finally { setBusy(false); }
  };

  return <div className="assistant-widget">{open ? <section className="assistant-panel" aria-label="KaamConnect assistant">
    <div className="assistant-head"><span className="assistant-mark"><Bot size={18}/></span><div><b>KaamConnect guide</b><small><Sparkles size={12}/> Nemotron via Nebius Token Factory</small></div><button onClick={() => setOpen(false)} aria-label="Close assistant"><X size={18}/></button></div>
    {!configured && <div className="assistant-config">Assistant is not active yet. Add <code>NEBIUS_API_KEY</code> to the backend <code>.env</code> and restart the server.</div>}
    <div className="assistant-messages" aria-live="polite">{messages.map((m, i) => <div className={`assistant-message ${m.role}`} key={i}>{m.content}</div>)}{busy && <div className="assistant-message assistant">Thinking…</div>}</div>
    <form className="assistant-form" onSubmit={send}><input aria-label="Ask KaamConnect" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about finding work…" maxLength={1200}/><button className="btn btn-orange" disabled={busy || !input.trim()} aria-label="Send message"><ArrowRight size={17}/></button></form>
    <p className="assistant-privacy">When configured, your question is sent to Nebius Token Factory for a reply. Don’t include passwords, OTPs, or payment details.</p>
  </section> : <button className="assistant-launch" onClick={() => setOpen(true)}><Sparkles size={18}/> Ask KaamConnect</button>}</div>;
}
