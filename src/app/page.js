"use client";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { toast } from 'react-hot-toast';
import clsx from 'clsx'

const languages = ['English', 'Bahasa Indonesia'];

export default function Home() {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('English');

  function validateDevToUrl(url) {
    const pattern = /^https:\/\/dev\.to\/[a-zA-Z0-9_]+\/[a-zA-Z0-9_-]+$/;
    return pattern.test(url);
  }

  async function submit() {
    if (url === "") {
      toast.error("Please fill the url!");
      return;
    } if (!validateDevToUrl(url)) {
      toast.error("Given url is not valid dev to article url!");
      return;
    }

    setText("");
    setLoading(true);
    const content = await fetchContent();
    await runPrompt(content.text);
    setLoading(false);
  }

  async function fetchContent() {
    const encodedUrl = encodeURIComponent(url);

    const response = await fetch(`/api/devto?url=${encodedUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.error("Error:", data.error);
      toast.error('Failed to fetch article');
    }
  }

  async function runPrompt(content) {
    const prompt = `You are a very experienced man who have a sense of humor and happy to criticize someone's publication with a little bit sarcasm but with good value. Please roast this article using ${lang}: ${content}`

    const response = await fetch("/api/genai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    const data = await response.json();
    if (response.ok) {
      setText(data.text);
    } else {
      console.error("Error:", data.error);
      toast.error('Failed to fetch AI response');
    }
  }

  return (
    <main className="w-full">
      <div className="w-full font-mono text-sm lg:flex flex-col py-10">
        <h1 className="mt-5 mx-auto text-3xl w-full text-center">DevTo Article Roaster</h1>
        <input 
          type="text" 
          name="devtoURL" 
          placeholder="DevTo url" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          className="bg-slate-200 p-2 w-5/6 text-black mx-auto text-center mt-10 block"
        />
        <h5 className="mt-5 mx-auto text-sm w-full text-center">Example: https://dev.to/username/article-slug</h5>
        <div className="mx-auto w-52 py-5 mb-20">
          <Listbox value={lang} onChange={setLang}>
            <ListboxButton
              className={clsx(
                'relative block w-full rounded-lg bg-white/10 py-1.5 pr-8 pl-3 text-sm/6 text-white text-center border border-white',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
              )}
            >
              {lang}
            </ListboxButton>
            <ListboxOptions
              anchor="bottom"
              transition
              className={clsx(
                'w-[var(--button-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
              )}
            >
              {languages.map((language) => (
                <ListboxOption
                  key={language}
                  value={language}
                  className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                >
                  <div className="text-sm/6 text-white">{language}</div>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        </div>
        <button
          className="block mt-5 mx-auto bg-slate-400 hover:bg-black border-transparent hover:border-white p-3 border"
          onClick={submit}
        >
          Roast Article 🔥
        </button>
        <p className="mx-auto mt-5 text-center p-5 mb-10">{text}</p>
        {loading && <div className="w-1/2 mx-auto text-center">
          <ClipLoader color="#fff" loading={loading} size={50} />
          <h5 mt-5 mx-auto text-sm w-full text-center>Processing Response...</h5>
        </div>}
      </div>
      <footer className="bg-slate-400 text-white p-4 text-center fixed bottom-0 w-full">
        <p>Crafted by <a className="underline hover:text-black" href="https://azis14.my.id" target="_blank">Azis</a> using NextJS and Google AI Studio</p>
      </footer>
    </main>
  );
}
