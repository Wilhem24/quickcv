// src/lib/ai.js
export async function improveText(text) {
  // temporary mock - AI disabled will just return original text
  // Replace with your real OpenAI / Gemini call later
  if (!text) return "";
  
  try {
    // Example if you want to enable later:
    // const res = await fetch("/api/improve", { method: "POST", body: JSON.stringify({ text }) })
    // const data = await res.json()
    // return data.improved;

    return text; // for now, return as-is so builder works
  } catch (e) {
    console.error(e);
    return text;
  }
}