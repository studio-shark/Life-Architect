import { generateTaskAI } from './api.ts';

/**
 * Generates architectural advice based on the current phase of the user's journey.
 */
export const getArchitectureAdvice = async (phase: string) => {
  try {
    // Construct the prompt for the AI
    const prompt = `You are a world-class life architect using the "Behaviordynamics" framework. 
    Provide strategic guidance for someone in the "${phase}" phase. Return a structured Markdown response.`;

    // Call the backend proxy instead of the Gemini SDK directly
    const data = await generateTaskAI(prompt);
    
    return data.result || "Could not generate strategic advice at this time.";
  } catch (error) {
    console.error("AI Service Error:", error);
    return "Could not generate strategic advice at this time.";
  }
};