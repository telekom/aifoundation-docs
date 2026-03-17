import React, { useState, useRef, useEffect, useCallback } from 'react';
import './AskAI.css';

const API_BASE = 'https://llm-server.llmhub.t-systems.net/v2';
const CHAT_MODEL = 'gpt-4.1-mini';
const EMBED_MODEL = 'text-embedding-bge-m3';
const TOP_K = 5;

const SUGGESTED_QUESTIONS = [
  'How do I authenticate with the API?',
  'Which models are available?',
  'How does streaming work?',
];

const SYSTEM_PROMPT = `You are the AI assistant for the AI Foundation Services (AIFS) documentation by T-Systems.
Answer questions based ONLY on the provided documentation context.
Be concise, accurate, and helpful. Use markdown formatting for code blocks and lists.
If the context doesn't contain enough information to answer, say so honestly.
Always reference the relevant documentation section when possible.`;

// ── Vector math (cosine similarity) ──────────────────────────────
function cosineSim(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

// ── Simple markdown → HTML (lightweight, no deps) ────────────────
function renderMarkdown(text) {
  return text
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Line breaks
    .replace(/\n/g, '<br/>');
}

export default function AskAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchIndex, setSearchIndex] = useState(null);
  const [indexError, setIndexError] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(true);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  // Load search index on first open
  useEffect(() => {
    if (isOpen && !searchIndex && !indexError) {
      fetch('/search-index.json')
        .then(r => {
          if (!r.ok) throw new Error(`${r.status}`);
          return r.json();
        })
        .then(data => setSearchIndex(data))
        .catch(() => setIndexError(true));
    }
  }, [isOpen, searchIndex, indexError]);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && !showKeyInput) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, showKeyInput]);

  // Retrieve relevant chunks via embedding similarity
  const retrieveContext = useCallback(async (query) => {
    if (!searchIndex) return [];

    const resp = await fetch(`${API_BASE}/embeddings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: EMBED_MODEL, input: query }),
    });
    if (!resp.ok) throw new Error('Failed to generate query embedding');
    const data = await resp.json();
    const queryEmb = data.data[0].embedding;

    // Score all chunks
    const scored = searchIndex.chunks.map((chunk, i) => ({
      ...chunk,
      score: cosineSim(queryEmb, chunk.embedding),
    }));
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, TOP_K);
  }, [searchIndex, apiKey]);

  // Stream a chat response
  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return;

    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Create placeholder for assistant response
    const assistantMsg = { role: 'assistant', content: '', sources: [] };
    setMessages(prev => [...prev, assistantMsg]);

    try {
      // Step 1: Retrieve relevant docs
      const contexts = await retrieveContext(text);
      const contextText = contexts
        .map((c, i) => `[${i + 1}] (/${c.slug})\n${c.text}`)
        .join('\n\n---\n\n');

      assistantMsg.sources = contexts.map(c => ({
        title: c.title,
        slug: c.slug,
        score: c.score,
      }));

      // Step 2: Stream LLM response
      const controller = new AbortController();
      abortRef.current = controller;

      const resp = await fetch(`${API_BASE}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: CHAT_MODEL,
          stream: true,
          max_tokens: 800,
          messages: [
            { role: 'system', content: `${SYSTEM_PROMPT}\n\nDocumentation context:\n${contextText}` },
            // Include last 4 messages for conversation continuity
            ...messages.slice(-4).map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: text },
          ],
        }),
        signal: controller.signal,
      });

      if (!resp.ok) {
        const err = await resp.text();
        throw new Error(`API error ${resp.status}: ${err}`);
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = line.slice(6).trim();
          if (payload === '[DONE]') break;

          try {
            const parsed = JSON.parse(payload);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistantMsg.content += delta;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { ...assistantMsg };
                return updated;
              });
            }
          } catch {}
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        assistantMsg.content = `Sorry, I encountered an error: ${err.message}`;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...assistantMsg };
          return updated;
        });
      }
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }, [isLoading, messages, retrieveContext, apiKey]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleApiKeySubmit = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setShowKeyInput(false);
      // Store in sessionStorage so it persists during the session
      try { sessionStorage.setItem('aifs-ask-ai-key', apiKey); } catch {}
    }
  };

  // Restore key from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('aifs-ask-ai-key');
      if (stored) {
        setApiKey(stored);
        setShowKeyInput(false);
      }
    } catch {}
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (abortRef.current) abortRef.current.abort();
  };

  const handleClear = () => {
    setMessages([]);
    if (abortRef.current) abortRef.current.abort();
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        className={`ask-ai-trigger ${isOpen ? 'ask-ai-trigger--hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        title="Ask AI"
        aria-label="Ask AI Assistant"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          <path d="M9 9c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2s-.9 2-2 2h-1v2" />
          <circle cx="12" cy="17" r="0.5" fill="currentColor" />
        </svg>
        <span>Ask AI</span>
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="ask-ai-panel">
          <div className="ask-ai-header">
            <div className="ask-ai-header-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              <span>AI Assistant</span>
              <span className="ask-ai-badge">Beta</span>
            </div>
            <div className="ask-ai-header-actions">
              <button onClick={handleClear} title="Clear chat" className="ask-ai-icon-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
              </button>
              <button onClick={handleClose} title="Close" className="ask-ai-icon-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="ask-ai-messages">
            {showKeyInput ? (
              <div className="ask-ai-key-prompt">
                <div className="ask-ai-welcome-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--ifm-color-primary)" strokeWidth="1.5">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </div>
                <h3>AI-powered doc search</h3>
                <p>Ask questions about the AIFS documentation and get instant answers with references.</p>
                <form onSubmit={handleApiKeySubmit}>
                  <input
                    type="password"
                    placeholder="Enter your AIFS API key"
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    className="ask-ai-key-input"
                    autoFocus
                  />
                  <button type="submit" className="ask-ai-key-submit" disabled={!apiKey.trim()}>
                    Start chatting
                  </button>
                </form>
                <p className="ask-ai-key-note">Your key is stored only in your browser session and never sent to any third party.</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="ask-ai-welcome">
                <div className="ask-ai-welcome-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--ifm-color-primary)" strokeWidth="1.5">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </div>
                <h3>Ask me anything</h3>
                <p>I can help you find information in the AIFS documentation.</p>
                <div className="ask-ai-suggestions">
                  {SUGGESTED_QUESTIONS.map((q, i) => (
                    <button
                      key={i}
                      className="ask-ai-suggestion"
                      onClick={() => sendMessage(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`ask-ai-msg ask-ai-msg--${msg.role}`}>
                  {msg.role === 'assistant' ? (
                    <>
                      <div
                        className="ask-ai-msg-content"
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content || (isLoading && i === messages.length - 1 ? '...' : '')) }}
                      />
                      {msg.sources?.length > 0 && msg.content && (
                        <div className="ask-ai-sources">
                          <span className="ask-ai-sources-label">Sources:</span>
                          {msg.sources.slice(0, 3).map((s, j) => (
                            <a key={j} href={`/${s.slug}`} className="ask-ai-source-link">
                              {s.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="ask-ai-msg-content">{msg.content}</div>
                  )}
                </div>
              ))
            )}
            {indexError && !showKeyInput && (
              <div className="ask-ai-error">
                Search index not found. Run <code>node scripts/generate-embeddings.mjs</code> to build it.
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {!showKeyInput && (
            <div className="ask-ai-input-area">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question..."
                rows={1}
                className="ask-ai-input"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                className="ask-ai-send"
                title="Send"
              >
                {isLoading ? (
                  <div className="ask-ai-spinner" />
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                )}
              </button>
            </div>
          )}

          <div className="ask-ai-footer">
            Powered by AIFS &middot; Answers may not always be accurate
          </div>
        </div>
      )}
    </>
  );
}
