import "dotenv/config";

const model = "gemini-2.0-flash";

export async function suggestRecipe(ingredients: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is required for AI suggestions.");

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `Türkçe cevap ver. Şu malzemelerle yapılabilecek tek bir yemek öner: ${ingredients}. Tarif adını, kısa açıklamayı ve 5 adımlık hazırlanışını JSON olarak döndür. JSON şeması: {"name":string,"description":string,"steps":string[]}`,
        }],
      }],
      generationConfig: { responseMimeType: "application/json" },
    }),
  });
  if (!response.ok) throw new Error(`Gemini request failed with status ${response.status}.`);
  const payload = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
  const text = payload.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini returned an empty response.");
  return JSON.parse(text) as { name: string; description: string; steps: string[] };
}
