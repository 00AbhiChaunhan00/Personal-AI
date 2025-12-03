import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyDxn0qBXmS2fZs756MtB0gxl_Z17OVztR4" });

 export async function main(propmt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: propmt,
   generationConfig: {
      maxOutputTokens: 5,
      temperature:0.5,
    },
  });
  return response.text;
}

