
import { GoogleGenAI, Type } from "@google/genai";

export class BakeryAI {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async suggestSweet(mood: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I am feeling ${mood}. Suggest a specific type of bakery item (cake, pastry, or cupcake) from a boutique bakery that fits this mood and explain why in 2 short sentences.`,
        config: {
          temperature: 0.8,
          maxOutputTokens: 150,
        }
      });
      return response.text || "Something sweet is coming your way!";
    } catch (error) {
      console.error("AI Error:", error);
      return "How about a classic Almond Croissant? It always brings a smile!";
    }
  }
}

export const bakeryAI = new BakeryAI();
