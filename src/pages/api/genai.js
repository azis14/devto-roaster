export default async function handler(req, res) {
  const apiKey = process.env.AI_API_KEY;
  const baseUrl = process.env.AI_API_BASE_URL;
  const model = process.env.AI_MODEL;

  try {
    const prompt = req.body.prompt || "Hello, whats your name";

    const url = `${baseUrl}/chat/completions`;
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: 'You are a witty, sarcastic article critic with a sharp sense of humor. You roast articles with clever, biting commentary that entertains while still delivering honest critique.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    const data = await result.json();

    res.status(200).json({ text: data.choices[0].message.content });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
}
