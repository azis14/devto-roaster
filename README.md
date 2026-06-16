# DevTo Article Roaster

[![Sponsor](https://img.shields.io/badge/Sponsor-❤-ea4aaa?logo=github-sponsors)](https://github.com/sponsors/azis14)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](https://nodejs.org/en)
[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Dev.to](https://img.shields.io/badge/Dev.to-0A0A0A?logo=devdotto&logoColor=white)](https://dev.to/)
[![Vercel](https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white)](#)

A fun web application that provides humorous, sarcastic critiques of articles published on the [dev.to](https://dev.to) platform. Built with Next.js and powered by an OpenAI-compatible AI API.

[🔗 Live Demo](https://devto-roaster.vercel.app/)

## Features

- Fetch and analyze articles from dev.to
- Generate witty, sarcastic critiques with valuable feedback
- Typewriter-style roast reveal animation
- Support for multiple languages (English and Bahasa Indonesia)
- Comedy mic stage aesthetic with warm spotlight tones

## Usage

1. Enter a valid dev.to article URL (format: https://dev.to/username/article-slug)
2. Select your preferred language (English or Bahasa Indonesia)
3. Click "Roast →"
4. Enjoy the humorous critique of the article

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design tokens
- **Fonts**: Newsreader (display), Inter (body), JetBrains Mono (roast output)
- **AI Integration**: OpenAI-compatible chat completions API

## Prerequisites

- Node version 20.4.0 or later
- An OpenAI-compatible API endpoint and key (e.g., Sumopod AI)

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/azis14/devto-roaster.git
cd devto-roaster
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory with the following:

```
AI_API_BASE_URL=https://your-api-endpoint/v1
AI_API_KEY=your_api_key
AI_MODEL=your-model-name
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Deployment

This application can be easily deployed on [Vercel](https://vercel.com/).

```bash
npm run build
```

## License

This project is licensed under the MIT License — see the LICENSE file for details.

## Acknowledgments

- [dev.to](https://dev.to) for their API
- [Next.js](https://nextjs.org/) team for the amazing framework

## Support

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-E5E5E5?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://clicky.id/azis14/support/coffee)
[![More About Me](https://img.shields.io/badge/More%20About%20Me-E5E5E5?style=for-the-badge&logo=about.me&logoColor=black)](https://www.azis14.my.id/)

If you encounter any issues or have questions, please [open an issue](https://github.com/azis14/devto-roaster/issues) on GitHub.

If you like this repo or find it useful, please leave a ⭐️ on it.

---

Made with ❤️ by the open-source community
