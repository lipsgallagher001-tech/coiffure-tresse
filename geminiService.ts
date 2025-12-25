
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getHairAdvice = async (userInput: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userInput,
      config: {
        systemInstruction: `Tu es Aïda, une experte en coiffure africaine et soins capillaires naturels. 
        Ton ton est chaleureux, professionnel et encourageant. 
        Tu donnes des conseils spécifiques pour les cheveux texturés (crépus, frisés, bouclés), les tresses (braids), les locks et le cuir chevelu. 
        Réponds de manière concise et élégante en français.`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Erreur Gemini:", error);
    return "Désolée, je rencontre une petite difficulté technique. Peux-tu reformuler ta question ?";
  }
};
