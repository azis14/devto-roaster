import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const newsreader = Newsreader({ subsets: ["latin"], variable: '--font-newsreader', weight: ['400', '500', '600', '700'], adjustFontFallback: false });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: '--font-jetbrains-mono' });

export const metadata = {
  title: "DevTo Roaster",
  description: "Roast any DevTo article with AI-powered wit and sarcasm",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable} font-body bg-stage text-warm antialiased`}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
