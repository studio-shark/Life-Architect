
import { GoogleGenAI } from "@google/genai";

/**
 * Generates architectural advice based on the current phase of the user's journey.
 */
export const getArchitectureAdvice = async (phase: string) => {
  // Create a new instance right before making an API call to ensure it always uses the most up-to-date API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `You are a world-class life architect using the "Behaviordynamics" framework. 
    Provide strategic guidance for someone in the "${phase}" phase. Return a structured Markdown response.`,
  });

  return response.text || "Could not generate strategic advice at this time.";
};
