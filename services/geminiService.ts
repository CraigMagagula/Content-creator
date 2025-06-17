
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GenerationOptions, ContentType } from '../types';
import { DEFAULT_SYSTEM_INSTRUCTION, MODEL_NAME } from '../constants';

// Ensure process.env.API_KEY is handled by the environment.
// For development, you might use a .env file and a tool like dotenv,
// but for this snippet, we assume it's globally available.
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY environment variable not set.");
  // In a real app, you might want to prevent initialization or show a persistent error.
}
const ai = new GoogleGenAI({ apiKey: apiKey || "MISSING_API_KEY" });


export const generateCreativeContent = async (params: GenerationOptions): Promise<string> => {
  if (!apiKey) {
    return "Error: API_KEY is not configured. Please set the API_KEY environment variable.";
  }

  const { contentType, userPrompt, length, genre, keywords, tone, rhymeScheme, poemStructure } = params;

  let detailedPrompt = `Please write a ${contentType.toLowerCase()} based on the following details:\n`;
  detailedPrompt += `- Topic/Core Idea: "${userPrompt}"\n`;
  detailedPrompt += `- Desired Length: ${length}\n`;
  
  if (genre && genre.toLowerCase() !== 'any') detailedPrompt += `- Genre: ${genre}\n`;
  if (keywords) detailedPrompt += `- Keywords to incorporate (if applicable): ${keywords}\n`;
  if (tone && tone.toLowerCase() !== 'any') detailedPrompt += `- Desired Tone: ${tone}\n`;

  if (contentType === ContentType.POEM) {
    if (poemStructure && poemStructure.toLowerCase() !== 'any') detailedPrompt += `- Specific Structure: ${poemStructure}\n`;
    if (rhymeScheme && rhymeScheme.toLowerCase() !== 'any') detailedPrompt += `- Rhyme Scheme: ${rhymeScheme}\n`;
    detailedPrompt += `If a specific structure like Haiku or Sonnet is requested, strictly adhere to its rules. For Haikus, focus on the 5-7-5 syllable structure. For Sonnets, aim for 14 lines with a common sonnet rhyme scheme unless another is specified. If 'Any' is selected for structure or rhyme, you have creative freedom.\n`;
  } else { // Story
    detailedPrompt += `Ensure the story has a clear beginning, middle, and end, with engaging plot development and characterization appropriate for the genre and tone. If 'Any' is selected for genre or tone, choose what you think fits best for the topic.\n`;
  }

  detailedPrompt += "\nGenerate the creative piece. Be imaginative and fulfill the request to the best of your abilities:";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: detailedPrompt,
      config: {
        systemInstruction: DEFAULT_SYSTEM_INSTRUCTION,
        temperature: 0.85, 
        topP: 0.95,
        topK: 40,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    if (error instanceof Error) {
        return `Error from AI: ${error.message}. Check your API key and network connection.`;
    }
    return "An unknown error occurred while generating content. Please try again.";
  }
};
