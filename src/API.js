import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AQ.Ab8RN6JywxU_NfGboKwv0iAWDnE0p5IeD_FtEyIr90sEqsKUEA" });

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

