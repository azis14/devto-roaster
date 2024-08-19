export default async function handler(req, res) {
  const apiKey = process.env.GEN_AI_API_KEY;

  try {
    const prompt = req.body.prompt || "Hello, whats your name";
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ]
      }),
    });
    
    const data = await result.json();
    
    res.status(200).json({ text: data.candidates[0].content.parts[0].text });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
}
