"use client";
import { useState, useEffect, useRef } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const languages = ['English', 'Bahasa Indonesia'];

const loadingMessages = [
  "Analyzing the article...",
  "Calibrating sarcasm levels...",
  "Generating witty comebacks...",
  "Seasoning the roast...",
  "Polishing punchlines...",
];

function LoadingCard() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % loadingMessages.length);
        setVisible(true);
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card rounded-2xl p-8 shadow-2xl ring-1 ring-white/5 flex flex-col items-center gap-5">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2.5 h-2.5 bg-accent-amber rounded-full"
            style={{
              animation: `dot-pulse 1.4s ease-in-out infinite`,
              animationDelay: `${i * 200}ms`,
            }}
          />
        ))}
      </div>
      <p
        className="text-dim text-sm transition-opacity duration-300"
        style={{
          opacity: visible ? 1 : 0,
          animation: visible ? 'message-fade-in 0.3s ease-out' : undefined,
        }}
      >
        {loadingMessages[index]}
      </p>
    </div>
  );
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [lang, setLang] = useState('English');

  function validateDevToUrl(url) {
    const pattern = /^https:\/\/dev\.to\/[a-zA-Z0-9_]+\/[a-zA-Z0-9_-]+$/;
    return pattern.test(url);
  }

  async function submit() {
    if (url === "") {
      toast.error("Please enter a DevTo article URL");
      return;
    }
    if (!validateDevToUrl(url)) {
      toast.error("That doesn't look like a valid DevTo article URL");
      return;
    }

    setText("");
    setLoading(true);
    setStarted(true);
    const content = await fetchContent();
    if (content) {
      await runPrompt(content.text);
    }
    setLoading(false);
  }

  async function fetchContent() {
    const encodedUrl = encodeURIComponent(url);
    try {
      const response = await fetch(`/api/devto?url=${encodedUrl}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        toast.error('Failed to fetch article');
        return null;
      }
    } catch {
      toast.error('Failed to fetch article');
      return null;
    }
  }

  async function runPrompt(content) {
    const prompt = `You are a very experienced person with a sharp sense of humor who loves to criticize someone's publication with sarcasm but good value. Please roast this article using ${lang} language: ${content}`;
    try {
      const response = await fetch("/api/genai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (response.ok) {
        setText(data.text);
      } else {
        toast.error('Failed to get AI response');
      }
    } catch {
      toast.error('Failed to get AI response');
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="font-display text-5xl font-bold tracking-tight">
            🔥 DevTo Roaster
          </h1>
          <p className="text-dim text-base">
            Roast any article with AI-powered sarcasm. Just drop the DevTo URL and let the roasting begin!
          </p>
        </header>

        <div className="bg-card rounded-2xl p-6 space-y-4 shadow-2xl ring-1 ring-white/5">
          <input
            type="text"
            name="devtoURL"
            placeholder="Paste DevTo article URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            className="w-full bg-stage border border-white/10 rounded-xl px-4 py-3 text-warm placeholder-dim focus:outline-none focus:ring-2 focus:ring-accent-amber/50 focus:border-accent-amber/30 transition-all text-sm"
          />

          <div className="flex gap-3">
            <div className="relative flex-1">
              <Listbox value={lang} onChange={setLang}>
                <ListboxButton
                  className={clsx(
                    'w-full rounded-xl bg-stage border border-white/10 px-4 py-3 text-sm text-warm text-left',
                    'focus:outline-none focus:ring-2 focus:ring-accent-amber/50 focus:border-accent-amber/30 transition-all'
                  )}
                >
                  <span className="flex items-center justify-between">
                    {lang}
                    <svg className="w-4 h-4 text-dim" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </ListboxButton>
                <ListboxOptions
                  anchor="bottom"
                  transition
                  className={clsx(
                    'w-[var(--button-width)] rounded-xl border border-white/10 bg-card p-1.5 [--anchor-gap:4px] focus:outline-none',
                    'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                  )}
                >
                  {languages.map((language) => (
                    <ListboxOption
                      key={language}
                      value={language}
                      className="group flex cursor-default items-center rounded-lg py-2 px-3 select-none data-[focus]:bg-accent-amber/20 data-[selected]:bg-accent-amber/10"
                    >
                      <div className="text-sm text-warm">{language}</div>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </div>

            <button
              onClick={submit}
              disabled={loading}
              className="px-6 py-3 bg-accent-amber hover:bg-accent-amber/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-accent-amber/50 flex-shrink-0"
            >
              {loading ? 'Roasting...' : 'Roast →'}
            </button>
          </div>
        </div>

        {loading && <LoadingCard />}

        {started && !loading && text && (
          <div className="bg-card rounded-2xl p-6 shadow-2xl ring-1 ring-accent-amber/20 space-y-4 result-enter">
            <h2 className="font-display text-xl font-semibold text-accent-amber">
              The Roast
            </h2>
            <div className="w-full h-px bg-white/5" />
            <div className="roast-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {text}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {started && !loading && !text && (
          <div className="text-center text-dim text-sm py-4">
            Something went wrong. Try a different article?
          </div>
        )}
      </div>

      <footer className="mt-auto pt-16 pb-6 text-center text-dim text-xs">
        <p>
          Crafted by{" "}
          <a className="text-accent-amber hover:text-accent-amber/80 underline underline-offset-2 transition-colors" href="https://azis14.my.id" target="_blank" rel="noopener noreferrer">
            Azis
          </a>
          {" "}· Powered by AI
        </p>
      </footer>
    </main>
  );
}
