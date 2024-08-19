export default async function handler(req, res) {
  try {
    const originalUrl = req.query.url;
    
    const url = insertString(originalUrl, "api/articles/", originalUrl.indexOf("dev.to/") + "dev.to/".length);
    
    const result = await fetch(url, {
      headers: { 'Cache-Control': 'no-cache' }
    });

    const data = await result.json();
    
    res.status(200).json({ text: data.body_markdown });
  } catch (error) {
    console.error("Error getting content:", error);
    res.status(500).json({ error: "Failed to fetch article content" });
  }
}

function insertString(originalString, insertString, position) {
  return originalString.slice(0, position) + insertString + originalString.slice(position);
}