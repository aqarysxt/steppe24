
import { GoogleGenAI, Type } from "@google/genai";
import { SportCategory, NewsItem, LiveScore } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const fetchLatestNews = async (category: SportCategory): Promise<NewsItem[]> => {
  const prompt = `Act as a senior sports journalist in Kazakhstan. Generate 6 realistic current sports news articles for the category: ${category}. 
  Return the response in JSON format. Each article must include: id (uuid), title (Kazakh), excerpt (short intro in Kazakh), content (detailed article in Kazakh), image (use picsum.photos URLs), category (enum value), date (current), author (Kazakh names).
  Make sure the titles and content are engaging and professional.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              excerpt: { type: Type.STRING },
              content: { type: Type.STRING },
              image: { type: Type.STRING },
              category: { type: Type.STRING },
              date: { type: Type.STRING },
              author: { type: Type.STRING }
            },
            required: ["id", "title", "excerpt", "content", "image", "category", "date", "author"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

export const summarizeArticle = async (content: string): Promise<string[]> => {
  const prompt = `Summarize the following sports article into 3 key bullet points in Kazakh language: \n\n${content}`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const text = response.text;
    if (!text) return ["Мазмұндама қолжетімді емес."];
    return JSON.parse(text);
  } catch (error) {
    console.error("Error summarizing:", error);
    return ["Қате орын алды."];
  }
};

export const fetchLiveScores = async (): Promise<LiveScore[]> => {
  const prompt = `Generate 5 realistic live or upcoming sports scores for international and Kazakh matches. 
  Include football (Champions League, KPL), boxing, and basketball.
  Return JSON format with id, homeTeam, awayTeam, homeScore, awayScore, time, status (LIVE/FINISHED/UPCOMING), league.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              homeTeam: { type: Type.STRING },
              awayTeam: { type: Type.STRING },
              homeScore: { type: Type.NUMBER },
              awayScore: { type: Type.NUMBER },
              time: { type: Type.STRING },
              status: { type: Type.STRING },
              league: { type: Type.STRING }
            },
            required: ["id", "homeTeam", "awayTeam", "homeScore", "awayScore", "time", "status", "league"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("Error fetching scores:", error);
    return [];
  }
};
