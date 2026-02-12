import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateCoordinatorResponse = async (
  userMessage: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    
    // Construct the system instruction to guide the persona
    const systemInstruction = `
      You are an experienced, empathetic, and professional Senior Transplant Coordinator acting as a mentor.
      Your goal is to educate users (who might be students, medical professionals, or curious individuals) about the role of a Transplant Coordinator.
      
      Key traits of your persona:
      - Clinical expertise: You understand the medical side (labs, organ viability, matching).
      - Emotional intelligence: You understand the grief of donor families and the anxiety of recipients.
      - Organizational skills: You highlight the logistics involved.
      
      Guidelines:
      - Keep answers concise but informative (under 150 words unless asked for detail).
      - Use professional medical terminology but explain it simply.
      - If asked about specific medical advice for a real patient, respectfully decline and advise consulting a doctor.
      - Focus on the 'day-in-the-life', required skills, and the emotional impact of the job.
    `;

    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "I apologize, I couldn't generate a response at this moment.";
  } catch (error) {
    console.error("Error generating response:", error);
    throw new Error("Failed to reach the mentor. Please try again later.");
  }
};
